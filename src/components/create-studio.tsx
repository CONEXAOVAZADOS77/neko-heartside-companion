import { Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";

const mediaApi = import.meta.env.VITE_MEDIA_API ?? "http://127.0.0.1:8787";

type StudioKind = "photo" | "video";

type Tool = {
  title: string;
  lead: string;
  fields: { name: string; label: string; placeholder: string; multiline?: boolean }[];
};

const photoTools: Tool[] = [
  {
    title: "Gerar Foto",
    lead: "Crie fotos ultra-realistas a partir de um prompt e mantenha a identidade da influencer.",
    fields: [
      { name: "prompt", label: "Prompt", placeholder: "Descreva a cena, a roupa e a luz", multiline: true },
      { name: "model", label: "Modelo", placeholder: "Identidade da influencer" },
      { name: "ratio", label: "Formato", placeholder: "1:1, 4:5 ou 9:16" },
    ],
  },
  {
    title: "NEKO IMAGEM | +18",
    lead: "Geração sem restrições, com até 10 imagens de referência.",
    fields: [
      { name: "prompt", label: "Prompt", placeholder: "Descreva a cena", multiline: true },
      { name: "refs", label: "Referências", placeholder: "Até 10 imagens" },
    ],
  },
  {
    title: "Foto Automática",
    lead: "Importa fotos e gera versões com a sua influencer, mantendo pose, cenário e roupa.",
    fields: [
      { name: "source", label: "Origem", placeholder: "Link ou fotos de referência" },
      { name: "influencer", label: "Influencer", placeholder: "Modelo que vai aparecer" },
    ],
  },
  {
    title: "Foto Clone",
    lead: "Parte de uma foto pronta e troca a pessoa mantendo o enquadramento.",
    fields: [
      { name: "source", label: "Foto base", placeholder: "Imagem de origem" },
      { name: "influencer", label: "Influencer", placeholder: "Quem entra no lugar" },
    ],
  },
  {
    title: "Criar Influencer",
    lead: "Gere uma influencer do zero. Escolha rosto, corpo e estilo e salve como modelo reutilizável.",
    fields: [
      { name: "face", label: "Rosto", placeholder: "Traços, idade aparente, expressão" },
      { name: "body", label: "Corpo", placeholder: "Altura e proporção" },
      { name: "style", label: "Estilo", placeholder: "Visual, cabelo e paleta" },
    ],
  },
];

const videoTools: Tool[] = [
  {
    title: "Gerar Vídeo",
    lead: "Transforme uma imagem em vídeo cinematográfico, do modelo rápido ao de alta qualidade.",
    fields: [
      { name: "prompt", label: "Prompt", placeholder: "O que a pessoa faz na cena", multiline: true },
      { name: "model", label: "Modelo", placeholder: "Rápido ou ultra-qualidade" },
      { name: "image", label: "Imagem de partida", placeholder: "Foto que vira o primeiro quadro" },
    ],
  },
  {
    title: "NEKO VÍDEO | +18",
    lead: "Vídeo sem restrições, a partir da influencer e de uma cena descrita.",
    fields: [
      { name: "prompt", label: "Cena", placeholder: "Descreva o movimento", multiline: true },
      { name: "influencer", label: "Influencer", placeholder: "Modelo da cena" },
    ],
  },
  {
    title: "Vídeo Automático",
    lead: "Cole um link do TikTok, escolha a influencer e a IA recria o vídeo com o rosto dela.",
    fields: [
      { name: "link", label: "Link do TikTok", placeholder: "https://" },
      { name: "influencer", label: "Influencer", placeholder: "Rosto que entra no vídeo" },
    ],
  },
  {
    title: "Motion Control",
    lead: "Use um vídeo de referência para controlar o movimento e manter a coreografia.",
    fields: [
      { name: "reference", label: "Vídeo de referência", placeholder: "Link ou arquivo do movimento" },
      { name: "influencer", label: "Influencer", placeholder: "Quem executa a coreografia" },
    ],
  },
  {
    title: "Flow Studio",
    lead: "Monte o fluxo: imagem, análise, vídeo e upscale, um passo depois do outro.",
    fields: [
      { name: "prompt", label: "Pedido inicial", placeholder: "O que o fluxo deve produzir", multiline: true },
      { name: "steps", label: "Etapas", placeholder: "Imagem → vídeo → upscale" },
    ],
  },
];

export function CreateStudio({ kind, tool, onTool }: { kind: StudioKind; tool: string; onTool: (tool: string) => void }) {
  const tools = kind === "photo" ? photoTools : videoTools;
  const current = tools.find((item) => item.title === tool) ?? tools[0];
  const [notice, setNotice] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = current.fields.map((field) => String(form.get(field.name) ?? "").trim()).filter(Boolean);
    const style = String(form.get("style") ?? "none").trim() || "none";
    setBusy(true);
    setNotice("");
    setMediaUrl("");
    try {
      const response = await fetch(`${mediaApi}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: [current.title, ...fields].join(". "),
          mediaType: kind === "photo" ? "image" : "video",
          style,
        }),
      });
      const result = (await response.json()) as { ok: boolean; url?: string; error?: string };
      if (!result.ok || !result.url) setNotice(result.error ?? "A geração não devolveu um arquivo.");
      else setMediaUrl(result.url);
    } catch {
      setNotice("Não foi possível falar com o backend da GPU.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="studio">
      <div className="studio-head">
        <span>{kind === "photo" ? "CRIAR FOTOS" : "CRIAR VÍDEOS"}</span>
        <h1>{current.title}</h1>
        <p>{current.lead}</p>
      </div>
      <div className="studio-tools" role="tablist">
        {tools.map((item) => (
          <button type="button" role="tab" aria-selected={item.title === current.title} className={item.title === current.title ? "is-active" : ""} key={item.title} onClick={() => { setNotice(""); setMediaUrl(""); onTool(item.title); }}>
            {item.title}
          </button>
        ))}
      </div>
      <form className="studio-form" onSubmit={submit} key={current.title}>
        <label>
          LoRA / estilo
          <input name="style" placeholder="none ou nome.safetensors" defaultValue="none" />
        </label>
        {current.fields.map((field) => (
          <label key={field.name}>
            {field.label}
            {field.multiline ? <textarea name={field.name} placeholder={field.placeholder} rows={4} /> : <input name={field.name} placeholder={field.placeholder} />}
          </label>
        ))}
        <Button type="submit" disabled={busy}><Sparkles /> {busy ? "Gerando…" : kind === "photo" ? "Gerar foto" : "Gerar vídeo"}</Button>
        <p className="studio-note">O pedido vai para o backend local, que envia o fluxo ao ComfyUI na GPU.</p>
        {notice && <p className="studio-result" role="status">{notice}</p>}
        {mediaUrl && kind === "photo" && <img className="studio-media" src={mediaUrl} alt="Foto gerada" />}
        {mediaUrl && kind === "video" && <video className="studio-media" src={mediaUrl} controls />}
      </form>
    </section>
  );
}
