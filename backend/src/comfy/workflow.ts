export type MediaKind = "image" | "video";

export type GenerateRequest = {
  prompt: string;
  mediaType: MediaKind;
  style: string;
};

const safeName = /^[\w.-]+\.safetensors$/;

export function buildWorkflow(input: GenerateRequest, checkpoint: string, videoCheckpoint: string) {
  const lora = input.style && input.style !== "none" && safeName.test(input.style) ? input.style : "";
  const modelSource: [string, number] = lora ? ["11", 0] : ["4", 0];
  const clipSource: [string, number] = lora ? ["11", 1] : ["4", 1];

  const graph: Record<string, { class_type: string; inputs: Record<string, unknown> }> = {
    "4": {
      class_type: input.mediaType === "video" ? "ImageOnlyCheckpointLoader" : "CheckpointLoaderSimple",
      inputs: { ckpt_name: input.mediaType === "video" ? videoCheckpoint : checkpoint },
    },
    "6": { class_type: "CLIPTextEncode", inputs: { text: input.prompt, clip: clipSource } },
    "7": { class_type: "CLIPTextEncode", inputs: { text: "low quality, blurry", clip: clipSource } },
    "5": {
      class_type: "EmptyLatentImage",
      inputs: { width: 768, height: 1024, batch_size: input.mediaType === "video" ? 16 : 1 },
    },
    "3": {
      class_type: "KSampler",
      inputs: {
        seed: Math.floor(Math.random() * 1_000_000_000),
        steps: input.mediaType === "video" ? 20 : 24,
        cfg: 7,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: modelSource,
        positive: ["6", 0],
        negative: ["7", 0],
        latent_image: ["5", 0],
      },
    },
    "8": { class_type: "VAEDecode", inputs: { samples: ["3", 0], vae: ["4", 2] } },
    "9": {
      class_type: input.mediaType === "video" ? "SaveAnimatedWEBP" : "SaveImage",
      inputs: input.mediaType === "video"
        ? { filename_prefix: "neko-video", fps: 8, lossless: false, quality: 80, method: "default", images: ["8", 0] }
        : { filename_prefix: "neko", images: ["8", 0] },
    },
  };

  if (lora) {
    graph["11"] = {
      class_type: "LoraLoader",
      inputs: {
        lora_name: lora,
        strength_model: 0.8,
        strength_clip: 0.8,
        model: ["4", 0],
        clip: ["4", 1],
      },
    };
  }

  return graph;
}
