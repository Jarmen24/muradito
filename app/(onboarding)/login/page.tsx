"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "@/app/globals.css";
import { login } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDestructive } from "@/components/Layout/AlertDestructive";
import Link from "next/link";

export default function Login() {
  const [invalidLogin, setInvalidLogin] = useState(false);

  const router = useRouter();
  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const res = await login(email, password);

    if (res.error) {
      setInvalidLogin(true);
      return;
    }

    router.push("/listing");
  }
  return (
    <form onSubmit={handleLogin}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              {invalidLogin && (
                <AlertDestructive
                  title="Invalid Credentials"
                  description="Please try again and check your email or password"
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
