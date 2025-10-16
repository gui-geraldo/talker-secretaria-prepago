import { Shield, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              {/* Logo removido */}
              <p className="text-background/80 text-sm">
                Secretaria virtual 24/7 no WhatsApp para vender e atender sem parar.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-headline font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-base">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-base">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-base">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-base">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-headline font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.talkerflow.me/politica-de-privacidade"
                    className="text-background/80 hover:text-background transition-base flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Shield className="w-4 h-4" />
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.talkerflow.me/termos-de-uso"
                    className="text-background/80 hover:text-background transition-base flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4" />
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
            <p>© {currentYear} Talker Flow. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
