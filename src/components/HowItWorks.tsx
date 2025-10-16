import { MessageSquare, Brain, CheckCircle2, Calendar } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: "1",
      title: "Capta no WhatsApp",
      description: "Sua secretaria virtual inicia ou responde conversas em segundos",
    },
    {
      icon: Brain,
      number: "2",
      title: "Entende a necessidade",
      description: "Perguntas inteligentes e linguagem natural",
    },
    {
      icon: CheckCircle2,
      number: "3",
      title: "Qualifica e resolve",
      description: "Envia info, tira dúvidas e encaminha corretamente",
    },
    {
      icon: Calendar,
      number: "4",
      title: "Agenda e registra",
      description: "Marca horários, salva dados e mantém o funil organizado",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Como <span className="text-primary">funciona</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Atendimento inteligente em 4 passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line - hidden on mobile, shown from md */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30" />
                )}

                <div className="relative bg-card rounded-2xl p-6 shadow-medium hover:shadow-strong transition-base border-2 border-border/50 hover:border-primary/30">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-highlight text-highlight-foreground rounded-full flex items-center justify-center font-black text-lg shadow-medium">
                    {step.number}
                  </div>

                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-medium">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-headline text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
