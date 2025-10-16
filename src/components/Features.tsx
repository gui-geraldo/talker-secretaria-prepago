import { Clock, MessageCircle, Target, Calendar, Smartphone, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Atendimento 24/7",
      description: "Nunca mais 'volte amanhã'. Sua secretaria virtual trabalha sem parar.",
      color: "primary",
    },
    {
      icon: MessageCircle,
      title: "Conversas humanizadas",
      description: "Experiência natural e fluida, sem aquele papo travado de robô.",
      color: "secondary",
    },
    {
      icon: Target,
      title: "Qualificação inteligente",
      description: "Identifica intenção, orçamento e fit do cliente automaticamente.",
      color: "accent",
    },
    {
      icon: Calendar,
      title: "Agendamentos automatizados",
      description: "Reuniões agendadas no horário que você disponibilizar, simples.",
      color: "primary",
    },
    {
      icon: Smartphone,
      title: "Integração WhatsApp",
      description: "Funciona onde seu cliente já está — simples assim.",
      color: "secondary",
    },
    {
      icon: BarChart3,
      title: "Relatórios essenciais",
      description: "Entenda volume, conversão e horários de pico.",
      color: "accent",
    },
  ];

  const colorClasses = {
    primary: {
      bg: "bg-primary/10",
      icon: "text-primary",
      border: "border-primary/20",
    },
    secondary: {
      bg: "bg-secondary/10",
      icon: "text-secondary",
      border: "border-secondary/20",
    },
    accent: {
      bg: "bg-accent/10",
      icon: "text-accent",
      border: "border-accent/20",
    },
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Recursos <span className="text-primary">principais</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para transformar conversas em vendas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            
            return (
              <div
                key={index}
                className={`bg-card rounded-2xl p-6 shadow-medium hover:shadow-strong transition-base border-2 ${colors.border} hover:scale-105`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${colors.bg} rounded-xl mb-4`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value proposition */}
        <div className="mt-16 max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 shadow-medium border border-border/50">
          <h3 className="text-2xl md:text-4xl font-black mb-4">
            Sua equipe foca no que <span className="text-primary">fecha</span>.
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A secretaria virtual da Talker Flow filtra, qualifica e agenda — você entra só nas conversas com 
            <strong className="text-foreground"> chance real de venda</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
