import React, { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react"; // Importamos el tipo para TypeScript

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: "filled" | "outlined";
  isFullWidth?: boolean;
  // Props de icono
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  iconSize?: number;
} & (
  | ({ component?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ component: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

export default function Button({
  children,
  className = "",
  variant = "filled",
  component = "button",
  isFullWidth = false,
  icon: Icon, // Renombramos a Mayúscula para usarlo como componente
  iconPosition = "start",
  iconSize = 18,
  ...props
}: Readonly<ButtonProps>) {
  // Clases base mejoradas con Flexbox para alinear el icono
  const baseClasses = `
  ${className}
    ${isFullWidth ? "w-full" : "w-max"} 
    flex items-center justify-center gap-2
    rounded-md px-4 py-2 font-medium 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-500
    active:scale-95
    cursor-pointer
  `.trim();

  const variantClasses =
    variant === "filled"
      ? "bg-beige-200 text-beige-900 hover:bg-beige-300"
      : "bg-transparent outline outline-beige-800 text-beige-800 hover:bg-beige-100 dark:outline-beige-700 dark:text-beige-200";

  // Renderizado del contenido (Texto + Icono)
  const content = (
    <>
      {Icon && iconPosition === "start" && <Icon size={iconSize} />}
      {children}
      {Icon && iconPosition === "end" && <Icon size={iconSize} />}
    </>
  );

  if (component === "a") {
    const { ...anchorProps } =
      props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={`${baseClasses} ${variantClasses}`} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { ...buttonProps } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={`${baseClasses} ${variantClasses}`} {...buttonProps}>
      {content}
    </button>
  );
}
