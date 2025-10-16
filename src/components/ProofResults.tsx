import { useState } from "react";
import { TrendingUp, Clock, Calendar, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const ProofResults = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "+38%",
      label: "de leads atendidos fora do horário comercial",
    },
    {
      icon: Clock,
      value: "−65%",
      label: "no tempo de primeira resposta",
    },
    {
      icon: Calendar,
      value: "+27%",
      label: "em agendamentos qualificados por semana",
    },
  ];

  const depoimentos = [
    {
      nome: "Rodrigo",
      especialidade: "Consultoria de Marketing",
      cidade: "São Paulo",
      foto: "/testimonial_icon/carlos-marketing.webp",
      texto:
        "Meu comercial simplesmente triplicou. O SDR da Talker Flow qualifica e filtra todos os leads em tempo real, e meu time comercial só entra em campo pra fechar os mais qualificados. Antes falavam com 20 leads frios pra fechar 2. Agora a IA fala com 100, qualifica 30 e fechamos 10.",
    },
    {
      nome: "Paulo",
      especialidade: "Contador",
      cidade: "Belo Horizonte",
      foto: "/testimonial_icon/paulo-contador.webp",
      texto:
        "Já tive cliente que às 3:00 da manhã agendou uma reunião pra assinar o contrato no dia seguinte. Quando acordei vi confirmação do agendamento. Se não fosse pela Talker Flow, com certeza teria mandado mensagens pra mais 20 escritórios.",
    },
    {
      nome: "Dra. Marta",
      especialidade: "Implantodontista",
      cidade: "Manaus",
      foto: "/testimonial_icon/marta-dentista.webp",
      texto:
        "Impressionante como simplesmente não há fila. O paciente manda mensagem às 14:00, às 14:01 ele é atendido, e em 5 minutos a consulta está marcada.",
    },
    {
      nome: "Fernanda",
      especialidade: "Designer Gráfico",
      cidade: "São Paulo",
      foto: "/testimonial_icon/fernanda-designer.webp",
      texto:
        "Antes eu perdia horas do meu dia só respondendo mensagens de novos clientes, quase sempre com as mesmas perguntas. Agora a Talker Flow faz tudo isso por mim. Quando o cliente chega até mim, já sabe o valor, o prazo e às vezes até já pagou! Eu só foco em criar.",
    },
    {
      nome: "Guilherme",
      especialidade: "Gestor de Imobiliária",
      cidade: "São Paulo",
      foto: "/testimonial_icon/guilherme-imobiliaria.webp",
      texto:
        "Os corretores às vezes demoravam para responder, e o cliente ficava esperando e reclamava. Agora a Talker Flow responde eles na hora, apresenta algumas opções de imóveis, passa valores, condições de pagamento e localização. Quando o corretor entra na conversa, o cliente já está quase decidido.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDepoimento = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
  };

  const prevDepoimento = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + depoimentos.length) % depoimentos.length
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-medium border border-border/50 text-center hover:shadow-strong transition-base"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Depoimentos Carrossel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 85}%)` }}
              >
                {depoimentos.map((depoimento, index) => (
                  <div key={index} className="w-[85%] flex-shrink-0 p-4">
                    <div className="bg-card p-8 rounded-2xl shadow-medium border border-border/50">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-muted overflow-hidden mr-4">
                          <img
                            src={depoimento.foto}
                            alt={depoimento.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground">
                            {depoimento.nome}
                          </h4>
                          <p className="text-muted-foreground">
                            {depoimento.especialidade} • {depoimento.cidade}
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-lg italic text-foreground/90">
                        "{depoimento.texto}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-dark hover:text-primary transition-colors"
              onClick={prevDepoimento}
              aria-label="Depoimento anterior"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-dark hover:text-primary transition-colors"
              onClick={nextDepoimento}
              aria-label="Próximo depoimento"
            >
              <ArrowRight size={20} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {depoimentos.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125 shadow-md"
                      : "bg-neutral-dark/30 hover:bg-neutral-dark/50"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofResults;