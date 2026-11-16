import { Router } from "express";
import { generateOnComfy } from "../comfy/client.js";
import type { MediaKind } from "../comfy/workflow.js";

export const generateRouter = Router();

generateRouter.post("/generate", async (req, res) => {
  const prompt = String(req.body?.prompt ?? "").trim().slice(0, 2000);
  const mediaType = req.body?.mediaType === "video" ? "video" : req.body?.mediaType === "image" ? "image" : "";
  const style = String(req.body?.style ?? "none").trim().slice(0, 120);
  if (!prompt || !mediaType) {
    res.status(400).json({ ok: false, error: "Envie prompt e mediaType (image ou video)." });
    return;
  }
  try {
    const result = await generateOnComfy({ prompt, mediaType: mediaType as MediaKind, style });
    res.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar.";
    res.status(502).json({ ok: false, error: message });
  }
});
