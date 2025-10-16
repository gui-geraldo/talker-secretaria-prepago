// Coleta de dados de analytics e sessão

export interface ExtraAnalytics {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer: string;
  page_url: string;
  idioma: string;
  navegador: string;
  sistema_operacional: string;
  dispositivo: "mobile" | "desktop";
  quantidade_visitas: number;
  tempo_total_no_site_segundos: number;
  tempo_sessao_atual_segundos: number;
  origin_platform: string;
  user_agent: string;
}

const STORAGE_KEYS = {
  VISIT_COUNT: "talkerflow_visit_count",
  TOTAL_TIME: "talkerflow_total_time",
  SESSION_START: "talkerflow_session_start",
};

function getQueryParam(name: string): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || undefined;
}

function detectBrowser(ua: string): string {
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Outro";
}

function detectOS(ua: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS") || ua.includes("MacOS")) return "MacOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Outro";
}

function detectDevice(ua: string): "mobile" | "desktop" {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(ua) ? "mobile" : "desktop";
}

function inferOriginPlatform(utmSource?: string, referrer?: string): string {
  // Prioridade: utm_source
  if (utmSource) {
    const src = utmSource.toLowerCase();
    if (src.includes("facebook") || src.includes("fb")) return "Facebook";
    if (src.includes("instagram") || src.includes("ig")) return "Instagram";
    if (src.includes("tiktok")) return "TikTok";
    if (src.includes("google")) return "Google Ads";
    if (src.includes("linkedin")) return "LinkedIn";
    return src;
  }

  // Fallback: referrer
  if (referrer) {
    const ref = referrer.toLowerCase();
    if (ref.includes("facebook.com") || ref.includes("fb.com")) return "Facebook";
    if (ref.includes("instagram.com")) return "Instagram";
    if (ref.includes("tiktok.com")) return "TikTok";
    if (ref.includes("google.com")) return "Google Orgânico";
    if (ref.includes("linkedin.com")) return "LinkedIn";
    return "Referral";
  }

  return "Direto";
}

function getVisitCount(): number {
  const stored = localStorage.getItem(STORAGE_KEYS.VISIT_COUNT);
  const count = stored ? parseInt(stored, 10) : 0;
  const newCount = count + 1;
  localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, newCount.toString());
  return newCount;
}

function getSessionTime(): number {
  const stored = localStorage.getItem(STORAGE_KEYS.SESSION_START);
  const sessionStart = stored ? parseInt(stored, 10) : Date.now();
  
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SESSION_START, sessionStart.toString());
  }

  return Math.floor((Date.now() - sessionStart) / 1000);
}

function getTotalTime(): number {
  const stored = localStorage.getItem(STORAGE_KEYS.TOTAL_TIME);
  const totalTime = stored ? parseInt(stored, 10) : 0;
  const sessionTime = getSessionTime();
  const newTotal = totalTime + sessionTime;
  
  localStorage.setItem(STORAGE_KEYS.TOTAL_TIME, newTotal.toString());
  
  return newTotal;
}

export function collectExtraData(): ExtraAnalytics {
  const ua = navigator.userAgent;
  const utmSource = getQueryParam("utm_source");
  const referrer = document.referrer;

  return {
    utm_source: utmSource,
    utm_medium: getQueryParam("utm_medium"),
    utm_campaign: getQueryParam("utm_campaign"),
    utm_content: getQueryParam("utm_content"),
    utm_term: getQueryParam("utm_term"),
    fbclid: getQueryParam("fbclid"),
    gclid: getQueryParam("gclid"),
    referrer,
    page_url: window.location.href,
    idioma: navigator.language,
    navegador: detectBrowser(ua),
    sistema_operacional: detectOS(ua),
    dispositivo: detectDevice(ua),
    quantidade_visitas: getVisitCount(),
    tempo_total_no_site_segundos: getTotalTime(),
    tempo_sessao_atual_segundos: getSessionTime(),
    origin_platform: inferOriginPlatform(utmSource, referrer),
    user_agent: ua,
  };
}

// Inicializar sessão ao carregar
if (typeof window !== "undefined") {
  const sessionStart = localStorage.getItem(STORAGE_KEYS.SESSION_START);
  if (!sessionStart) {
    localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString());
  }
}
