import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-control font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-rausch text-white hover:bg-rausch-dark",
        variant === "secondary" &&
          "bg-ink text-white hover:bg-black",
        variant === "ghost" &&
          "bg-transparent text-ink border border-hairline hover:bg-surface-soft",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3.5 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
