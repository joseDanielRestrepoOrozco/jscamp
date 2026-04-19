import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { DEFAULTS } from "../config.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
import router from "./routes/router.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.set("trust proxy", 1); // Para que funcione correctamente el rate limiter detrás de un proxy o balanceador de carga, como Nginx, Cloudflare, vercel

app.use(corsMiddleware());
app.use(express.json());

app.use("/api", router);

app.use(unknownEndpoint);

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
