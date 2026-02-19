import React, { useState, useEffect } from "react";
import Dropzone from "./Dropzone";
import { sendToWebhook } from "../services/api";
import { FilePreview } from "../types";

interface FormContainerProps {
  onNotify: (message: string, type: "success" | "error" | "info") => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ onNotify }) => {
  const [apiKey, setApiKey] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [menuDescription, setMenuDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake progress simulation during submission
  useEffect(() => {
    let interval: any;
    if (isSubmitting) {
      setProgress(5);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 800);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey) {
      onNotify("Por favor, insira sua Chave API.", "error");
      return;
    }
    if (!merchantId) {
      onNotify("Por favor, insira o Merchant ID.", "error");
      return;
    }
    if (files.length === 0) {
      onNotify("Por favor, anexe o cardápio.", "error");
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const result = await sendToWebhook(
        apiKey,
        merchantId,
        files.map((f) => f.file),
        menuDescription,
      );
      if (result.success) {
        setProgress(100);
        setTimeout(() => {
          setIsSuccess(true);
          setFiles([]);
          setMenuDescription("");
          onNotify("Cardápio cadastrado, ver produtos", "success");
        }, 500);
      } else {
        onNotify(result.message || "Erro no processamento galáctico.", "error");
      }
    } catch (error) {
      onNotify("A comunicação com a estação base falhou.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-card rounded-[40px] p-12 text-center w-full max-w-xl animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-secondary/30 shadow-[0_0_40px_rgba(0,137,64,0.4)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
          MISSÃO CUMPRIDA!
        </h2>
        <p className="text-white/60 mb-10 text-lg">
          Seu cardápio foi processado e já está em órbita no portal do parceiro.
        </p>

        <div className="space-y-4">
          <a
            href={`https://partner.pigz.com.br/merchant/${merchantId}/products`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center bg-secondary hover:bg-green-700 text-white font-bold py-6 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 gap-3 text-xl uppercase tracking-widest"
          >
            Ver produtos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <button
            onClick={() => setIsSuccess(false)}
            className="block w-full text-white/30 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pt-4"
          >
            Iniciar Nova Missão
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[40px] p-10 w-full shadow-2xl relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute top-0 left-0 w-full h-2 bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-space-pink to-space-purple transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-shimmer"></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.2em] font-black text-white/30 ml-1">
              Secure API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/5 focus:ring-2 focus:ring-space-pink/40 focus:border-space-pink outline-none transition-all hover:bg-white/10 text-lg"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.2em] font-black text-white/30 ml-1">
              Merchant Identity
            </label>
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="ID-PRO-001"
              className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/5 focus:ring-2 focus:ring-space-pink/40 focus:border-space-pink outline-none transition-all hover:bg-white/10 text-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs uppercase tracking-[0.2em] font-black text-white/30 ml-1">
            Upload de Matriz
          </label>
          <Dropzone files={files} setFiles={setFiles} onNotify={onNotify} />
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.2em] font-black text-white/30 ml-1">
            Descrição / Prompt do Cardápio
          </label>
          <textarea
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
            placeholder="Ex: Categorias principais são: Entradas, Pratos Principais, Bebidas. Complementos incluem: Arroz, Feijão, Saladas. Descreva a estrutura esperada..."
            rows={4}
            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/5 focus:ring-2 focus:ring-space-pink/40 focus:border-space-pink outline-none transition-all hover:bg-white/10 text-base resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-green-700 text-white font-black py-6 rounded-2xl shadow-[0_10px_40px_rgba(0,137,64,0.4)] transition-all duration-500 transform hover:-translate-y-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-xl uppercase tracking-[0.1em] group"
        >
          {isSubmitting ? (
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center gap-3">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                CADASTRANDO CARDÁPIO...
              </span>
              <span className="text-[10px] font-bold text-white/50">
                {Math.round(progress)}% Concluído
              </span>
            </div>
          ) : (
            <>
              Lançar Cardápio
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
