import { Store, Stethoscope, Building2, GraduationCap, Wrench } from "lucide-react";

const Audiences = () => {
  const audiences = [
    {
      icon: Store,
      title: "Lojas e e-commerce",
      description: "Recebem pedidos no WhatsApp",
    },
    {
      icon: Stethoscope,
      title: "Clínicas e estética",
      description: "Agendamentos e confirmações",
    },
    {
      icon: Building2,
      title: "Imobiliárias e serviços locais",
      description: "Captação de leads recorrentes",
    },
    {
      icon: GraduationCap,
      title: "Educação e cursos",
      description: "Captação e matrículas",
    },
    {
      icon: Wrench,
      title: "Oficinas e serviços",
      description: "Orçamentos e agendamentos",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Para <span className="text-secondary">quem é</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Se você atende clientes pelo WhatsApp, a secretaria virtual é para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-base border border-border/50 text-center group hover:border-primary/30"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-base">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-headline text-base font-bold mb-2 text-foreground">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Audiences;
