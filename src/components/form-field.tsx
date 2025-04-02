/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  name: string
  label?: string
  description?: string
  placeholder?: string
  type?: string
  className?: string
  error?: string
  disabled?: boolean
  register: any // A function from React Hook Form to register the input field for validation and state management.
  renderInput?: (props: any) => ReactNode // An optional function that allows custom rendering of the input field.
}

export function FormField({
  name,
  label,
  description,
  placeholder,
  type = "text",
  className,
  error,
  disabled = false,
  register,
  renderInput,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      {renderInput ? (
        // register(name) returns an object { name, onChange, onBlur, ref } 
        renderInput((register as any)(name))
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(error && "border-destructive")}
          disabled={disabled}
          {...(register as any)(name)}
        />
      )}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

