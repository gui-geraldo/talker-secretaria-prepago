import { TrendingUp, Zap, Target, CalendarCheck } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Mais vendas fora do horário",
      description: "Sua secretaria virtual não dorme",
    },
    {
      icon: Zap,
      title: "Primeira resposta instantânea",
      description: "Pare de perder leads quentes",
    },
    {
      icon: Target,
      title: "Qualificação automática",
      description: "Pergunte, entenda e direcione em segundos",
    },
    {
      icon: CalendarCheck,
      title: "Agendamentos e follow-up",
      description: "Oportunidades no calendário, sem esforço",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-base border border-border/50 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-headline text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
