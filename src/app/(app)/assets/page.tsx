import { generateMeta } from "@/lib/utils";
import {
  LeadBySourceCard,
  SalesPipeline,
  RecentTasks,
} from "@/components/funds";
import { AssetsStatCards } from "@/components/assets";
import { AssetsTable } from "@/components/dashboard";

export async function generateMetadata() {
  return generateMeta({
    title: "Assets - CRM Admin Dashboard",
    description:
      "CRM admin dashboard template offers a streamlined and interactive interface for managing customer relationships, tracking sales, and analyzing performance metrics. Built with shadcn/ui, Tailwind CSS, Next.js.",
    canonical: "/assets",
  });
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AssetsStatCards />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <LeadBySourceCard />
        <RecentTasks />
        <SalesPipeline />
      </div>
      <AssetsTable filterBy="crypto" />
    </div>
  );
}
