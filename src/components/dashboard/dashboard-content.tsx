"use client";

import {
  WelcomeCard,
  StatCards,
  ChartProjectEfficiency,
  ReturnRateCard,
  RecentOrdersCard,
} from "@/components/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DashboardTabContent() {
  return (
    <>
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
    </>
  );
}

export function DashboardContent() {
  return (
    <Tabs defaultValue="usd" className="w-full">
      <TabsList>
        <TabsTrigger value="usd">USD</TabsTrigger>
        <TabsTrigger value="eur">EUR</TabsTrigger>
      </TabsList>
      <TabsContent value="usd" className="mt-4 space-y-4">
        <DashboardTabContent />
      </TabsContent>
      <TabsContent value="eur" className="mt-4 space-y-4">
        <DashboardTabContent />
      </TabsContent>
    </Tabs>
  );
}
