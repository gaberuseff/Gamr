'use client'

import { extendVariants, Button as HeroUIButton } from "@heroui/react";

export const Button = extendVariants(HeroUIButton, {
    variants: {
        color: {
            primary: "bg-[#2d2d2d] text-white hover:bg-[#1a1a1a] transition-colors",
            secondary: "bg-[#f5f5f5] text-[#2d2d2d] hover:bg-[#e5e5e5] transition-colors",
            danger: "bg-red-500 text-white hover:bg-red-600 transition-colors",
            success: "bg-green-500 text-white hover:bg-green-600 transition-colors",
            info: "bg-blue-500 text-white hover:bg-blue-600 transition-colors",
        },
        variant: {
            solid: "",
            bordered: "bg-transparent border-2",
            light: "bg-transparent text-[#2d2d2d]",
            flat: "bg-[#2d2d2d]/20 text-[#2d2d2d] hover:bg-[#2d2d2d]/30 transition-colors",
            ghost: "border-2 bg-transparent text-[#2d2d2d] hover:bg-[#2d2d2d]/5 transition-colors",
        },
        isDisabled: {
            true: "bg-[#d4d4d4] text-[#737373] opacity-50 cursor-not-allowed",
        },
        size: {
            sm: "px-4 min-w-12 h-8 text-tiny gap-1 rounded-small text-sm",
            md: "px-6 min-w-20 h-10 text-small gap-2 rounded-medium text-base",
            lg: "px-8 min-w-24 h-12 text-medium gap-3 rounded-medium text-lg",
            xl: "px-12 min-w-28 h-14 text-large gap-4 rounded-large text-xl",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "md",
        variant: "solid",
    },
    compoundVariants: [
        {
            isDisabled: true,
            color: "primary",
            class: "bg-[#d4d4d4] opacity-60",
        },
        {
            variant: "bordered",
            color: "primary",
            class: "border-[#2d2d2d] text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors",
        },
        {
            variant: "bordered",
            color: "secondary",
            class: "border-[#2d2d2d] text-[#2d2d2d] hover:bg-[#f5f5f5] transition-colors",
        },
        {
            variant: "bordered",
            color: "danger",
            class: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors",
        },
        {
            variant: "bordered",
            color: "success",
            class: "border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors",
        },
        {
            variant: "bordered",
            color: "info",
            class: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors",
        },
    ],
});