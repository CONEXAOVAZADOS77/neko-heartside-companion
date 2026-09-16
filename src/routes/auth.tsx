import { createFileRoute, Link } from "@tanstack/react-router";
import { Apple, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";

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
import { Checkbox } from "../components/ui/checkbox";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Entrar — Neko IA" },
      { name: "description", content: "Entre na Neko IA e continue criando influencers e conteúdos com inteligência artificial." },
      { property: "og:title", content: "Entrar — Neko IA" },
      { property: "og:description", content: "Acesse sua conta Neko IA e continue criando." },
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

function GoogleIcon() {
  return <span className="google-mark" aria-hidden="true">G</span>;
}

function DashboardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preencha seus dados para continuar.");
  }

  return (
    <main className="dashboard-login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <NekoLogo />
          <div className="login-heading">
            <h1 id="login-title">Bem-vindo de volta</h1>
            <p>Entre e continue criando.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Digite seu email" autoComplete="email" required />

            <div className="password-label">
              <label htmlFor="password">Senha</label>
              <a href="#recuperar" onClick={(event) => { event.preventDefault(); setMessage("A recuperação de senha estará disponível em breve."); }}>Esqueceu sua senha?</a>
            </div>
            <div className="password-field">
              <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Digite sua senha" autoComplete="current-password" required />
              <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <label className="remember-row">
              <Checkbox checked={remember} onCheckedChange={(checked) => setRemember(checked === true)} />
              <span>Lembrar meu login por 30 dias</span>
            </label>

            <Button className="email-submit" type="submit">Entrar com email</Button>
            <div className="login-divider"><span>Ou</span></div>

            <Button className="social-login" type="button" variant="outline" onClick={() => setMessage("O acesso com Google estará disponível em breve.")}><GoogleIcon /> Continuar com Google</Button>
            <Button className="social-login" type="button" variant="outline" onClick={() => setMessage("O acesso com Apple estará disponível em breve.")}><Apple /> Continuar com Apple</Button>
            <p className="login-status" aria-live="polite">{message}</p>
          </form>

          <p className="signup-line">Ainda não tem conta? <a href="#criar" onClick={(event) => { event.preventDefault(); setMessage("A criação de conta estará disponível em breve."); }}>Criar</a></p>
          <p className="login-legal">Ao continuar, você concorda com a <a href="#privacidade">Política de Privacidade</a> e os <a href="#termos">Termos de uso</a>.</p>
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