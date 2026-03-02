import {
  WelcomeCard,
  StatCards,
  ChartProjectEfficiency,
  ReturnRateCard,
  RecentOrdersCard,
} from "@/components/dashboard";

export const metadata = {
  title: "Ecommerce Admin Dashboard",
  description:
    "The e-commerce admin dashboard template. Built with shadcn/ui, Tailwind CSS, Next.js.",
};

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">
          Dashboard Внизу табы (евро и доллар)
        </h1>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-12">
          <WelcomeCard />
          <div className="md:col-span-12 lg:col-span-8">
            <StatCards />
          </div>
        </div>
        <div className="space-y-4 xl:grid xl:grid-cols-3 xl:gap-4 xl:space-y-0">
          <div className="xl:col-span-2">
            <ReturnRateCard />
          </div>
          <div className="xl:col-span-1">
            <ChartProjectEfficiency />
          </div>
        </div>
        <div className="space-y-4 xl:grid xl:grid-cols-12 xl:gap-4 xl:space-y-0">
          <RecentOrdersCard />
        </div>
      </div>
    </div>
  );
}
