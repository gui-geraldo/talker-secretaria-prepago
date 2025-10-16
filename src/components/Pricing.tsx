import { Button } from "@/components/ui/button";
import { Check, MessageCircle } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const Pricing = () => {
  const { openForm } = useLeadForm();

  const plans = [
    {
      name: "Starter",
      price: "R$ 599",
      activationFee: "R$ 350",
      features: [
        "50 mensagens da IA por contato",
        "Ouve áudios: Não",
        "1 usuários",
        "1 WhatsApps conectados",
        "Atendimento: Só Português",
        "20.000 mensagens/mês",
      ],
      highlight: false,
      redirectUrl: "https://payfast.greenn.com.br/134091/offer/kPCLXC",
    },
    {
      name: "Pro",
      price: "R$ 799",
      discountedPrice: "R$ 599", // preço promocional
      activationFee: "R$ 350",
      discountedActivationFee: "R$ 0", // taxa grátis
      features: [
        "Mensagens ilimitadas por contato",
        "Ouve áudios: Sim",
        "15 usuários",
        "5 WhatsApps conectados",
        "Atendimento: 24 Idiomas",
        "Mensagens ilimitadas",
      ],
      highlight: true,
      redirectUrl: "https://payfast.greenn.com.br/134091/offer/eQXjY9",
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
            Não sabe por onde começar? Vamos configurar sua secretaria virtual hoje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card rounded-3xl p-8 shadow-medium border-2 transition-base hover:shadow-strong ${
                plan.highlight
                  ? "border-primary/50 relative"
                  : "border-border/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-highlight text-highlight-foreground px-6 py-2 rounded-full font-bold text-sm shadow-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-headline text-2xl font-bold mb-2">{plan.name}</h3>

                {/* Taxa de ativação */}
                {plan.discountedActivationFee ? (
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Taxa de ativação:{" "}
                    <span className="line-through text-muted-foreground mr-2">
                      {plan.activationFee}
                    </span>
                    <span className="font-bold text-primary">
                      {plan.discountedActivationFee}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Taxa de ativação:{" "}
                    <span className="font-bold text-foreground">
                      {plan.activationFee}
                    </span>
                  </div>
                )}

                {/* Bloco de preço com alinhamento uniforme */}
                <div className="flex flex-col items-center justify-center min-h-[80px] mb-1">
                  {plan.discountedPrice ? (
                    <>
                      <div className="text-2xl text-muted-foreground line-through mb-1">
                        {plan.price}
                      </div>
                      <div className="text-4xl font-black text-primary">
                        {plan.discountedPrice}
                      </div>
                    </>
                  ) : (
                    <div className="text-4xl font-black text-primary">
                      {plan.price}
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">por mês</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "hero" : "outline"}
                className="w-full"
                size="lg"
                onClick={() =>
                  openForm({
                    productName: `Plano ${plan.name}`,
                    form_id: `pricing_${plan.name.toLowerCase()}_v1`,
                    redirectUrl: plan.redirectUrl,
                  })
                }
              >
                Iniciar Agora!
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
                productName: "CTA_Falalar_WPP_Preço",
                form_id: "cta_whatsapp_preco_v1",
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