import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type OperationType = {
  id: string;
  name: string;
  count: number;
  value: number;
  color: string;
};

const pipelineData: OperationType[] = [
  {
    id: "receive",
    name: "Receive",
    count: 156,
    value: 89200,
    color: "bg-[var(--chart-1)]",
  },
  {
    id: "send",
    name: "Send",
    count: 124,
    value: 67500,
    color: "bg-[var(--chart-2)]",
  },
  {
    id: "exchange",
    name: "Exchange",
    count: 98,
    value: 54300,
    color: "bg-[var(--chart-3)]",
  },
  {
    id: "convert",
    name: "Convert",
    count: 67,
    value: 38100,
    color: "bg-[var(--chart-4)]",
  },
  {
    id: "move",
    name: "Move",
    count: 52,
    value: 28900,
    color: "bg-[var(--chart-5)]",
  },
];

const totalValue = pipelineData.reduce((sum, stage) => sum + stage.value, 0);
const totalCount = pipelineData.reduce((sum, stage) => sum + stage.count, 0);

export function Operations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operations</CardTitle>
        <CardDescription>
          Операции по типам: receive, send, exchange, convert, move.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="mb-6 flex h-4 w-full overflow-hidden rounded-full">
            {pipelineData.map((stage) => (
              <Tooltip key={stage.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`${stage.color} h-full`}
                    style={{ width: `${(stage.value / totalValue) * 100}%` }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-medium">{stage.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {stage.count} операций
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ${stage.value.toLocaleString()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="space-y-4">
          {pipelineData.map((stage) => (
            <div key={stage.id} className="flex items-center gap-4">
              <div className={`h-3 w-3 rounded-full ${stage.color}`}></div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{stage.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {stage.count} операций · ${stage.value.toLocaleString()}
                  </p>
                </div>
                <div className="flex w-24 items-center gap-2">
                  <Progress
                    value={(stage.count / totalCount) * 100}
                    className="h-2"
                    indicatorColor={stage.color}
                  />
                  <span className="text-muted-foreground w-10 text-right text-xs">
                    {Math.round((stage.value / totalValue) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
