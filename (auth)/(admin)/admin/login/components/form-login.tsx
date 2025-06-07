"use client";
import React, { startTransition, useActionState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignInCredentials } from "@/lib/actions";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

const FormLogin = () => {
  const [state, action, isPending] = useActionState(SignInCredentials, null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormData) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("loginType", "admin");

    startTransition(() => {
      action(formData);
    });
  }

  const checking = form.watch("email") && form.watch("password");

  return (
    <>
      {state?.message && (
        <div className="flex items-center p-4 text-red-600 bg-red-100 border border-red-200 rounded-md mt-4 w-42">
          <XCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">{state?.message}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-rose-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                        form.formState.errors.email ? "focus:border-rose-500" : "focus:border-gray-300"
                      }`
                    )}
                    placeholder="Email-mu"
                    {...field}
                    type="email"
                  />
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
                <FormLabel>
                  Password <span className="text-rose-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                        form.formState.errors.password ? "focus:border-rose-500" : "focus:border-gray-300"
                      }`
                    )}
                    placeholder="Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full uppercase" type="submit" disabled={isPending || !checking}>
            {isPending ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FormLogin;
