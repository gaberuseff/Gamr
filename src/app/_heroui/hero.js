import { heroui } from "@heroui/react";

export default heroui({
    layout: {
        radius: {
            small: "4px",
            medium: "8px",
            large: "12px",
        },
        boxShadow: {
            small: "0px 2px 8px 0px rgba(0,0,0,0.1)",
            medium: "0px 4px 16px 0px rgba(0,0,0,0.12)",
            large: "0px 8px 24px 0px rgba(0,0,0,0.15)",
        },
    },
    themes: {
        light: {
            colors: {
                background: "#FFFFFF",
                foreground: "#1a1a1a",
                primary: {
                    DEFAULT: "#2d2d2d",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#f5f5f5",
                    foreground: "#2d2d2d",
                },
                focus: "#2d2d2d",
                content1: "#FFFFFF",
                content2: "#f5f5f5",
                content3: "#e5e5e5",
                content4: "#d4d4d4",
            },
        },
        dark: {
            colors: {
                background: "#0a0a0a",
                foreground: "#FFFFFF",
                primary: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#0a0a0a",
                },
                secondary: {
                    DEFAULT: "#1a1a1a",
                    foreground: "#FFFFFF",
                },
                focus: "#FFFFFF",
                content1: "#1a1a1a",
                content2: "#2d2d2d",
                content3: "#404040",
                content4: "#525252",
            },
        },
    },
});