"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";import { login } from "@/app/services/login";
import { useRouter } from "next/navigation";
import toast,{Toaster} from "react-hot-toast";
import Button from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiError } from "next/dist/server/api-utils";

// validation schema
const formSchema = z.object({
  email: z.string().email("*Please enter valid email address"),
  password: z.string(),
});


export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      const res = await login(values);
      if(res.status==="success"){
        const { status, message, data } = res;
        toast.success("Login successful. Welcome, Chef!");
        router.push("/dashboard");
      }
      else{
        const { status, error }=res;
        toast.error("An error occurred. Login failed.")
        console.error("Login failed:", error);
      }
    }
  //   catch(error:unknown){
  //     // console.log("Request failed with status code: ",error.response.status);
  //     // toast.error("An error occurred. Login failed.")
  //     // console.error("Login failed:", error);
  //   if (error instanceof ApiError) {
  //     const statusCode = error.status;

  //   if (error.status === 404) {
  //     // Email not found
  //     form.setError("email", { type: "manual", message: "*Please enter valid email address" });
  //   } else if (statusCode === 409) {
  //     // Wrong password
  //     form.setError("password", { type: "manual", message: "*Please enter correct password" });
  //   } else {
  //     // Other errors
  //     toast.error(error.response?.data?.message || "An error occurred");}
  //     }
  //    else {
  //       // Not an axios error
  //       toast.error("Unexpected error occurred");
  //       console.error(error);
  //     }
  // }
  catch (error: unknown) {
    const err = error as { status?: number; message: string };

    if (err.message === "User not found") {
      form.setError("email", { type: "manual", message: "*Please enter valid email address" });
    } else if (err.message === "Invalid password") {
      form.setError("password", { type: "manual", message: "*Please enter correct password" });
    } else {
      toast.error(err.message || "An error occurred");
    }
  }
}

  return (
    <div className="relative flex h-screen w-full items-center justify-center text-white overflow-hidden">
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

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20">
        <h2 className="text-[30px] font-[Nulshock] tracking-widest">
          CODECHEF PRESENTS
        </h2>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-[38px] font-[Nulshock] tracking-widest text-[#D9D9D9]">10 YEARS. ONE LEGACY.</p>
      </div>

      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-1/2 p-8 text-center z-10">
        <div className="flex flex-col items-center gap-2 ml-[50px]">
          <div className="relative inline-block">
            <h1 className="absolute inset-0 text-[96.75px] font-[Nulshock] text-[#125128] z-0 translate-x-[-6px] translate-y-[6px] stroke">
                COOK OFF
            </h1>

            <div className="absolute top-[45] left-[0] w-[332.7px] h-[69.11px] opacity-32 z-[20] pointer-events-none bg-gradient-to-r from-[#D9D9D9] to-[#737373] blur-[54.2px]" />
            <div className="absolute top-[45] left-[350] w-[332.7px] h-[69.11px] opacity-32 z-[20] pointer-events-none bg-gradient-to-r from-[#D9D9D9] to-[#737373] blur-[54.2px]" />
            <h1 className="relative text-[96.75px] font-[Nulshock] text-[#b6ab98] z-10 stroke">
                COOK OFF
            </h1>
        </div>

        <div className="flex items-center">
            <div className="relative inline-block">
                <div className="absolute top-[45] left-[0] w-[267.54px] h-[77px] opacity-32 z-[20] pointer-events-none bg-[#137735] blur-[54.2px]" />
                <h1 className="absolute inset-0 text-[96.75px] font-[Nulshock] text-[#125128] z-0 translate-x-[-6px] translate-y-[6px] stroke">
                10.0
                </h1>

                <h1 className="relative text-[96.75px] font-[Nulshock] text-[#137735] z-10 stroke">
                <span className="relative inline-block">
                    10.0
                    <Image
                    src="/chef-hat.svg"
                    alt="Chef Hat"
                    width={112.52}
                    height={108.42}
                    className="absolute -top-9 -right-12 -z-10"
                    />
                </span>
                </h1>
            </div>
          </div>

        </div>

      {/*   <div className="absolute bottom-6 left-6 flex flex-col items-start z-20">
        <p className="text-xs text-gray-400">Co-Hosted by</p>
        <Image
          src="/musclemind.svg"
          alt="Musclemind Logo"
          width={120}
          height={40}
        />
      </div>  */}
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      {/* Right Section - Login Form */}
        <div className="w-1/2 flex items-center justify-center z-10">
        <div className="w-[460px] h-[536px] p-8 shadow-lg rounded-[32px] bg-[#19231E] border border-[#6B6262]">
            <h2 className="text-center text-[26.51px] font-[Nulshock] text-white mt-[75.46px]">
            START COOKING
            </h2>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                {/* Email */}
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input
                        placeholder="Enter Email"
                        {...field}
                        className="bg-[#B7AB98] w-[351.66px] h-[60.08px] radius-[8.84px] mt-[28.28px] mr-[42.41px] ml-[42.42px] text-black placeholder:text-black font-[Inter] placeholder:font-[Inter] font-medium placeholder:font-medium"
                        />
                    </FormControl>
                    <FormMessage className="text-[#FF8989] ml-[42.42px] font-[Inter] text-[13px]"/>
                    </FormItem>
                )}
                />

                {/* Password */}
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                        className="bg-[#B7AB98] w-[351.66px] h-[60.08px] radius-[8.84px] mt-[28.28px] mr-[42.41px] ml-[42.42px] text-black placeholder:text-black font-[Inter] placeholder:font-[Inter] font-medium placeholder:font-medium"
                        />
                    </FormControl>
                    <FormMessage className="text-[#FF8989] ml-[42.42px] font-[Inter] text-[13px]"/>
                    </FormItem>
                )}
                />

                <Button
                    type="submit"
                    className="w-[148px] h-[53px] rounded-[9px] !mt-[68.92px] !bg-gradient-to-r from-[#32CA67] via-[#26AD55] to-[#26AD55] text-white font-[Ballega] flex items-center justify-center"
                    >
                    Log In
                </Button>
            </form>
            </Form>
        </div>
        </div>
    </div>
  );
}
