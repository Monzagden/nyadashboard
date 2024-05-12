import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/components/forms/signUpForm";
//import { buttonVariants } from "@/components/ui/button";
//import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "FORMD beta",
  description: "formd inloggning",
};

export default function SignUpPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src="/logo.png"
            alt="Logo"
            className="mr-2 h-12 w-12" // Double the original size
          />
          Formd!
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Alla ar ett geni. Men om du bedomer en fisk efter dess formaga att klattra i ett trad, kommer den att leva hela sitt liv med att tro att den ar dum.&rdquo;
            </p>
            <footer className="text-sm">Albert Einstein</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Skapa ett konto
            </h1>
            <p className="text-sm text-muted-foreground">
              Skriv in din e-post for att skapa ett konto
            </p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
           {""}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              anvandarvillkor
            </Link>{" "}
            och{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              integritetspolicy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};


