import { generateMeta } from "@/lib/utils";
import {
  Operations,
  LinkedMethods,
  FundsStatCards,
  IbansBalanceCard,
} from "@/components/funds";
import { AssetsTable } from "@/components/dashboard";

export async function generateMetadata() {
  return generateMeta({
    title: "CRM Admin Dashboard",
    description:
      "CRM admin dashboard template offers a streamlined and interactive interface for managing customer relationships, tracking sales, and analyzing performance metrics. Built with shadcn/ui, Tailwind CSS, Next.js.",
    canonical: "/funds",
  });
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FundsStatCards />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <IbansBalanceCard />
        <Operations />
        <LinkedMethods />
      </div>
      <AssetsTable filterBy="fiat" />
    </div>
  );
}
