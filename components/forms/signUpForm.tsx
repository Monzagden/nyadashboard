"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
//import { signIn } from "next-auth/react";
//import { useSearchParams } from "next/navigation";
//import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  "email": z.string().email({ message: "Enter a valid email address" }),
  "password": z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  "firstName": z.string().min(3, "First name is required").max(100),
  "lastName": z.string().min(3, "Last name is required").max(100),
  "confirmPassword": z.string().min(1, "password confirmation is required") 
})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const data = await res.json();
      // Handle successful signup
      toast({
      title: "Success",
      description: "User created successfully",
      duration: 5000,
    });
     // You might want to redirect the user to the dashboard page or show a success message
     router.refresh(); 
     router.push("/signin");
    } else {
      const error = await res.json();
      // Handle error during signup
      // You might want to show an error message to the user
      toast({
        title: "Fel",
        description: error.message,
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='John' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you have an account, please {""}
        <Link className='text-blue-500 hover:underline' href="/signin">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
