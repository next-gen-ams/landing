import { cn } from "@/lib/utils";
import { refractive } from "@hashintel/refractive";
import React, { type ComponentProps } from "react";

export function RefractiveButton({ children, ...props }: ComponentProps<"a">) {
  return import.meta.env.SSR ? (
    <a
      {...props}
      className={cn(
        "hover:bg-text-light hover:text-background transition-all text-text-light text-sm cursor-pointer rounded-lg flex glass w-40 justify-center mx-auto p-2 px-3 items-center h-9 no-underline",
        props.className,
      )}
    >
      {children}
    </a>
  ) : (
    <refractive.a
      refraction={{
        radius: 12,
        blur: 2,
        bezelWidth: 10,
      }}
      {...props}
      className={cn(
        "hover:bg-text-light hover:text-background transition-all text-text-light text-sm cursor-pointer rounded-lg flex glass w-40 justify-center mx-auto p-2 px-3 items-center h-9 no-underline",
        props.className,
      )}
    >
      {children}
    </refractive.a>
  );
}
