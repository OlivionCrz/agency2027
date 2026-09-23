import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { AgencyPage } from "@/components/agency-page";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `Sitios web para ${project.sector.toLowerCase()}`,
    description: project.description,
    alternates: { canonical: `/sectores/${slug}` },
    openGraph: {
      title: `${project.sector} — Agency`,
      description: project.description,
      url: `/sectores/${slug}`,
    },
  };
}
export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projects.some((p) => p.id === slug)) notFound();
  return <AgencyPage sector={slug} />;
}
