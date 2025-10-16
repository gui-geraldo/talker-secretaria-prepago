// Envio de leads para webhook com idempotência e fallbacks

import { collectExtraData } from "./analytics";
import { WEBHOOK_URL, PRIMARY_FETCH_TIMEOUT_MS, DEBUG_LEAD } from "./config";

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName?: string;
  form_id?: string;
  [key: string]: any;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

async function tryFetchJson(url: string, payload: any, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Idempotency-Key": payload.idempotency_key,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    });

    clearTimeout(timeoutId);

    if (DEBUG_LEAD) {
      console.log("[Webhook] Fetch JSON response:", response.status, response.ok);
    }

    return response.ok;
  } catch (error) {
    clearTimeout(timeoutId);
    if (DEBUG_LEAD) {
      console.warn("[Webhook] Fetch JSON failed:", error);
    }
    return false;
  }
}

function trySendBeacon(url: string, payload: any): boolean {
  if (!navigator.sendBeacon) {
    if (DEBUG_LEAD) {
      console.warn("[Webhook] sendBeacon not available");
    }
    return false;
  }

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const success = navigator.sendBeacon(url, blob);

    if (DEBUG_LEAD) {
      console.log("[Webhook] sendBeacon result:", success);
    }

    return success;
  } catch (error) {
    if (DEBUG_LEAD) {
      console.warn("[Webhook] sendBeacon failed:", error);
    }
    return false;
  }
}

async function tryFetchNoCors(url: string, payload: any): Promise<boolean> {
  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (DEBUG_LEAD) {
      console.log("[Webhook] Fetch no-cors attempted (assume success)");
    }

    return true;
  } catch (error) {
    if (DEBUG_LEAD) {
      console.warn("[Webhook] Fetch no-cors failed:", error);
    }
    return false;
  }
}

export async function sendLeadWebhook(input: LeadPayload): Promise<boolean> {
  if (!WEBHOOK_URL) {
    if (DEBUG_LEAD) {
      console.error("[Webhook] WEBHOOK_URL not configured");
    }
    return false;
  }

  const idempotencyKey = generateIdempotencyKey();
  const extraData = collectExtraData();

  // Montar payload canônico (PT-BR)
  const canonicalPayload = {
    Nome: input.name,
    Email: input.email,
    Celular: onlyDigits(input.phone),
    Empresa: input.company || "",
    produto_popup: input.productName || "",
    form_id: input.form_id || "",
    idempotency_key: idempotencyKey,
    data_envio: new Date().toISOString(),
    // Analytics
    ...extraData,
    // Extras
    ...Object.keys(input)
      .filter((k) => !["name", "email", "phone", "company", "productName", "form_id"].includes(k))
      .reduce((acc, k) => ({ ...acc, [k]: input[k] }), {}),
  };

  // URL com query string
  const params = new URLSearchParams({
    produto_popup: canonicalPayload.produto_popup,
    idem: idempotencyKey,
  });
  const urlWithQuery = `${WEBHOOK_URL}?${params.toString()}`;

  if (DEBUG_LEAD) {
    console.log("[Webhook] Sending lead:", canonicalPayload);
    console.log("[Webhook] URL:", urlWithQuery);
  }

  // Tentativa 1: Fetch JSON com timeout
  const fetchJsonSuccess = await tryFetchJson(urlWithQuery, canonicalPayload, PRIMARY_FETCH_TIMEOUT_MS);
  if (fetchJsonSuccess) {
    if (DEBUG_LEAD) {
      console.log("[Webhook] ✅ Success via Fetch JSON");
    }
    return true;
  }

  // Tentativa 2: sendBeacon
  const beaconSuccess = trySendBeacon(urlWithQuery, canonicalPayload);
  if (beaconSuccess) {
    if (DEBUG_LEAD) {
      console.log("[Webhook] ✅ Success via sendBeacon");
    }
    return true;
  }

  // Tentativa 3: Fetch no-cors (último recurso)
  const noCorsSuccess = await tryFetchNoCors(urlWithQuery, canonicalPayload);
  if (noCorsSuccess) {
    if (DEBUG_LEAD) {
      console.log("[Webhook] ✅ Success via Fetch no-cors");
    }
    return true;
  }

  if (DEBUG_LEAD) {
    console.error("[Webhook] ❌ All attempts failed");
  }

  return false;
}
