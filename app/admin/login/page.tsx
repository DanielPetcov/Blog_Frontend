"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginAction } from "@/actions/auth.actions";
import { LoginForm } from "@/lib/types/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const [visiblePass, setVisiblePass] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await loginAction(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError("form", { message });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-5 rounded-md bg-white shadow-md max-w-md">
        <div>
          <p className="text-sm font-semibold">Login for admin</p>
          <p className="text-xs font-light">
            If you are not the admin of this blog, <br /> leave the page :)
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-5">
          <div>
            <p className="text-sm">Email:</p>
            <Input
              {...register("email", { required: true })}
              type="email"
              className="rounded-md"
            />
            {errors.email && (
              <p className="text-sm font-semibold text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm">Password:</p>
            <Input
              {...register("password", { required: true })}
              type={visiblePass ? "text" : "password"}
              className="rounded-md"
            />
            {errors.password && (
              <p className="text-sm font-semibold text-red-500">
                {errors.password.message}
              </p>
            )}
            <button type="button" onClick={() => setVisiblePass(!visiblePass)}>
              see pass
            </button>
          </div>

          {errors.form && (
            <p className="text-sm font-semibold text-red-500">
              {errors.form.message}
            </p>
          )}

          <Button type="submit" className="w-full rounded-md">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
