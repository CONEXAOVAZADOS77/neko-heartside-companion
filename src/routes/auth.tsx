import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import photo1 from "../assets/dashboard/photo1.webp.asset.json";
import photo2 from "../assets/dashboard/photo2.webp.asset.json";
import photo3 from "../assets/dashboard/photo3.webp.asset.json";
import photo4 from "../assets/dashboard/photo4.webp.asset.json";
import photo5 from "../assets/dashboard/photo5.webp.asset.json";
import photo6 from "../assets/dashboard/photo6.webp.asset.json";
import photo7 from "../assets/dashboard/photo7.webp.asset.json";
import photo8 from "../assets/dashboard/photo8.webp.asset.json";
import photo9 from "../assets/dashboard/photo9.webp.asset.json";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Demonstração — Neko IA" },
      { name: "description", content: "Prévia visual da Neko IA. Não há conta, senha nem login com Google ou Apple." },
      { property: "og:title", content: "Demonstração — Neko IA" },
      { property: "og:description", content: "Prévia visual. Nenhum dado de acesso é pedido ou validado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardLogin,
});

const photos = [photo1, photo5, photo8, photo2, photo6, photo9, photo3, photo7, photo4, photo8, photo2, photo9, photo5, photo7];

function NekoLogo() {
  return (
    <Link to="/" className="dashboard-logo" aria-label="Neko IA, página inicial">
      <span className="neko-face" aria-hidden="true"><i /><b /><em /></span>
      <span>Neko <strong>IA</strong></span>
    </Link>
  );
}

function DashboardLogin() {
  const navigate = useNavigate({ from: "/auth" });

  return (
    <main className="dashboard-login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <NekoLogo />
          <div className="login-heading">
            <h1 id="login-title">Demonstração visual</h1>
            <p>Não há conta, senha nem login com Google ou Apple. O painel ao lado é só uma prévia.</p>
          </div>

          <Button className="email-submit" type="button" onClick={() => navigate({ to: "/dashboard" })}>Abrir o painel de demonstração</Button>
          <p className="signup-line"><Link to="/">Voltar para a página inicial</Link></p>
        </div>
      </section>

      <section className="influencer-wall" aria-label="Influencers virtuais criadas pela Neko IA">
        <div className="wall-grid">
          {photos.map((photo, index) => (
            <img src={photo.url} alt="" key={`${photo.url}-${index}`} />
          ))}
        </div>
        <div className="wall-copy">
          <strong>CRIADAS POR IA</strong>
          <p>Influencers virtuais hiper-realistas que geram conteúdo,<br /> engajam audiências e escalam sua presença digital 24/7.</p>
        </div>
      </section>
    </main>
  );
}