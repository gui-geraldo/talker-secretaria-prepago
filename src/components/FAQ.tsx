import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "O que é uma secretaria virtual?",
      answer:
        "É um sistema de atendimento inteligente que conversa com seus clientes, 24/7, como uma secretária humana faria — respondendo, qualificando e agendando no WhatsApp.",
    },
    {
      question: "A secretaria virtual substitui minha equipe?",
      answer:
        "Não. Ela cobre picos e horários ociosos e faz o pré-atendimento. Sua equipe foca nos casos complexos e no fechamento.",
    },
    {
      question: "Por que usar a Talker Flow como secretaria virtual?",
      answer:
        "Pela velocidade de resposta, linguagem humana e foco em resultado: mais conversas atendidas, mais agendamentos e vendas.",
    },
    {
      question: "Funciona 24 horas por dia mesmo?",
      answer:
        "Sim, a secretaria virtual opera continuamente — noites, fins de semana e feriados.",
    },
    {
      question: "Como começo?",
      answer:
        "Assim que iniciar a sua contratação, o time de implementação irá entrar em contato contigo, e sua secretaria virtual poderá ser configurada em menos de 30 minutos",
    },
    {
      question: "A secretaria virtual atende ligações?",
      answer:
        "Não, a secretaria virtual responde as mensagens de texto e áudios que o seu cliente enviar. Ela não atende ligações",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Perguntas <span className="text-primary">frequentes</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Tudo sobre a secretaria virtual da Talker Flow
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl shadow-soft border border-border/50 px-6 data-[state=open]:shadow-medium transition-base"
              >
                <AccordionTrigger className="text-left font-headline text-lg hover:text-primary transition-base py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
