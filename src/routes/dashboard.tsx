import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Bot, BookOpen, Box, ChevronLeft, CircleUserRound, Clock3, Coins, Crown, Flame, Gift,
  Bug, Eye, Flag, Home, Image as ImageIcon, LayoutGrid, Lightbulb, Link2, Lock,
  Menu, MessageCircle, MessageSquare, Monitor, Palette, Puzzle, Rocket, Search,
  Send, Share2, Shield, Sparkles, Star, Store, UsersRound, Video, WandSparkles, Waves,
  Workflow, X, Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateStudio } from "../components/create-studio";
import { Button } from "../components/ui/button";
import style1 from "../assets/style1.webp.asset.json";
import style2 from "../assets/style2.webp.asset.json";
import style3 from "../assets/style3.webp.asset.json";
import style4 from "../assets/style4.webp.asset.json";
import style5 from "../assets/style5.webp.asset.json";
import style6 from "../assets/style6.webp.asset.json";
import videosAsset from "../assets/videos.gif.asset.json";
import upscaleAsset from "../assets/upscale.webp.asset.json";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Explore — Neko IA" },
      { name: "description", content: "Explore as ferramentas de criação de imagens, vídeos e influencers da Neko IA." },
      { property: "og:title", content: "Explore — Neko IA" },
      { property: "og:description", content: "Sua central de criação com inteligência artificial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const tools = [
  [ImageIcon, "Imagem"], [Video, "Vídeo"], [WandSparkles, "Marketing Studio", "PREMIUM"],
  [Bot, "Flow Studio", "NOVO"], [UsersRound, "Influencer"], [Monitor, "Motion"],
  [ImageIcon, "Upscale 4K"], [Palette, "Instagram → IA"], [Waves, "Limpar Meta"],
  [MessageSquare, "Prompts"], [Zap, "Comunidade"], [Clock3, "Histórico"],
] as const;

const menuGroups = [
  { title: "INÍCIO", items: [[LayoutGrid, "Painel", true], [Gift, "Área de Membros"], [Bot, "NEKO Assistant"]] },
  { title: "TIKTOK SHOP", items: [[Store, "TikTok Shop"], [WandSparkles, "Mineração"], [Video, "TikTok Shop Vídeo"], [Puzzle, "Extensão"]] },
  { title: "CRIAR FOTOS", items: [[Sparkles, "Gerar Foto"], [Crown, "NEKO IMAGEM | +18"], [ImageIcon, "Foto Automática"], [Box, "Foto Clone"], [UsersRound, "Criar Influencer"]] },
  { title: "CRIAR VÍDEOS", items: [[Video, "Gerar Vídeo"], [Crown, "NEKO VÍDEO | +18"], [WandSparkles, "Vídeo Automático"], [Monitor, "Motion Control"], [Workflow, "Flow Studio"]] },
  { title: "FERRAMENTAS", items: [[Palette, "Wallpaper"], [Zap, "Upscale 4K"], [Waves, "Limpar Metadados"], [Shield, "Camuflar Criativo"]] },
  { title: "MINHA CONTA", items: [[ImageIcon, "Minha Galeria"], [MessageSquare, "Biblioteca de Prompts"], [UsersRound, "Comunidade"], [Share2, "Contas Sociais"], [Coins, "Créditos"]] },
] as const;

const feedbackTypes = [[Lightbulb, "Sugestão"], [Star, "Avaliação"], [Flag, "Reclamação"], [Bug, "Bug"]] as const;

const TOUR_KEY = "neko-tour-done";
const socialUrl = "https://scalexpro.com.br";

