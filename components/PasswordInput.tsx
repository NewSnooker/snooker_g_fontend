/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  field,
  id,
  placeholder,
  autoComplete,
  disabled,
  disabledEye = false,
}: {
  field: any;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  disabledEye?: boolean;
}) {
  const [passType, setPassType] = useState("password");

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={passType}
        placeholder={placeholder || "******"}
        {...field}
        autoComplete={autoComplete || "current-password"}
        className="pr-10"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() =>
          setPassType(passType === "password" ? "text" : "password")
        }
        className="absolute inset-y-0 right-3 flex items-center"
      >
        {!disabledEye ? (
          passType === "password" ? (
            <Eye className="text-muted-foreground w-4 h-4" />
          ) : (
            <EyeOff className="text-muted-foreground w-4 h-4" />
          )
        ) : null}
      </button>
    </div>
  );
}
