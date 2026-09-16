import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  CirclePlay,
  Coins,
  Layers3,
  Sparkles,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import workflowAsset from "../assets/workflow.gif.asset.json";
import videosAsset from "../assets/videos.gif.asset.json";
import upscaleAsset from "../assets/upscale.webp.asset.json";
import createAsset from "../assets/step-create.png.asset.json";
import publishAsset from "../assets/step-publish.png.asset.json";
import style1 from "../assets/style1.webp.asset.json";
import style2 from "../assets/style2.webp.asset.json";
import style3 from "../assets/style3.webp.asset.json";
import style4 from "../assets/style4.webp.asset.json";
import style5 from "../assets/style5.webp.asset.json";
import style6 from "../assets/style6.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neko IA — Crie influencers com inteligência artificial" },
      { name: "description", content: "Crie influencers hiper-realistas, vídeos, imagens e anúncios com os melhores modelos de IA em uma única plataforma." },
      { property: "og:title", content: "Neko IA — Crie influencers que vendem por você" },
      { property: "og:description", content: "Crie influencers, vídeos e imagens com os melhores modelos de IA em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const gallery = [style1, style2, style3, style4, style5, style6, style2, style4, style6, style1, style5, style3];

const stats = [
  ["2.847", "Criadores ativos"],
  ["184.392", "Vídeos gerados"],
  ["4.9/5", "Avaliação média"],
  ["38s", "Tempo médio de geração"],
];

const tools = [
  { title: "Influencers IA", text: "Crie avatares hiper-realistas com rosto, voz e personalidade próprios. Faça sua influencer falar, gesticular e aparecer em qualquer cenário sem precisar gravar nada.", icon: WandSparkles },
  { title: "Motion Control", text: "Transfira movimentos de um vídeo para qualquer personagem. Lip sync perfeito, expressões sincronizadas e gestos fluidos.", icon: CirclePlay },
  { title: "Skin Enhancer", text: "Remova a aparência artificial das imagens geradas por IA. Adicione poros realistas e textura de pele natural com apenas um clique.", icon: Sparkles },
  { title: "Imagens Full HD", text: "Gere fotos profissionais em alta definição com iluminação realista, composição cinematográfica e detalhes nítidos.", icon: BadgeCheck },
];

const useCases = [
  ["TikTok Ads", "Anúncios virais no TikTok", "UGC autêntico que converte"],
  ["Instagram Reels", "Reels que crescem orgânico", "Conteúdo diário sem aparecer"],
  ["Creator Content", "Personas exclusivas", "Modelos únicas, sem rosto real"],
  ["Dropshipping", "Ads de produto em escala", "Teste 50 criativos por semana"],
];

const plans = [
  { name: "Starter", credits: "350 créditos", price: "69,90", suffix: "único", features: ["Sua influencer com identidade travada", "Foto → vídeo e texto → vídeo", "Modelos Sora 2, Veo 3.1 e Kling 3", "Motion Control incluso", "Ideal pra começar com acesso Pro"] },
  { name: "Creator", credits: "1.000 créditos", price: "197", suffix: "/mês", features: ["Tudo do Starter, com mais volume", "Sora 2 Pro em 4K", "Prioridade máxima na fila", "Suporte premium", "Pra quem posta todo dia"] },
  { name: "Vitalício", credits: "1.300 créditos", price: "259", suffix: "único", featured: true, features: ["Tudo do Creator — sem mensalidade", "Curso completo Neko Academy grátis", "Radar TikTok Shop ILIMITADO", "Bibliotecas de prompts e cenas virais", "Upscale 8K + acesso antecipado", "Comunidade VIP vitalícia"] },
];

const faqs = [
  ["Preciso saber editar vídeo ou usar IA?", "Não. A Neko IA foi feita para ser simples: você escolhe a modelo, descreve o que quer e a plataforma gera tudo pronto — vídeo, voz e edição."],
  ["As modelos parecem realmente humanas?", "Sim. Usamos os modelos de IA mais avançados, com foco em texturas de pele, expressão facial e movimento natural."],
  ["Posso usar o conteúdo comercialmente?", "Sim. Todo conteúdo gerado pode ser usado em anúncios, redes sociais, dropshipping, infoprodutos e outros fins comerciais."],
  ["Quanto custa por mês?", "Os planos começam em R$ 69,90, com créditos para gerar dezenas de imagens e vídeos."],
  ["A mesma modelo aparece igual em todos os vídeos?", "Sim. Nosso sistema mantém rosto, corpo e estilo consistentes em qualquer cenário, roupa ou cena."],
  ["Posso cancelar quando quiser?", "Pode. Sem fidelidade e sem multa."],
];

function Logo() {
  return <a href="#topo" className="brand" aria-label="Neko IA, início"><span className="brand-mark">⌁</span> Neko <b>IA</b></a>;
}

function SectionTitle({ eyebrow, children, text }: { eyebrow: string; children: React.ReactNode; text?: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{children}</h2>{text && <p>{text}</p>}</div>;
}

const rotatingWords = ["influencers", "vídeos UGC", "fotos realistas", "avatares"];

function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    const rotationTimer = setInterval(() => {
      setIsVisible(false);
      transitionTimer = setTimeout(() => {
        setWordIndex((current) => (current + 1) % rotatingWords.length);
        setIsVisible(true);
      }, 360);
    }, 3200);

    return () => {
      clearInterval(rotationTimer);
      if (transitionTimer) clearTimeout(transitionTimer);
    };
  }, []);

  return (
    <span className="rotating-word-shell">
      <em className={isVisible ? "rotating-word is-visible" : "rotating-word"}>
        {rotatingWords[wordIndex]}
      </em>
    </span>
  );
}

