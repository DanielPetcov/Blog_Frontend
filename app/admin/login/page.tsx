"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginAction } from "@/actions/auth.actions";
import { LoginInput } from "@/lib/types/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeClosed, EyeIcon } from "lucide-react";

import { FieldLabel, FieldError, Field } from "@/components/ui/field";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const [visiblePass, setVisiblePass] = useState(false);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    clearErrors("root.server");

    const response = await loginAction(data);

    if (!response.success) {
      setError("root.server", {
        type: "server",
        message: response.error,
      });

      return;
    }

    redirect("/admin");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-5">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Admin login</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage the blog.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              autoComplete="email"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                type={visiblePass ? "text" : "password"}
                autoComplete="current-password"
              />

              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setVisiblePass((prev) => !prev)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={visiblePass ? "Hide password" : "Show password"}
                >
                  {visiblePass ? <EyeIcon /> : <EyeClosed />}
                </Button>
              </InputGroupAddon>
            </InputGroup>

            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          {errors.root?.server && (
            <FieldError>{errors.root.server.message}</FieldError>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
}
