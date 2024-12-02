"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    phoneNumber: z.string().min(10).max(13),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'male' or 'female'",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

const FormRegister = () => {
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        gender: values.gender,
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "User registered successfully!" });

        // Clear the form data
        form.reset();
      }
    } catch (error: any) {
      setIsLoading(false);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  }

  return (
    <div className="relative">
      {/* Notification */}
      {notification && (
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 rounded-md text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-12 gap-4 gap-y-6">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                            form.formState.errors.firstName ? "focus:border-rose-500" : "focus:border-gray-300"
                          }`
                        )}
                        placeholder="First Name"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                            form.formState.errors.lastName ? "focus:border-rose-500" : "focus:border-gray-300"
                          }`
                        )}
                        placeholder="Last Name"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className={cn(
                          `block w-full p-2 border rounded-md focus:outline-none focus-visible:ring-0 ${
                            form.formState.errors.gender ? "border-rose-500" : "border-gray-300"
                          }`
                        )}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
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
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                            form.formState.errors.phoneNumber ? "focus:border-rose-500" : "focus:border-gray-300"
                          }`
                        )}
                        placeholder="Phone Number"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
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
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `block focus:outline-none focus-visible:ring-0 focus:ring-0 border ${
                            form.formState.errors.confirmPassword ? "focus:border-rose-500" : "focus:border-gray-300"
                          }`
                        )}
                        placeholder="Confirm Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="w-full uppercase" type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </Button>
          <span className="flex justify-center text-sm items-center gap-2">
            Already a Member?
            <Link className="text-blue-400" href="/login">
              Sign In
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default FormRegister;
