// Configurações centralizadas do sistema de captura de leads

export const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || "";
export const PRIMARY_FETCH_TIMEOUT_MS = 700;
export const DEBUG_LEAD = true;
export const DEFAULT_PRODUCT_NAME = "Demonstração Talker Flow";
export const DEFAULT_FORM_ID = "lead_modal_v1";

// Mensagens de feedback
export const MESSAGES = {
  SUCCESS: "Obrigado! Entraremos em contato em breve.",
  ERROR: "Não foi possível enviar agora. Tente novamente em instantes.",
  REQUIRED_NAME: "Por favor, informe seu nome",
  REQUIRED_EMAIL: "Por favor, informe seu e-mail",
  INVALID_EMAIL: "E-mail inválido",
  REQUIRED_PHONE: "Por favor, informe seu telefone",
  INVALID_PHONE: "Telefone inválido. Use o formato (11) 99999-9999",
};
