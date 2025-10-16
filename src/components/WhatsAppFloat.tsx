import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/contexts/LeadFormContext";

const WhatsAppFloat = () => {
  const { openForm } = useLeadForm();

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-8 duration-500">
      <Button
        variant="whatsapp"
        size="lg"
        onClick={() =>
          openForm({
            productName: "WhatsAppFloat",
            form_id: "whatsapp_float_v1",
          })
        }
        className="shadow-strong hover:shadow-strong hover:scale-110 transition-smooth rounded-full h-14 px-6"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </Button>
    </div>
  );
};

export default WhatsAppFloat;