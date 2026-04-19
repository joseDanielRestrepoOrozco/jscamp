import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useAiSummary = (jobId) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch(`${API_URL}/ai/summary/${jobId}`);

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      // Si lo que se quiere es usar la respuesta completa sin streaming, se puede des comentar el siguiente bloque de código y comentar el bloque de streaming:
      // const data = await response.json();
      // setSummary(data.summary);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // cada chunk es un fragmento de texto
        const chunk = decoder.decode(value, { stream: true });
        setSummary((prev) => prev + chunk);
      }
    } catch (error) {
      setError("Error generando la descripción resumida", error);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return { summary, generateSummary, loading, error };
};
