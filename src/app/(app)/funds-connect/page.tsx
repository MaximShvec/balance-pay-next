import { promises as fs } from "fs";
import path from "path";
import { generateMeta } from "@/lib/utils";
import {
  LeadBySourceCard,
  SalesPipeline,
  RecentTasks,
  FundsStatCards
} from "@/components/funds-connect";
import { TransactionsList } from "@/components/transactions";

async function getTransactions() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(app)/transactions/data.json"),
  );
  return JSON.parse(data.toString());
}

export async function generateMetadata() {
  return generateMeta({
    title: "CRM Admin Dashboard",
    description:
      "CRM admin dashboard template offers a streamlined and interactive interface for managing customer relationships, tracking sales, and analyzing performance metrics. Built with shadcn/ui, Tailwind CSS, Next.js.",
    canonical: "/funds-connect"
  });
}

export default async function Page() {
  const transactions = await getTransactions();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FundsStatCards />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <LeadBySourceCard />
        <RecentTasks />
        <SalesPipeline />
      </div>
      <TransactionsList data={transactions} />
    </div>
  );
}
