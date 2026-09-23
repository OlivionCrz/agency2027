"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/content";
const Context = createContext({ context: "mi próximo sitio web", setContext: (_value: string) => {} });
export function ContactProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState("mi próximo sitio web");
  return <Context.Provider value={{ context, setContext }}>{children}</Context.Provider>;
}
export const useContact = () => useContext(Context);
export function ContactLink({ children = "Conversemos", context, className = "button button-green" }: { children?: ReactNode; context?: string; className?: string }) {
  const current = useContact();
  const url = whatsappUrl(context || current.context);
  return <a className={className} href={url || "#contacto"} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined}>{children}<ArrowUpRight size={17} aria-hidden /></a>;
}
export function FloatingContact() {
  const { context } = useContact();
  const url = whatsappUrl(context);
  return <a className="floating-contact" href={url || "#contacto"} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined} aria-label={url ? "Consultar por WhatsApp" : "Ver información de contacto"}><MessageCircle size={23} /><span>Hablemos</span></a>;
}
