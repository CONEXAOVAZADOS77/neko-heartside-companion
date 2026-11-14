export const TRACK_STORAGE_KEY = "neko-ia-perfil";

export type NekoTrack = "basico" | "avancado";

export const TRACKS: Record<
  NekoTrack,
  { label: string; person: string; summary: string }
> = {
  basico: {
    label: "Neko IA — Iniciante",
    person: "Quem está começando com IA",
    summary: "Criar foto, vídeo e influencer com poucos cliques.",
  },
  avancado: {
    label: "Neko IA — Avançado",
    person: "Quem já opera IA no dia a dia",
    summary: "Workflows, Motion Control, TikTok Shop, Flow Studio e +18.",
  },
};

export function isNekoTrack(value: unknown): value is NekoTrack {
  return value === "basico" || value === "avancado";
}

export function readStoredTrack(): NekoTrack {
  if (typeof window === "undefined") return "basico";
  try {
    const stored = window.localStorage.getItem(TRACK_STORAGE_KEY);
    return isNekoTrack(stored) ? stored : "basico";
  } catch {
    return "basico";
  }
}

export function saveTrack(track: NekoTrack) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TRACK_STORAGE_KEY, track);
  } catch {
    /* ignore quota / private mode */
  }
}
