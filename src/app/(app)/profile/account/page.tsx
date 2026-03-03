"use client";

import Link from "next/link";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserIcon,
  BusinessIcon,
  ApplePayIcon,
  GooglePayIcon,
} from "@/components/icons";

const accountFormSchema = z.object({
  accountId: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string(),
  connectAccount: z.enum(["personal", "business"]),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  accountId: "ACC-7F3B2K9",
  email: "user@example.com",
  phone: "",
  password: "••••••••••••",
  connectAccount: "personal",
};

const CONNECT_ACCOUNTS = [
  {
    value: "personal",
    label: "Personal",
    description: "Perfect for solo projects and personal use.",
    icon: UserIcon,
  },
  {
    value: "business",
    label: "Business",
    description: "Advanced features for teams and businesses.",
    icon: BusinessIcon,
  },
];

export default function Page() {
  const id = useId();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Account ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Email" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="w-fit"
                    asChild
                  >
                    <Link href="#">Change email</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (999) 123-45-67" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="password"
                      placeholder="••••••••••••"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="w-fit"
                    asChild
                  >
                    <Link href="#">Change password</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>2FA</FormLabel>
              <FormDescription>
                Two-factor authentication adds an extra layer of security to
                your account.
              </FormDescription>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="w-fit"
                asChild
              >
                <Link href="#">Setup 2FA</Link>
              </Button>
            </div>

            <FormField
              control={form.control}
              name="connectAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connect accounts</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {CONNECT_ACCOUNTS.map((account) => {
                        const Icon = account.icon;
                        return (
                          <div
                            key={account.value}
                            className={cn(
                              "border-input has-[[data-state=checked]]:border-primary/50 relative flex flex-col items-center rounded-lg border bg-transparent px-6 pt-6 pb-12 transition-colors",
                              field.value === account.value &&
                                "border-primary/50",
                            )}
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => field.onChange(account.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  field.onChange(account.value);
                                }
                              }}
                              className="absolute inset-0 z-10 cursor-pointer rounded-lg"
                              aria-hidden
                            />
                            <RadioGroupItem
                              value={account.value}
                              id={`${id}-${account.value}`}
                              className="order-1 absolute bottom-4 left-1/2 size-5 -translate-x-1/2 [&_svg]:size-3"
                              aria-describedby={`${id}-${account.value}-description`}
                              aria-label={`${account.label} account`}
                            />
                            <div className="mb-4 flex h-12 w-12 items-center justify-center">
                              <Icon className="size-8 text-muted-foreground" />
                            </div>
                            <h3 className="mb-1 font-semibold">
                              {account.label}
                            </h3>
                            <p
                              id={`${id}-${account.value}-description`}
                              className="text-muted-foreground text-center text-sm"
                            >
                              {account.description}
                            </p>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Linked accounts</FormLabel>
              <FormDescription>
                Connect your Google or Apple account for easier sign-in.
              </FormDescription>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <Link href="#">
                    <GooglePayIcon className="size-5" />
                    Google
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <Link href="#">
                    <ApplePayIcon className="size-5" />
                    Apple
                  </Link>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-fit">
              Update account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
