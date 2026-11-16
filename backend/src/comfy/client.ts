import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";
import { buildWorkflow, type GenerateRequest } from "./workflow.js";

const storage = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../storage");

type ComfyFile = { filename: string; subfolder?: string; type?: string };

export async function generateOnComfy(input: GenerateRequest) {
  const prompt = buildWorkflow(input, config.checkpoint, config.videoCheckpoint);
  const queued = await fetch(`${config.comfyBaseUrl}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!queued.ok) {
    const detail = await queued.text();
    throw new Error(`ComfyUI recusou o fluxo (${queued.status}). ${detail.slice(0, 300)}`);
  }
  const { prompt_id: promptId } = (await queued.json()) as { prompt_id?: string };
  if (!promptId) throw new Error("ComfyUI não devolveu prompt_id.");

  const file = await waitForFile(promptId);
  const remote = new URL(`${config.comfyBaseUrl}/view`);
  remote.searchParams.set("filename", file.filename);
  remote.searchParams.set("subfolder", file.subfolder ?? "");
  remote.searchParams.set("type", file.type ?? "output");
  const downloaded = await fetch(remote);
  if (!downloaded.ok) throw new Error("Não consegui baixar o arquivo gerado na GPU.");

  await mkdir(storage, { recursive: true });
  const extension = path.extname(file.filename) || (input.mediaType === "video" ? ".webp" : ".png");
  const name = `${promptId}${extension}`;
  await writeFile(path.join(storage, name), Buffer.from(await downloaded.arrayBuffer()));
  return { url: `${config.publicBaseUrl}/media/${name}`, promptId };
}

async function waitForFile(promptId: string): Promise<ComfyFile> {
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    const response = await fetch(`${config.comfyBaseUrl}/history/${promptId}`);
    if (response.ok) {
      const history = (await response.json()) as Record<string, { outputs?: Record<string, Record<string, ComfyFile[]>> }>;
      const outputs = history[promptId]?.outputs;
      const file = outputs && findFile(outputs);
      if (file) return file;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  throw new Error("A GPU não terminou a geração em 3 minutos.");
}

function findFile(outputs: Record<string, Record<string, ComfyFile[]>>) {
  for (const node of Object.values(outputs)) {
    for (const value of Object.values(node)) {
      if (Array.isArray(value) && value[0]?.filename) return value[0];
    }
  }
  return undefined;
}
