const host = process.env.COMFYUI_HOST ?? "127.0.0.1";
const comfyPort = process.env.COMFYUI_PORT ?? "8188";

export const config = {
  port: Number(process.env.PORT ?? 8787),
  comfyBaseUrl: (process.env.COMFYUI_BASE_URL ?? `http://${host}:${comfyPort}`).replace(/\/$/, ""),
  publicBaseUrl: (process.env.PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 8787}`).replace(/\/$/, ""),
  checkpoint: process.env.COMFYUI_CHECKPOINT ?? "v1-5-pruned-emaonly.safetensors",
  videoCheckpoint: process.env.COMFYUI_VIDEO_CHECKPOINT ?? "svd.safetensors",
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
};
