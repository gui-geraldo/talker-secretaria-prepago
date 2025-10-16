import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const FinalCTA = () => {
  const { openForm } = useLeadForm();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Pronto para vender <span className="text-highlight">24 horas</span> por dia?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Ative sua secretaria virtual no WhatsApp com a Talker Flow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="highlight" 
              size="xl"
              onClick={() =>
                openForm({
                  productName: "Final CTA",
                  form_id: "final_cta_v1",
                })
              }
              className="w-full sm:w-auto text-lg"
            >
              <MessageCircle className="mr-2" />
              Falar no WhatsApp agora
              <ArrowRight className="ml-2" />
            </Button>
          </div>

          <p className="mt-8 text-white/80 text-sm">
            Configure sua secretaria virtual em minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;