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
import { register } from "@/app/actions/register";
import { Field, FieldGroup } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  async function handleSignup(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Register user (server action)
    try {
      await register(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
      return;
    }

    // 2. Login (client-side NextAuth)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Login failed");
      return;
    }

    // 3. Redirect
    router.push("/listing");
  }

  return (
    <form onSubmit={handleSignup}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details so we can sing you up!
            </CardDescription>
            <CardAction>
              <Button variant="link">Log in</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <FieldGroup className="grid grid-cols-2 gap-1">
                  <Field>
                    <Input
                      id="first_name"
                      type="first_name"
                      name="first_name"
                      placeholder="First Name"
                      required
                    />
                  </Field>
                  <Field>
                    <Input
                      id="last_name"
                      type="last_name"
                      name="last_name"
                      placeholder="Last Name (optional)"
                      required
                    />
                  </Field>
                </FieldGroup>
              </div>
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
