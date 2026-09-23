export const site = {
  name: "Agency",
  title: "Comienza un 2027 con tu sitio web",
  description: "Sitios web para emprendimientos que quieren dar su próximo paso. Diseño, desarrollo y SEO en Costa Rica.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
};

export function whatsappUrl(context = "mi próximo sitio web") {
  const number = site.whatsapp.replace(/[\s()+-]/g, "");
  return /^\d{8,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(`Hola, me gustaría conversar sobre ${context}.`)}`
    : null;
}

export type Project = {
  id: string;
  sector: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
} & ({ mode: "internal"; demo: "florist"; url?: never } | { mode: "external"; url: string; embeddable: boolean });

export const projects: Project[] = [
  {
    id: "floristeria", sector: "Floristería", title: "Un detalle que florece.",
    description: "Una forma de mostrar lo que haces con el mismo cuidado con el que lo creas.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Flores de tonos claros y rosados con tallos verdes",
    mode: "internal", demo: "florist",
  },
  {
    id: "medicina-estetica", sector: "Medicina estética", title: "Confianza desde el primer clic.",
    description: "Conoce el sitio de Medi Estética Integral y una forma de acercar los servicios médicos a sus pacientes.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Tratamiento facial en un espacio de cuidado personal",
    mode: "external", url: "https://mediesteticaintegral.vercel.app/", embeddable: true,
  },
];

export const services = [
  { number: "01", title: "Crecimiento digital", text: "Conectamos lo que hace especial a tu negocio con las personas que lo están buscando.", tags: "Estrategia · Contenido · Conversión" },
  { number: "02", title: "Desarrollo y optimización web", text: "Una web rápida, clara y fácil de usar. Hecha para tu negocio y para el teléfono de tus clientes.", tags: "Diseño · Desarrollo · Rendimiento" },
  { number: "03", title: "Consultoría y auditoría", text: "Revisamos dónde estás, encontramos oportunidades y definimos el siguiente paso contigo.", tags: "Diagnóstico · Prioridades · Acompañamiento" },
];

export const plans = [
  { name: "Presencia web", subtitle: "Tu primer espacio propio.", features: ["Una página con tu historia y servicios", "Diseño adaptable a celular", "Contacto por WhatsApp", "Configuración SEO inicial"], featured: false },
  { name: "Sitio para crecer", subtitle: "Más espacio para lo que haces.", features: ["Páginas para tus servicios", "Diseño a la medida de tu negocio", "Estructura para contenido y SEO local", "Optimización de velocidad"], featured: true },
  { name: "Tienda online", subtitle: "Tus productos, más cerca.", features: ["Catálogo y fichas de productos", "Carrito y flujo de compra", "Integraciones de pago por definir", "Guía para administrar tu tienda"], featured: false },
];
