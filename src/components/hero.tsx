import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroBackground } from "./hero-background";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="hero-topline">
        <span>DISEÑO & DESARROLLO WEB</span>
        <span>COSTA RICA / DISPONIBLES PARA CREAR</span>
      </div>
      <div className="hero-content">
        <p className="eyebrow">
          <span className="small-line" /> EL SIGUIENTE CAPÍTULO DE TU NEGOCIO
        </p>
        <h1 id="hero-title">
          Comienza un <span className="year">2027</span> <br />
          con tu sitio web
        </h1>
        <div className="hero-bottom">
          <p>
            Tu negocio ya tiene algo especial.
            <br />
            Hagamos que también se sienta en internet.
          </p>
          <a className="button button-green" href="#ejemplos">
            Descubre lo que podemos crear <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <a href="#ejemplos">
          <ArrowDown size={15} /> SIGUE EXPLORANDO
        </a>
        <span>HECHO PARA LO QUE VIENE.</span>
        <span className="hero-index">01 — 06</span>
      </div>
    </section>
  );
}
