"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
const links = [["Ejemplos", "ejemplos"], ["Servicios", "servicios"], ["SEO", "seo"], ["Planes", "planes"]];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="navbar"><Link href="/" className="wordmark" aria-label={`${site.name}, inicio`}>{site.name.toLowerCase()}<span>®</span></Link><nav aria-label="Navegación principal" className={open ? "nav-links is-open" : "nav-links"}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="#contacto" className="nav-contact" onClick={() => setOpen(false)}>Hablemos <ArrowUpRight size={15} /></a></nav><button className="menu-button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>;
}
