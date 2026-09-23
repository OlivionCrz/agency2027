import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/content";
export function ContactLink({
  children = "Conversemos",
  className = "button button-green",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const url = whatsappUrl();
  return (
    <a
      className={className}
      href={url || "#contacto"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden />
    </a>
  );
}
export function FloatingContact() {
  const url = whatsappUrl();
  return (
    <a
      className="floating-contact"
      href={url || "#contacto"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
      aria-label={
        url ? "Consultar por WhatsApp" : "Ver información de contacto"
      }
    >
      <MessageCircle size={23} />
      <span>Hablemos</span>
    </a>
  );
}