const tourSteps = [
  { icon: Sparkles, title: "Bem-vindo à Neko IA!", text: "Vamos fazer um tour rápido (1 min) pelas principais funcionalidades da plataforma. Você pode pular a qualquer momento e revisitar pelo botão “Ver tutorial” na sidebar." },
  { icon: Home, title: "Painel", text: "Sua tela inicial — destaques, ferramentas em alta e atalhos rápidos pra começar a criar." },
  { icon: Bot, title: "Neko Assistant", text: "Seu assistente de IA por voz/texto. Peça pra ele criar imagens, vídeos ou executar fluxos completos com linguagem natural." },
  { icon: Sparkles, title: "Criar Influencer", text: "Gere uma influencer realista do zero. Escolha rosto, corpo, estilo — e salve como modelo reutilizável." },
  { icon: ImageIcon, title: "Gerar Imagem", text: "Crie fotos ultra-realistas a partir de prompts. Selecione um modelo da biblioteca pra manter a identidade fixa." },
  { icon: Flame, title: "Neko Uncensored", text: "Gerador sem restrições com até 10 imagens de referência. Ideal pra cenas mais ousadas mantendo realismo extremo." },
  { icon: Zap, title: "Upscale 4K", text: "Aumente a resolução de qualquer imagem em até 4K mantendo nitidez fotográfica." },
  { icon: Shield, title: "Limpar Metadados", text: "Remove EXIF, marcas C2PA e adiciona ruído imperceptível pra suas fotos passarem como autênticas." },
  { icon: Video, title: "Gerar Vídeo", text: "Transforme imagens em vídeos cinematográficos. Vários modelos disponíveis, do rápido ao ultra-qualidade." },
  { icon: Monitor, title: "Motion Control", text: "Use um vídeo de referência pra controlar a movimentação e aplicar sua influencer mantendo a coreografia." },
  { icon: Puzzle, title: "Flow Studio", text: "Canvas visual estilo Figma pra montar pipelines completas: imagem → análise → vídeo → upscale, tudo encadeado em nós." },
  { icon: WandSparkles, title: "Vídeo Automático", text: "Cole um link do TikTok, escolha sua influencer, e a IA recria o vídeo inteiro com seu rosto — sem mexer em nada." },
  { icon: ImageIcon, title: "Foto Automática", text: "Importa fotos do Instagram e gera versões com sua influencer mantendo pose, cenário e roupa." },
  { icon: Link2, title: "Multilinks", text: "Crie páginas link-in-bio personalizadas pras suas influencers (12 templates prontos)." },
  { icon: BookOpen, title: "Biblioteca de Prompts", text: "Centenas de prompts curados prontos pra usar. Filtra por categoria e clica pra gerar direto." },
  { icon: ImageIcon, title: "Galeria", text: "Histórico unificado de tudo que você gerou (imagens e vídeos), organizado por data." },
  { icon: MessageSquare, title: "Comunidade", text: "Feed e chat ao vivo com outros criadores da Neko. Compartilhe resultados e tire dúvidas." },
  { icon: Share2, title: "Contas Sociais", text: "Gerencie perfis do TikTok e Instagram conectados às suas influencers.", href: socialUrl },
  { icon: Coins, title: "Créditos", text: "Sua moeda interna. Cada operação consome créditos — operações canceladas ou com erro são reembolsadas automaticamente." },
  { icon: Rocket, title: "Tudo pronto!", text: "Você já viu o essencial. Quando quiser rever, é só clicar em “Ver tutorial” no rodapé da sidebar. Bora criar?" },
];

