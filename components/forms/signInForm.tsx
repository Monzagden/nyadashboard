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
import { signIn } from "next-auth/react";
//import { useSearchParams } from "next/navigation";
//import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";



const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    });

  const SignInForm = () => {
      const router = useRouter();
      const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        "email": "",
        "password": "",
    },
  });

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  const signInData = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false, // Prevent automatic redirection
  });


  if (signInData && signInData.error) {
    // The sign-in failed
    toast({
      title: "Inloggningsfel",
      description: signInData.error,
      variant: "destructive",
    });
  } else {
    // The sign-in was successful
    router.refresh();
    router.push("/dashboard");
  }
};



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 w-full"></div>
        
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epost</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Skriv in din e-post..."
                    {...field}
                  />
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
                <FormLabel>Losenord</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Skriv in ditt losenord'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button className="ml-auto w-full" type="submit">
            Logga in
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Eller
          </span>
        </div>
      </div>
      <GoogleSignInButton>Logga in med Google</GoogleSignInButton>
      <Button className="w-full" type="button">
      <Link href="/signup">
      Skapa ett konto
      </Link>
      </Button>
    </>
  );
};

export default SignInForm;














  /*const onSubmitSignIn = async (data: UserFormValue) => {
    signIn("credentials", {
      email: data.email,
      callbackUrl: callbackUrl ?? "/dashboard",
    });
  };*/



          /*   console.log(values);
  const response = await fetch('/api/auth/user', {
      method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
        "email": values.email,
        "password": values.password,
    })
  })

  if (response.ok) {
        router.push("C:\Users\Mubar\Source\Repos\Mubsal\nyadashboard\app\(dashboard)\dashboard\page.tsx");
    } else {
        
        console.error("Registration failed");
    }*/