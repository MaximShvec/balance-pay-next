import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Ecommerce Admin Dashboard",
  description:
    "The e-commerce admin dashboard template. Built with shadcn/ui, Tailwind CSS, Next.js.",
};

export default function Page() {
  return (
    <div className="space-y-4">
      <DashboardContent />
    </div>
  );
}
