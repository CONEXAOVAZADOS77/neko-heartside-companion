import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.js";
import { generateRouter } from "./routes/generate.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const storage = path.resolve(root, "../storage");

const app = express();
app.use(cors({ origin: config.corsOrigin === "*" ? true : config.corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use("/media", express.static(storage));
app.get("/health", (_req, res) => {
  res.json({ ok: true, comfy: config.comfyBaseUrl });
});
app.use("/api", generateRouter);

app.listen(config.port, () => {
  console.log(`Neko media API em http://localhost:${config.port}`);
});
