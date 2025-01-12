"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

const FormForgotPassword = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormData) {}

  return (
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
        <Button className="w-full uppercase" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormForgotPassword;