function DashboardLogo() {
  return <Link to="/" className="dash-brand"><span className="neko-face"><i /><b /><em /></span><span>Neko <strong>IA</strong></span></Link>;
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("Sugestão");
  const [feedback, setFeedback] = useState("");
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [screen, setScreen] = useState<"explore" | "photo" | "video">("explore");
  const [tool, setTool] = useState("Gerar Foto");

  const photoLabels = new Set(menuGroups[2].items.map((item) => item[1]));
  const videoLabels = new Set(menuGroups[3].items.map((item) => item[1]));

  const openLabel = (label: string) => {
    if (label === "Painel") setScreen("explore");
    if (photoLabels.has(label)) {
      setScreen("photo");
      setTool(label);
    }
    if (videoLabels.has(label)) {
      setScreen("video");
      setTool(label);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) setTourOpen(true);
  }, []);

  const closeTour = () => {
    localStorage.setItem(TOUR_KEY, "1");
    setTourOpen(false);
    setTourStep(0);
  };

  const replayTour = () => {
    setTourStep(0);
    setTourOpen(true);
  };

  const step = tourSteps[tourStep];
  const StepIcon = step.icon;
  const lastStep = tourStep === tourSteps.length - 1;

  return (
    <main className="app-dashboard">
      <aside className={menuOpen ? "dash-sidebar is-open" : "dash-sidebar"}>
        <div className="sidebar-top"><DashboardLogo /><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><ChevronLeft /></Button></div>
        <div className="profile-block"><span><CircleUserRound /></span><div><strong>Visitante</strong><small>EXEMPLO</small></div></div>
        <div className="credit-chip"><Coins /> 2</div>
        <button className="daily"><Gift /><span><strong>Roleta Diária</strong><small>Volta em 20h 40m</small></span></button>
        <div className="dash-search"><Search /><span>Buscar na Neko...</span><kbd>⌘K</kbd></div>
        <nav className="side-nav">
          {menuGroups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.items.map(([Icon, label]) => label === "Contas Sociais" ? <a className="side-link" href={socialUrl} target="_blank" rel="noreferrer" key={label}><Icon /><span>{label}</span></a> : <button className={(label === "Painel" && screen === "explore") || label === tool && screen !== "explore" ? "active" : ""} key={label} onClick={() => openLabel(label)}><Icon /><span>{label}</span>{label === "TikTok Shop" && <b>SHOP</b>}</button>)}</div>)}
        </nav>
        <button className="replay-tour" type="button" onClick={replayTour}>Ver tutorial</button>
        <div className="sidebar-ai"><span className="neko-face"><i /><b /><em /></span><div><strong>Neko IA</strong><small>Powered by AI ✨</small></div></div>
      </aside>

      <section className="dash-main">
        <header className="dash-mobile-header"><Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></Button><DashboardLogo /><div className="credit-chip"><Coins /> 2</div></header>
        <div className="dash-content">
          <p className="demo-banner">Demonstração pública. Nome, créditos e gerações são exemplos. Nenhuma conta é acessada aqui.</p>
          <section className="welcome-bar"><div className="welcome-icon"><Crown /></div><div><span>DEMONSTRAÇÃO</span><h1>Explore</h1></div><div className="welcome-actions"><div className="credit-chip"><Coins /> 2</div><Button><b>＋</b> Upgrade</Button></div></section>

          {screen === "explore" ? <>
          <div className="tool-strip">{tools.map(([Icon, label, badge]) => <button key={label} onClick={() => label === "Imagem" ? openLabel("Gerar Foto") : label === "Vídeo" ? openLabel("Gerar Vídeo") : undefined}><Icon /><span>{label}</span>{badge && <b>{badge}</b>}</button>)}</div>

          <section className="feature-banner">
            <div className="feature-copy"><span>▦ NOVO</span><h2>Seedance 2.0</h2><p>O melhor modelo de vídeo do mundo, agora<br /> com 30% OFF.</p><div className="feature-fan">{[style6,style3,style2,style5].map((asset, index)=><img src={asset.url} alt="" key={index}/>)}</div></div>
            <div className="feature-media"><img className="feature-main-image" src={videosAsset.url} alt="Demonstração de vídeo criado por inteligência artificial"/><div>{[style1,style4,style5].map((asset,index)=><img src={asset.url} alt="Exemplo de criação com IA" key={index}/>)}</div></div>
          </section>

          <section className="secondary-banner"><div><span>PRO</span><h2>GPT Image 2</h2><p>Crie imagens com precisão, estilo e qualidade profissional.</p></div><div className="art-row">{[upscaleAsset,style1,style2,style3,style4].map((asset,index)=><img src={asset.url} alt="Galeria de imagens criadas por IA" key={index}/>)}</div></section>

          <section className="automation-banner"><span>⚡ AUTOMAÇÃO</span><h2>Vídeos automáticos</h2><p>Pipeline completo: extrai vídeo do TikTok, troca o rosto e devolve pronto pra postar —<br /> sem cliques.</p><Button><Sparkles /> Abrir Studio</Button><div>{[style2,style5,style3,style1,style6].map((asset,index)=><img src={asset.url} alt="Exemplo de vídeo automático" key={index}/>)}</div></section>

          <section className="kling-banner"><div><span>HOT</span><h2>Kling 3.0 em 4K</h2><p>Vídeos cinematográficos em resolução 4K nativa.</p><strong>8<small>KLING<br/>3.0</small></strong></div><div>{[style4,style6,style1,style5,style2,style3,style6,style4,style1,style5].map((asset,index)=><img src={asset.url} alt="Cena cinematográfica gerada em 4K" key={index}/>)}</div></section>

          <section className="uncensored-banner"><div><span>♨ 18+ · NEKO UNCENSORED</span><h2>Geração sem censura com qualidade de estúdio</h2><p>Crie cenas com realismo cinematográfico. Sem filtros, sem limites criativos — apenas resultados premium.</p><small><Lock /> Conteúdo privado e seguro</small><Button><Sparkles /> Abrir NEKO Uncensored</Button></div><div className="uncensored-preview"><Button variant="secondary"><Eye /> Toque para revelar (18+)</Button></div></section>
          <h3 className="generations-title"><Zap /> Suas gerações</h3>
          <section className="empty-generations"><div><Sparkles /></div><strong>Nenhuma geração ainda</strong><p>Comece criando seu primeiro conteúdo.</p><Button onClick={() => openLabel("Gerar Foto")}><Sparkles /> Criar</Button></section>
          </> : <CreateStudio kind={screen} tool={tool} onTool={setTool} />}
        </div>
      </section>
      {tourOpen && <div className="tour-overlay" role="presentation"><section className="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title"><div className="tour-top"><span><Sparkles /> PASSO {tourStep + 1} / {tourSteps.length}</span><Button variant="ghost" size="icon" onClick={closeTour} aria-label="Fechar tutorial"><X /></Button></div><div className="tour-progress" aria-hidden="true"><i style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%` }} /></div><h2 id="tour-title"><StepIcon /> {step.title}</h2><p>{step.text}</p>{step.href && <a className="tour-external" href={step.href} target="_blank" rel="noreferrer">Abrir contas sociais <ArrowRight /></a>}<div className="tour-actions"><button type="button" className="tour-skip" onClick={closeTour}>Pular tour</button><div><Button variant="outline" disabled={tourStep === 0} onClick={() => setTourStep((current) => current - 1)}><ArrowLeft /> Voltar</Button><Button onClick={() => lastStep ? closeTour() : setTourStep((current) => current + 1)}>{lastStep ? "Concluir tour" : <>Próximo <ArrowRight /></>}</Button></div></div></section></div>}
      <Button className="feedback-fab" size="icon" onClick={() => setFeedbackOpen(true)} aria-label="Enviar opinião"><MessageCircle /></Button>
      {feedbackOpen && <div className="feedback-overlay" role="presentation" onMouseDown={() => setFeedbackOpen(false)}><section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title" onMouseDown={(event) => event.stopPropagation()}><Button variant="ghost" size="icon" className="feedback-close" onClick={() => setFeedbackOpen(false)} aria-label="Fechar"><X /></Button><h2 id="feedback-title">Mande sua opinião</h2><p>Sugestões, reclamações, avaliações ou bugs — tudo conta</p><label>TIPO</label><div className="feedback-types">{feedbackTypes.map(([Icon,label])=><Button variant="outline" className={feedbackType===label?"active":""} onClick={()=>setFeedbackType(label)} key={label}><Icon /><span>{label}</span></Button>)}</div><label htmlFor="feedback-text">SUA SUGESTÃO</label><textarea id="feedback-text" value={feedback} maxLength={4000} onChange={(event)=>setFeedback(event.target.value)} placeholder="Ex: Seria legal se tivesse um botão pra duplicar influencer..."/><small>{feedback.length}/4000</small><div className="feedback-actions"><Button variant="outline" onClick={()=>setFeedbackOpen(false)}><X /> Cancelar</Button><Button disabled={!feedback.trim()} onClick={()=>{setFeedback("");setFeedbackOpen(false)}}><Send /> Enviar</Button></div></section></div>}
    </main>
  );
}