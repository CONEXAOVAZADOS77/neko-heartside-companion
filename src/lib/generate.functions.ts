import { createServerFn } from "@tanstack/react-start";

type GenerateInput = {
  kind: "photo" | "video";
  tool: string;
  fields: Record<string, string>;
};

export const generateMedia = createServerFn({ method: "POST" })
  .validator((data: GenerateInput) => data)
  .handler(async ({ data }) => {
    const key = process.env.FAL_KEY;
    if (!key) {
      return { ok: false as const, error: "Falta a chave FAL_KEY nos segredos do app. Sem ela a geração não começa." };
    }

    const prompt = [data.tool, ...Object.values(data.fields)].map((value) => value.trim()).filter(Boolean).join(". ").slice(0, 2000);
    if (!prompt) return { ok: false as const, error: "Preencha pelo menos um campo." };

    const endpoint = data.kind === "photo" ? "fal-ai/flux/schnell" : "fal-ai/minimax/video-01";
    const body = data.kind === "photo" ? { prompt, image_size: "portrait_4_3" } : { prompt };
    const response = await fetch(`https://fal.run/${endpoint}`, {
      method: "POST",
      headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return { ok: false as const, error: `A geração não concluiu (resposta ${response.status}).` };
    }

    const json = (await response.json()) as { images?: { url?: string }[]; video?: { url?: string } };
    const url = data.kind === "photo" ? json.images?.[0]?.url : json.video?.url;
    if (!url) return { ok: false as const, error: "A geração terminou sem um arquivo." };
    return { ok: true as const, url, kind: data.kind };
  });
