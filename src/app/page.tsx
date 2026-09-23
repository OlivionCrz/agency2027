import type { Metadata } from "next";
import { AgencyPage } from "@/components/agency-page";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return <AgencyPage />;
}
