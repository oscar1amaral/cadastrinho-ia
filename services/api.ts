import { WebhookResponse } from "../types";

const WEBHOOK_URL =
  "https://pseudoimpartial-nonreputable-august.ngrok-free.dev/webhook/receber-dados-cardápio";

/**
 * Envia a chave API, o Merchant ID e os arquivos para o webhook especificado.
 * Captura a resposta detalhada de erro do n8n se disponível.
 */
export const sendToWebhook = async (
  apiKey: string,
  merchantId: string,
  files: File[],
): Promise<WebhookResponse> => {
  try {
    const formData = new FormData();
    formData.append("apiKey", apiKey);
    formData.append("merchantId", merchantId);

    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      // In case response is not JSON
      data = { message: await response.text() };
    }

    if (!response.ok) {
      // Return the specific error message from n8n if possible
      const serverMessage =
        data?.message || data?.error || `Erro do servidor (${response.status})`;
      return {
        success: false,
        message: serverMessage,
      };
    }

    return {
      success: true,
      message: "Cardápio cadastrado com sucesso!",
      data,
    };
  } catch (error) {
    console.error("Erro no webhook:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao servidor n8n. Verifique sua conexão.",
    };
  }
};