function Index() {
  return (
    <main id="topo" className="site-shell">
      <header className="nav-wrap">
        <nav className="nav-bar" aria-label="Navegação principal">
          <Logo />
          <div className="nav-links"><a href="#recursos">Recursos</a><a href="#como-funciona">Como Funciona</a><a href="#galeria">Galeria</a><a href="#precos">Preços</a></div>
          <div className="nav-actions"><a href="#precos" className="login">Entrar</a><a href="#precos" className="primary small">Criar conta grátis <ArrowRight /></a></div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow" />
        <div className="model-pill"><Sparkles /> Sora 2 · Veo 3.1 · Kling 3.0 · Nano Banana — tudo em um lugar</div>
        <h1>Crie <RotatingWord /><br />que vendem por você.</h1>
        <p>Os melhores modelos de IA do mundo — que custariam <strong>+R$ 3.900/mês</strong><br className="desktop" /> separados — em uma única plataforma. Pague só pelo que gerar, a partir de <strong>R$ 21.</strong></p>
        <div className="hero-actions"><a href="#precos" className="primary">Criar minha primeira influencer <ArrowRight /></a><a href="#como-funciona" className="secondary"><CirclePlay /> Ver como funciona</a></div>
        <div className="mini-benefits"><span><Zap /> Comece em 1 minuto</span><span><Coins /> Economize seu dinheiro</span><span><Sparkles /> +10.000 criadores</span></div>
      </section>

      <div className="photo-stream" aria-label="Exemplos de influencers criadas com IA">
        {gallery.map((asset, i) => <img key={i} src={asset.url} alt={`Influencer virtual criada pela Neko IA ${i + 1}`} />)}
      </div>

      <section className="trust-band"><p>Usado por criadores, dropshippers e infoprodutores</p><div className="stats">{stats.map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>

      <section id="recursos" className="section">
        <SectionTitle eyebrow="Ferramentas">Tudo numa <em>ferramenta só</em>,<br /> sem 5 assinaturas diferentes.</SectionTitle>
        <div className="workflow-card">
          <div className="workflow-copy"><div className="icon-box"><Workflow /></div><span className="kicker">Workflow Automático</span><h3>Conecte +20 IAs em <em>1 workflow</em></h3><p>Prompt gera imagem. Imagem vira vídeo. Vídeo recebe upscale. Cada bloco alimenta o próximo automaticamente.</p><ul><li><Check /> Arraste, conecte e roda</li><li><Check /> Custo em créditos antes de gerar</li><li><Check /> Salve e reuse seus workflows</li></ul></div>
          <img src={workflowAsset.url} alt="Demonstração de workflow conectando múltiplas IAs" />
        </div>
        <div className="tool-grid">{tools.map(({title,text,icon:Icon}) => <article className="tool-card" key={title}><div className="icon-box"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="media-grid"><article><div className="media-copy"><CirclePlay /><h3>Vídeos Ultra Realistas</h3><p>Acesse Kling, Veo 3.1, Sora 2 Pro e mais. Qualidade de cinema, movimento natural e física realista.</p></div><img src={videosAsset.url} alt="Vídeo ultra realista gerado com inteligência artificial" /></article><article><div className="media-copy"><Sparkles /><h3>Upscale 8K</h3><p>Amplie imagens em até 8K, preservando detalhes da pele, iluminação e estrutura facial.</p></div><img src={upscaleAsset.url} alt="Demonstração do ampliador de imagens 8K" /></article></div>
      </section>

      <section id="como-funciona" className="section steps-section">
        <SectionTitle eyebrow="Como funciona" text="Crie a influencer, produza o conteúdo, publique e monetize. Sem ferramenta extra, sem editor, sem complicação.">Três passos pra sair do zero<br /> <em>e gerar receita</em>.</SectionTitle>
        <div className="step"><div className="step-copy"><span className="step-number">01</span><span className="kicker">Crie & personalize</span><h3>Sua influencer perfeita em segundos</h3><p>Enquanto outros criadores gastam horas em edição, sua IA gera uma influencer fotorrealista pronta pra postar. Você escolhe rosto, corpo, estilo e personalidade.</p><b><Check /> Você nunca mais parte do zero</b></div><img src={createAsset.url} alt="Tela de criação de uma influencer virtual" /></div>
        <div className="step reverse"><div className="step-copy"><span className="step-number">02</span><span className="kicker">Estilize & produza</span><h3>Pare de gravar quando a IA pode produzir por você</h3><p>Sua influencer trabalha 24/7 — gerando ensaios, reels e stories automaticamente, com estilo consistente e cenários ilimitados.</p><b><Check /> Conteúdo profissional no piloto automático</b></div><div className="style-collage">{[style1,style2,style3,style4,style5,style6].map((x,i)=><img src={x.url} alt={`Estilo visual ${i+1}`} key={i}/>)}</div></div>
        <div className="step"><div className="step-copy"><span className="step-number">03</span><span className="kicker">Publique & monetize</span><h3>Configure uma vez. Faça caixa todos os dias.</h3><p>Publique no TikTok e Instagram com agendamento automático. Monetize com assinaturas e conteúdo exclusivo — receita recorrente no automático.</p><b><Check /> Toda oportunidade rastreada</b></div><img src={publishAsset.url} alt="Painel de publicação e monetização" /></div>
      </section>

      <section id="galeria" className="section">
        <SectionTitle eyebrow="Casos de uso">Pra qualquer <em>tipo de conteúdo</em>.</SectionTitle>
        <div className="use-grid">{useCases.map(([tag,title,text],i)=><article key={tag} style={{backgroundImage:`linear-gradient(to top, var(--background) 2%, transparent 85%), url(${gallery.at(i + 1)?.url ?? style1.url})`}}><span>{tag}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="section workflows-section">
        <SectionTitle eyebrow="Bônus — Workflows Prontos" text="Carregue um template testado pro seu cenário, ajuste o que quiser e gere em minutos.">Comece com um <em>workflow pronto</em>.</SectionTitle>
        <div className="templates">{[
          ["Influencers UGC pra TikTok Shop","Avatar ultra-realista falando do seu produto, voz IA e edição cortada."],
          ["Anúncios de alta conversão pra Meta Ads","Hook + ator + CTA + legenda animada. Teste criativos e escale o que converter."],
          ["Conteúdos virais pra ganhar seguidores","Roteiro + lip sync + corte dinâmico no formato 9:16. Pronto para publicar."],
          ["+10 workflows disponíveis","Carrosséis, VSL com narração, motion control, troca de roupa, ad UGC e mais."],
        ].map(([t,p],i)=><article key={t}><span>{i===3?"Biblioteca":"Workflow Pronto"}</span><div className="template-icon"><Layers3 /></div><h3>{t}</h3><p>{p}</p><ArrowRight /></article>)}</div>
      </section>

      <section className="adult-section"><div className="adult-inner"><div><span className="kicker">18+ — Sem censura</span><h2>Crie também <em>conteúdo sensual</em>.</h2><p>Uma plataforma com liberdade criativa para ensaios e conteúdo boudoir, com acesso exclusivo para maiores de idade.</p></div><div className="adult-grid">{gallery.slice(0,6).map((a,i)=><div key={i}><img src={a.url} alt="Conteúdo com acesso restrito para maiores de 18 anos"/><span>18+</span>{i===0&&<b>Toque para revelar</b>}</div>)}</div><small>Conteúdo destinado exclusivamente a maiores de 18 anos.</small></div></section>

      <section className="section savings">
        <SectionTitle eyebrow="Faça as contas" text="Os melhores modelos do mercado custam caro quando contratados individualmente. Na Neko IA, tudo fica em um único plano.">Quanto você pagaria <em>separado</em><br /> por tudo isso?</SectionTitle>
        <div className="cost-card"><div className="cost-list">{[["Google Flow Ultra","Veo 3.1 + Nano Banana","R$ 1.375/mês"],["ChatGPT Pro","Sora 2 + Image 2","R$ 1.100/mês"],["Kling AI Pro","Kling 3 + Motion Control","R$ 200/mês"],["Magnific AI","Skin Enhancer + Upscale 8K","R$ 540/mês"],["ElevenLabs Pro","Áudio + Voiceover","R$ 540/mês"]].map(([a,b,c])=><div key={a}><span><b>{a}</b><small>{b}</small></span><strong>{c}</strong></div>)}</div><div className="total"><span>Soma de tudo <small>(referência)</small></span><strong>R$ 3.975<small>/mês</small></strong><p>Na Neko IA, tudo em um único plano por uma fração disso.</p></div></div>
      </section>

      <section id="precos" className="section pricing">
        <SectionTitle eyebrow="Planos" text="Personas, conteúdo diário e ads que convertem. Tudo na Neko IA, em poucos cliques.">Escolha o plano ideal<br /> <em>para dominar suas redes</em></SectionTitle>
        <div className="plan-grid">{plans.map(plan=><article className={plan.featured?"plan featured":"plan"} key={plan.name}>{plan.featured&&<div className="popular">🔥 Pague uma vez, use sempre</div>}<h3>{plan.name}</h3><span className="credits">{plan.credits}</span><div className="price"><sup>R$</sup>{plan.price}<small>{plan.suffix}</small></div><ul>{plan.features.map(f=><li key={f}><Check />{f}</li>)}</ul><a className={plan.featured?"primary":"secondary"} href="#topo">Assinar agora <ArrowRight /></a></article>)}</div><p className="free-note"><Check /> Grátis pra começar. Sem cartão.</p>
      </section>

      <section className="section faq"><SectionTitle eyebrow="FAQ">Perguntas <em>frequentes</em>.</SectionTitle><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div></section>

      <footer><div><Logo /><p>Crie. Publique. Monetize.</p></div><div><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#precos">Planos</a></div><p>© 2026 Neko IA. Todos os direitos reservados.</p></footer>
    </main>
  );
}