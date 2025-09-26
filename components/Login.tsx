"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as navigation from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import login from "@/services/login";
import { Eye, EyeOff } from "lucide-react";

// validation schema
const formSchema = z.object({
  email: z.string().email("*Please enter valid email address"),
  password: z.string(),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = navigation.useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await login(values);
      if (res.status === "success") {
        toast.success("Login successful. Welcome, Chef!");
        router.push("/dashboard");
      } else {
        const { error } = res;
        toast.error("An error occurred. Login failed.");
        console.error("Login failed:", error);
      }
    } catch (error: unknown) {
      const err = error as { status?: number; message: string };

      if (err.message === "User not found") {
        form.setError("email", {
          type: "manual",
          message: "*Please enter valid email address",
        });
      } else if (err.message === "Invalid password") {
        form.setError("password", {
          type: "manual",
          message: "*Please enter correct password",
        });
      } else {
        toast.error(err.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="relative flex min-h-screen w-full flex-col lg:flex-row items-center justify-center text-white overflow-hidden pb-0 sm:pb-48 md:pb-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Image
          src="/loginBG.svg"
          alt="Background"
          width={1920}
          height={1080}
          className="absolute w-full h-auto"
        />
        <Image
          src="/loginEllipse.svg"
          alt="Ellipse"
          fill
          className="absolute top-0 left-0 z-0 width-[1692.04px] height-[1447.47px]"
        />
      </div>

      <div className="flex flex-col min-h-screen bg-dark">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h2 className="text-2xl md:text-3xl font-[Nulshock] tracking-widest text-white">
            CODECHEF-VIT PRESENTS
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-0 gap-8 lg:gap-12">
          {/* Left Section - Title */}
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl">
            {/* COOK OFF Title */}
            <div className="relative mb-4">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[Nulshock] text-[#b6ab98] relative z-10">
                COOK OFF
              </h1>
              <h1 className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[Nulshock] text-[#125128] -translate-x-1 translate-y-1 -z-10">
                COOK OFF
              </h1>
              {/* Blur effects */}
              <div className="absolute top-1/2 left-0 w-80 h-16 opacity-30 bg-gradient-to-r from-[#D9D9D9] to-[#737373] blur-[54px] pointer-events-none -z-20" />
              <div className="absolute top-1/2 right-0 w-80 h-16 opacity-30 bg-gradient-to-r from-[#D9D9D9] to-[#737373] blur-[54px] pointer-events-none -z-20" />
            </div>

            {/* 10.0 Title */}
            <div className="relative">
              <div className="relative flex items-center justify-center">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[Nulshock] text-[#137735] relative z-10">
                  10.0
                </h1>
                <h1 className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[Nulshock] text-[#125128] -translate-x-1 translate-y-1 -z-10">
                  10.0
                </h1>
                {/* Chef Hat - positioned responsively */}
                <div className="absolute -top-6 -right-8 sm:-top-8 sm:-right-10 md:-top-10 md:-right-12 -z-5">
                  <Image
                    src="/chef-hat.svg"
                    alt="Chef Hat"
                    width={80}
                    height={77}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28"
                  />
                </div>
              </div>
              {/* Blur effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-20 opacity-30 bg-[#137735] blur-[54px] pointer-events-none -z-20" />
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md">
            <div className="w-full p-6 md:p-8 bg-[#19231E] border border-[#6B6262] rounded-[32px] shadow-lg">
              <h2 className="text-center text-xl md:text-2xl font-[Nulshock] text-white mb-8 mt-4">
                START COOKING
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter Email"
                            {...field}
                            className="w-full h-14 bg-[#B7AB98] text-black placeholder:text-black font-[Inter] font-medium rounded-lg px-4"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF8989] font-[Inter] text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter Password"
                              {...field}
                              className="w-full h-14 bg-[#B7AB98] text-black placeholder:text-black font-[Inter] font-medium rounded-lg px-4 pr-12"
                            />
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-5 top-1/2 -translate-y-1/2  hover:cursor-pointer  h-full aspect-square flex items-center justify-center"
                            >
                              {showPassword ? (
                                <EyeOff size={20} className="text-black bg-transparent" />
                              ) : (
                                <Eye size={20} className="text-black bg-transparent" />
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-[#FF8989] font-[Inter] text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading || !form.formState.isValid}
                      className="w-[148px] h-[53px] rounded-[9px] !bg-gradient-to-r from-[#32CA67] via-[#26AD55] to-[#26AD55] text-white font-[Ballega] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Logging In..." : "Log In"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 pt-4">
          <p className="text-2xl md:text-3xl lg:text-4xl font-[Nulshock] tracking-widest text-[#D9D9D9]">
            10 YEARS. ONE LEGACY.
          </p>
        </div>
      </div>
    </div>
  );
}
