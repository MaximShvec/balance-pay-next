import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WelcomeCard() {
  return (
    <Card className="bg-[var(--base-200)] relative overflow-hidden md:col-span-12 2xl:col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl">Congratulations Maksim! 🎉</CardTitle>
        <CardDescription>Your total balance today is</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-3xl md:text-4xl">$39,231.90</div>
            <div className="text-muted-foreground text-xs">
              <span className="text-green-500">+65%</span> from last month
            </div>
          </div>
          {/* <Button variant="default" className="self-end">
            View History
          </Button> */}
        </div>
      </CardContent>
      {/* <Image
        width={800}
        height={300}
        src={`/star-shape.png`}
        className="pointer-events-none absolute inset-0 aspect-auto"
        unoptimized
        alt="..."
      /> */}
    </Card>
  );
}
