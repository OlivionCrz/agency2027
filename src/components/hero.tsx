import { ArrowDown, ArrowUpRight } from "lucide-react";
type BackgroundProps = { image?: string; video?: string; poster?: string };
export function HeroBackground({ image, video, poster }: BackgroundProps) {
  return <div className="hero-background" aria-hidden="true">{video ? <video className="hero-video" autoPlay muted loop playsInline poster={poster || image}><source src={video} type="video/mp4" /></video> : image ? <img src={image} alt="" className="hero-media" /> : null}<div className="hero-grid" /><div className="hero-shade" /></div>;
}
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><HeroBackground /><div className="hero-topline"><span>DISEÑO & DESARROLLO WEB</span><span>COSTA RICA / DISPONIBLES PARA CREAR</span></div><div className="hero-content"><p className="eyebrow"><span className="small-line" /> EL SIGUIENTE CAPÍTULO DE TU NEGOCIO</p><h1 id="hero-title">Comienza un <span className="year">2027</span><br />con tu sitio web<span className="green-period">.</span></h1><div className="hero-bottom"><p>Tu negocio ya tiene algo especial.<br />Hagamos que también se sienta en internet.</p><a className="button button-green" href="#ejemplos">Descubre lo que podemos crear <ArrowUpRight size={18} /></a></div></div><div className="hero-foot"><a href="#ejemplos"><ArrowDown size={15} /> SIGUE EXPLORANDO</a><span>HECHO PARA LO QUE VIENE.</span><span className="hero-index">01 — 06</span></div></section>;
}
