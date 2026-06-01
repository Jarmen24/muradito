"use client";

import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarIcon,
  HashIcon,
  LockIcon,
  MailIcon,
  PencilIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "@prisma/client";
import Image from "next/image";

function formatDate(dateInput: Date | string | undefined | null) {
  if (!dateInput || dateInput === "undefined") return "—";

  const date = new Date(dateInput);

  // Fallback if the date turns out to be invalid
  if (isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getInitials(user: User) {
  const { firstName, lastName, email } = user;
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-muted/50 px-4 py-4 ring-1 ring-foreground/5">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-foreground/10 bg-card px-4 py-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function AccountProfileClient({ user }: { user: User }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "—";
  const initials = getInitials(user);

  function handleCancel() {
    setError(null);
    setEditing(false);
  }

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setError(null);
  //   setPending(true);
  //   try {
  //     const form = e.currentTarget;
  //     const result = await updateAccount(new FormData(form));
  //     if (!result.success) {
  //       setError(result.message ?? "Something went wrong");
  //       return;
  //     }
  //     setEditing(false);
  //     router.refresh();
  //   } finally {
  //     setPending(false);
  //   }
  // }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row flex-wrap items-start gap-4 sm:items-center">
          <Image
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://placehold.co/400x400"
            }
            alt={`Profile Picture of ${user.firstName} ${user.lastName}`}
            className="rounded-lg size-16"
            width={190}
            height={190}
          />
          <div className="min-w-0 flex-1 space-y-1">
            <CardTitle className="text-xl sm:text-2xl">{fullName}</CardTitle>
            <CardDescription className="truncate text-base">
              {user.email}
            </CardDescription>
          </div>
          {!editing ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              className="shrink-0 rounded-4xl"
              onClick={() => setEditing(true)}
            >
              <PencilIcon />
              Edit profile
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="default"
              className="shrink-0 rounded-4xl"
              disabled={pending}
              onClick={handleCancel}
            >
              <XIcon />
              Cancel
            </Button>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Could not save</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {!editing ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow
                icon={UserIcon}
                label="First name"
                value={user.firstName ?? "—"}
              />
              <InfoRow
                icon={UserIcon}
                label="Last name"
                value={user.lastName ?? "—"}
              />
              <InfoRow icon={MailIcon} label="Email" value={user.email} />
              <InfoRow
                icon={CalendarIcon}
                label="Member since"
                value={formatDate(user.createdAt)}
              />
            </div>
          ) : (
            <form
              id="account-edit-form"
              // onSubmit={handleSubmit}
              className="space-y-6"
            >
              <FieldGroup className="gap-6">
                <Field>
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    defaultValue={user.firstName ?? ""}
                    placeholder="Your first name"
                    required
                    autoComplete="given-name"
                  />
                </Field>
                <Field>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    defaultValue={user.lastName ?? ""}
                    placeholder="Optional"
                    autoComplete="family-name"
                  />
                </Field>
                <Field>
                  <Label htmlFor="last_name">Email</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    defaultValue={user.email ?? ""}
                    placeholder="Optional"
                    autoComplete="family-name"
                  />
                </Field>
              </FieldGroup>
              <Alert>
                <AlertTitle>Read-only on this screen</AlertTitle>
                <AlertDescription>
                  Email, password, and your user ID are shown above for your
                  records. To change email or password, contact support or use a
                  future settings flow.
                </AlertDescription>
              </Alert>
            </form>
          )}
        </CardContent>
        {editing ? (
          <CardFooter className="flex flex-wrap justify-end gap-2 border-t border-foreground/10 pt-6">
            <Button
              type="button"
              variant="outline"
              className="rounded-4xl"
              disabled={pending}
              onClick={handleCancel}
            >
              Discard
            </Button>
            <Button
              type="submit"
              form="account-edit-form"
              className="rounded-4xl"
              disabled={pending}
            >
              {pending ? "Saving…" : "Save changes"}
            </Button>
          </CardFooter>
        ) : null}
      </Card>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Your activity</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* <StatBox label="Listings" value={user.counts.listings} />
          <StatBox label="Bookings" value={user.counts.bookings} />
          <StatBox label="Ratings" value={user.counts.ratings} /> */}
        </div>
      </div>
    </div>
  );
}
