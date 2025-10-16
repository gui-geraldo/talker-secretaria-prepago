import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Coins } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const Pricing = () => {
  const { openForm } = useLeadForm();

  // Plano principal (assinatura mensal)
  const mainPlan = {
    name: "Assinatura Mensal",
    price: "R$ 199",
    discountedPrice: "R$ 99",
    bonusCredits: "Bônus de 1.000 créditos",
    features: [
      "Mensagens de texto: 1 crédito/mensagem",
      "Mensagens de áudio: 3 créditos/mensagem",
      "Atendimento em Português",
      "Acesso à IA 24h por dia",
      "Painel de controle completo",
    ],
    redirectUrl: "https://payfast.greenn.com.br/134091/offer/eQXjY9",
  };

  // Pacotes de créditos adicionais
  const creditPackages = [
    {
      name: "Pacote 100 Créditos",
      price: "R$ 9,90",
      credits: "100 créditos",
      redirectUrl: "https://payfast.greenn.com.br/134091/offer/p1",
    },
    {
      name: "Pacote 1.000 Créditos",
      price: "R$ 59,90",
      credits: "1.000 créditos",
      redirectUrl: "https://payfast.greenn.com.br/134091/offer/p2",
    },
    {
      name: "Pacote 50.000 Créditos",
      price: "R$ 199,00",
      credits: "50.000 créditos",
      redirectUrl: "https://payfast.greenn.com.br/134091/offer/p3",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Escolha seu <span className="text-primary">plano</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Configure sua secretaria virtual e controle seus créditos de forma flexível.
          </p>
        </div>

        {/* PLANO PRINCIPAL */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card rounded-3xl p-8 shadow-medium border-2 border-primary/50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-highlight text-highlight-foreground px-6 py-2 rounded-full font-bold text-sm shadow-medium">
                Mais Popular
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-headline text-2xl font-bold mb-2">
                {mainPlan.name}
              </h3>

              {/* Preço */}
              <div className="flex flex-col items-center justify-center min-h-[80px] mb-2">
                <div className="text-2xl text-muted-foreground line-through mb-1">
                  {mainPlan.price}
                </div>
                <div className="text-4xl font-black text-primary">
                  {mainPlan.discountedPrice}
                </div>
                <div className="text-sm text-muted-foreground">por mês</div>
              </div>

              {/* Bônus */}
              <div className="text-sm font-medium text-primary mb-4">
                🎁 {mainPlan.bonusCredits}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {mainPlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="hero"
              className="w-full"
              size="lg"
              onClick={() =>
                openForm({
                  productName: mainPlan.name,
                  form_id: "pricing_mainplan_v1",
                  redirectUrl: mainPlan.redirectUrl,
                })
              }
            >
              Assinar Agora!
            </Button>
          </div>
        </div>

        {/* PACOTES DE CRÉDITOS */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Créditos adicionais
          </h3>
          <p className="text-muted-foreground mb-8">
            Escolha o pacote ideal para o seu volume de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {creditPackages.map((pkg, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 shadow-medium border-2 border-border/50 transition-base hover:shadow-strong"
            >
              <div className="text-center mb-4">
                <Coins className="mx-auto text-primary w-10 h-10 mb-2" />
                <h4 className="font-headline text-xl font-bold mb-1">
                  {pkg.name}
                </h4>
                <div className="text-3xl font-black text-primary mb-1">
                  {pkg.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  {pkg.credits}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() =>
                  openForm({
                    productName: pkg.name,
                    form_id: `credit_package_${index + 1}`,
                    redirectUrl: pkg.redirectUrl,
                  })
                }
              >
                Adquirir
              </Button>
            </div>
          ))}
        </div>

        {/* CTA adicional */}
        <div className="text-center">
          <Button
            variant="whatsapp"
            size="xl"
            onClick={() =>
              openForm({
                productName: "CTA_Falar_WPP_Preço",
                form_id: "cta_whatsapp_preco_v2",
              })
            }
          >
            <MessageCircle className="mr-2" />
            Falar no WhatsApp agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;