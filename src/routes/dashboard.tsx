import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot, Box, ChevronLeft, CircleUserRound, Clock3, Coins, Crown, Gift,
  Bug, Eye, Flag, Image as ImageIcon, Instagram, LayoutGrid, Lightbulb, Lock,
  LogOut, Menu, MessageCircle, MessageSquare, Monitor, Palette, Puzzle, Search,
  Send, Shield, Sparkles, Star, Store, UsersRound, Video, WandSparkles, Waves,
  X, Zap,
} from "lucide-react";
import { useState } from "react";
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
  { title: "MINHA CONTA", items: [[ImageIcon, "Minha Galeria"], [MessageSquare, "Biblioteca de Prompts"], [UsersRound, "Comunidade"], [Coins, "Créditos"]] },
] as const;

function DashboardLogo() {
  return <Link to="/" className="dash-brand"><span className="neko-face"><i /><b /><em /></span><span>Neko <strong>IA</strong></span></Link>;
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("Sugestão");
  const [feedback, setFeedback] = useState("");
  return (
    <main className="app-dashboard">
      <aside className={menuOpen ? "dash-sidebar is-open" : "dash-sidebar"}>
        <div className="sidebar-top"><DashboardLogo /><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><ChevronLeft /></Button></div>
        <div className="profile-block"><span><CircleUserRound /></span><div><strong>twcontinha</strong><small>FREE</small></div><LogOut /></div>
        <div className="credit-chip"><Coins /> 2</div>
        <button className="daily"><Gift /><span><strong>Roleta Diária</strong><small>Volta em 20h 40m</small></span></button>
        <div className="dash-search"><Search /><span>Buscar na Neko...</span><kbd>⌘K</kbd></div>
        <nav className="side-nav">
          {menuGroups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.items.map(([Icon, label, active]) => <button className={active ? "active" : ""} key={label}><Icon /><span>{label}</span>{label === "TikTok Shop" && <b>SHOP</b>}</button>)}</div>)}
        </nav>
        <div className="sidebar-ai"><span className="neko-face"><i /><b /><em /></span><div><strong>Neko IA</strong><small>Powered by AI ✨</small></div></div>
      </aside>

      <section className="dash-main">
        <header className="dash-mobile-header"><Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></Button><DashboardLogo /><div className="credit-chip"><Coins /> 2</div></header>
        <div className="dash-content">
          <section className="welcome-bar"><div className="welcome-icon"><Crown /></div><div><span>BOM DIA, TWCONTINHA</span><h1>Explore</h1></div><div className="welcome-actions"><div className="credit-chip"><Coins /> 2</div><Button><b>＋</b> Upgrade</Button></div></section>

          <div className="tool-strip">{tools.map(([Icon, label, badge]) => <button key={label}><Icon /><span>{label}</span>{badge && <b>{badge}</b>}</button>)}</div>

          <section className="feature-banner">
            <div className="feature-copy"><span>▦ NOVO</span><h2>Seedance 2.0</h2><p>O melhor modelo de vídeo do mundo, agora<br /> com 30% OFF.</p><div className="feature-fan">{[style6,style3,style2,style5].map((asset, index)=><img src={asset.url} alt="" key={index}/>)}</div></div>
            <div className="feature-media"><img className="feature-main-image" src={videosAsset.url} alt="Demonstração de vídeo criado por inteligência artificial"/><div>{[style1,style4,style5].map((asset,index)=><img src={asset.url} alt="Exemplo de criação com IA" key={index}/>)}</div></div>
          </section>

          <section className="secondary-banner"><div><span>PRO</span><h2>GPT Image 2</h2><p>Crie imagens com precisão, estilo e qualidade profissional.</p></div><div className="art-row">{[upscaleAsset,style1,style2,style3,style4].map((asset,index)=><img src={asset.url} alt="Galeria de imagens criadas por IA" key={index}/>)}</div></section>

          <section className="automation-banner"><span>⚡ AUTOMAÇÃO</span><h2>Vídeos automáticos</h2><p>Pipeline completo: extrai vídeo do TikTok, troca o rosto e devolve pronto pra postar —<br /> sem cliques.</p><Button><Sparkles /> Abrir Studio</Button><div>{[style2,style5,style3,style1,style6].map((asset,index)=><img src={asset.url} alt="Exemplo de vídeo automático" key={index}/>)}</div></section>

          <section className="kling-banner"><div><span>HOT</span><h2>Kling 3.0 em 4K</h2><p>Vídeos cinematográficos em resolução 4K nativa.</p><strong>8<small>KLING<br/>3.0</small></strong></div><div>{[style4,style6,style1,style5,style2,style3,style6,style4,style1,style5].map((asset,index)=><img src={asset.url} alt="Cena cinematográfica gerada em 4K" key={index}/>)}</div></section>

          <section className="uncensored-banner"><div><span>♨ 18+ · NEKO UNCENSORED</span><h2>Geração sem censura com qualidade de estúdio</h2><p>Crie cenas com realismo cinematográfico. Sem filtros, sem limites criativos — apenas resultados premium.</p><small><Lock /> Conteúdo privado e seguro</small><Button><Sparkles /> Abrir NEKO Uncensored</Button></div><div className="uncensored-preview"><Button variant="secondary"><Eye /> Toque para revelar (18+)</Button></div></section>
          <h3 className="generations-title"><Zap /> Suas gerações</h3>
          <section className="empty-generations"><div><Sparkles /></div><strong>Nenhuma geração ainda</strong><p>Comece criando seu primeiro conteúdo.</p><Button><Sparkles /> Criar</Button></section>
        </div>
      </section>
      <Button className="feedback-fab" size="icon" onClick={() => setFeedbackOpen(true)} aria-label="Enviar opinião"><MessageCircle /></Button>
      {feedbackOpen && <div className="feedback-overlay" role="presentation" onMouseDown={() => setFeedbackOpen(false)}><section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title" onMouseDown={(event) => event.stopPropagation()}><Button variant="ghost" size="icon" className="feedback-close" onClick={() => setFeedbackOpen(false)} aria-label="Fechar"><X /></Button><h2 id="feedback-title">Mande sua opinião</h2><p>Sugestões, reclamações, avaliações ou bugs — tudo conta</p><label>TIPO</label><div className="feedback-types">{[[Lightbulb,"Sugestão"],[Star,"Avaliação"],[Flag,"Reclamação"],[Bug,"Bug"]].map(([Icon,label])=><button className={feedbackType===label?"active":""} onClick={()=>setFeedbackType(label as string)} key={label as string}><Icon /><span>{label as string}</span></button>)}</div><label htmlFor="feedback-text">SUA SUGESTÃO</label><textarea id="feedback-text" value={feedback} maxLength={4000} onChange={(event)=>setFeedback(event.target.value)} placeholder="Ex: Seria legal se tivesse um botão pra duplicar influencer..."/><small>{feedback.length}/4000</small><div className="feedback-actions"><Button variant="outline" onClick={()=>setFeedbackOpen(false)}><X /> Cancelar</Button><Button disabled={!feedback.trim()} onClick={()=>{setFeedback("");setFeedbackOpen(false)}}><Send /> Enviar</Button></div></section></div>}
    </main>
  );
}