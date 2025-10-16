import { useState, FormEvent } from "react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { sendLeadWebhook } from "@/lib/webhook";
import { DEFAULT_PRODUCT_NAME, DEFAULT_FORM_ID, MESSAGES } from "@/lib/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Máscara de telefone BR
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Validações
function validateName(value: string): string | null {
  if (!value.trim()) return MESSAGES.REQUIRED_NAME;
  return null;
}

function validateEmail(value: string): string | null {
  if (!value.trim()) return MESSAGES.REQUIRED_EMAIL;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return MESSAGES.INVALID_EMAIL;
  return null;
}

function validatePhone(value: string): string | null {
  if (!value.trim()) return MESSAGES.REQUIRED_PHONE;
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (!phoneRegex.test(value)) return MESSAGES.INVALID_PHONE;
  return null;
}

export default function LeadFormModal() {
  const { isOpen, closeForm, preset } = useLeadForm();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    if (nameError || emailError || phoneError) {
      setErrors({
        name: nameError || undefined,
        email: emailError || undefined,
        phone: phoneError || undefined,
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const success = await sendLeadWebhook({
        name: name.trim(),
        email: email.trim(),
        phone,
        company: company.trim(),
        productName: preset?.productName || DEFAULT_PRODUCT_NAME,
        form_id: preset?.form_id || DEFAULT_FORM_ID,
      });

      if (success) {
        toast({
          title: "Sucesso!",
          description: MESSAGES.SUCCESS,
        });

        // Salvar último envio
        localStorage.setItem("talkerflow_last_lead_at", new Date().toISOString());

        // Redirecionar se houver URL
        if (preset?.redirectUrl) {
          window.location.href = preset.redirectUrl;
          return;
        }

        // Limpar e fechar
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        closeForm();
      } else {
        toast({
          title: "Atenção",
          description: MESSAGES.ERROR,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("[LeadFormModal] Submit error:", error);
      toast({
        title: "Erro",
        description: MESSAGES.ERROR,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeForm()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Solicite uma demonstração
          </DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo e nossa equipe entrará em contato em breve.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Seu nome"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="seu@email.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(11) 99999-9999"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nome da empresa (opcional)</Label>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Sua empresa"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeForm}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
