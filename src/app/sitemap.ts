import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.url }, ...projects.map(p => ({ url: `${site.url}/sectores/${p.id}` }))]; }
