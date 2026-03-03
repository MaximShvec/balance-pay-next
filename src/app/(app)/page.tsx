import { DashboardContent } from "@/components/dashboard/dashboard-content";

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
          Dashboard
        </h1>
      </div>
      <DashboardContent />
    </div>
  );
}
