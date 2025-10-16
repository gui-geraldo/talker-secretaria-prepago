import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const Pricing = () => {
  const { openForm } = useLeadForm();

  const subscription = {
    name: "Assinatura Mensal",
    price: "R$ 299",
    discountedPrice: "R$ 99",
    bonus: "Bônus de 1.000 créditos",
    features: [
      "Mensagens de texto: 1 crédito / mensagem",
      "Áudios: 3 créditos / mensagem",
      "Atendimento em 24 idiomas",
      "Acesso à IA 24h por dia",
      "Painel de controle completo",
    ],
    redirectUrl: "https://payfast.greenn.com.br/134091/offer/eQXjY9",
  };

  const creditPacks = [
    {
      name: "Pacote 100 Créditos",
      price: "R$ 9,90",
    },
    {
      name: "Pacote 1.000 Créditos",
      price: "R$ 59,90",
    },
    {
      name: "Pacote 50.000 Créditos",
      price: "R$ 199,00",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* TÍTULO PRINCIPAL */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Você no <span className="text-primary">controle dos custos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Configure sua secretaria virtual e controle seus créditos de forma flexível.
          </p>
        </div>

        {/* PLANO PRINCIPAL */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-card rounded-3xl p-10 shadow-medium border-2 border-primary/40 text-center relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-highlight text-highlight-foreground px-6 py-2 rounded-full font-bold text-sm shadow-medium">
                Mais Popular
              </span>
            </div>

            <h3 className="font-headline text-3xl font-bold mb-6">
              {subscription.name}
            </h3>

            {/* Preço */}
            <div className="flex flex-col items-center justify-center mb-3 min-h-[80px]">
              <div className="text-2xl text-muted-foreground line-through mb-1">
                {subscription.price}
              </div>
              <div className="text-5xl font-black text-primary">
                {subscription.discountedPrice}
              </div>
              <div className="text-sm text-muted-foreground mt-1">por mês</div>
            </div>

            {/* Bônus */}
            <div className="text-lg font-semibold text-secondary mb-6">
              🎁 {subscription.bonus}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
              {subscription.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="hero"
              size="lg"
              className="w-full md:w-2/3"
              onClick={() =>
                openForm({
                  productName: "Assinatura Mensal",
                  form_id: "assinatura_mensal_v1",
                  redirectUrl: subscription.redirectUrl,
                })
              }
            >
              Assinar Agora!
            </Button>
          </div>
        </div>

        {/* PACOTES DE CRÉDITOS */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Pacotes adicionais de créditos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {creditPacks.map((pack, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-medium border-2 border-border/50 text-center transition-base hover:shadow-strong"
            >
              <h4 className="font-bold text-xl mb-3">{pack.name}</h4>
              <div className="text-3xl font-black text-primary mb-6">
                {pack.price}
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() =>
                  openForm({
                    productName: pack.name,
                    form_id: `pack_${index + 1}_v1`,
                  })
                }
              >
                Adquirir
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
