import { Router } from "express";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
import { JobModel } from "../models/job.js";
import { CONFIG } from "../../config.js";

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // Limitar a 10 solicitudes por IP por minuto
  message: "Demasiadas solicitudes, por favor intenta de nuevo más tarde.",
  legacyHeaders: false, // Desactivar las cabeceras de límite de velocidad heredadas
  standardHeaders: "draft-8", // devuelve headers standard rate limit
});

export const aiRouter = Router();

aiRouter.use(aiRateLimiter);

export const openai = new OpenAI({
  apiKey: CONFIG.AI_API_KEY,
  baseURL: CONFIG.BASE_URL_AI,
});

aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  const systemPrompt = `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición o información adicional. Solo responde con el resumen de la oferta de trabajo.Responde siempre con el markdown directamente, sin explicaciones adicionales.`;

  const prompt = [
    `Resume en 5-6 frases la siguiente oferta de trabajo:`,
    `Incluye: rol, empresa, ubicación y requisitos principales.`,
    `Usa un tono claro y directo en español`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicación}`,
    `Descripción: ${job.content}`,
  ].join("\n");

  try {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // En caso de querer usar la respuesta completa sin streaming, se puede des comentar el siguiente bloque de código y comentar el bloque de streaming:
    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     { role: "system", content: systemPrompt },
    //     { role: "user", content: prompt },
    //   ],
    //   model: CONFIG.MODEL_AI,
    // });

    // const summary = completion.choices?.[0]?.message?.content?.trim();

    // if (!summary) {
    //   return res.status(502).json({ error: "No se pudo generar el resumen" });
    // }

    // return res.json({ summary });

    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: CONFIG.MODEL_AI,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(content);
      }
    }

    return res.end();
  } catch (error) {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: "Error generando resumen" });
    }
    return res.end();
  }
});

export default aiRouter;
