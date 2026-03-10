import { generateMeta } from "@/lib/utils";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/shared";
import {
  KPICards,
  Revenue,
  MonthlyExpenses,
  Summary,
  CardTransactions,
  SavingGoal,
  MyWallet,
} from "@/components/cards";

export async function generateMetadata() {
  return generateMeta({
    title: "Finance Admin Dashboard",
    description:
      "A finance dashboard is an admin panel that visualizes key financial data such as income, expenses, cash flow, budget, and profit. Built with shadcn/ui, Tailwind CSS, Next.js.",
    canonical: "/cards",
  });
}

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-end">
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button size="icon">
            <Download />
          </Button>
        </div>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Revenue />
        <MonthlyExpenses />
        <Summary />
      </div>

      <div className="grid-cols-2 gap-4 space-y-4 lg:grid lg:space-y-0">
        <CardTransactions />
        <div className="space-y-4">
          <SavingGoal />
          <MyWallet />
        </div>
      </div>
    </div>
  );
}
