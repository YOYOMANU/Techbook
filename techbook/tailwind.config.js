/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        35: "8.75rem",
        70: "17.5rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      colors: {
        background: "hsl(var(--background) / <alpha-placeholder>)",
        foreground: "hsl(var(--foreground) / <alpha-placeholder>)",
        card: "hsl(var(--card) / <alpha-placeholder>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-placeholder>)",
        popover: "hsl(var(--popover) / <alpha-placeholder>)",
        "popover-foreground":
          "hsl(var(--popover-foreground) / <alpha-placeholder>)",
        primary: "hsl(var(--primary) / <alpha-placeholder>)",
        "primary-foreground":
          "hsl(var(--primary-foreground) / <alpha-placeholder>)",
        secondary: "hsl(var(--secondary) / <alpha-placeholder>)",
        "secondary-foreground":
          "hsl(var(--secondary-foreground) / <alpha-placeholder>)",
        muted: "hsl(var(--muted) / <alpha-placeholder>)",
        "muted-foreground":
          "hsl(var(--muted-foreground) / <alpha-placeholder>)",
        accent: "hsl(var(--accent) / <alpha-placeholder>)",
        "accent-foreground":
          "hsl(var(--accent-foreground) / <alpha-placeholder>)",
        destructive: "hsl(var(--destructive) / <alpha-placeholder>)",
        "destructive-foreground":
          "hsl(var(--destructive-foreground) / <alpha-placeholder>)",
        border: "hsl(var(--border) / <alpha-placeholder>)",
        input: "hsl(var(--input) / <alpha-placeholder>)",
        ring: "hsl(var(--ring) / <alpha-placeholder>)",
        "chart-1": "hsl(var(--chart-1) / <alpha-placeholder>)",
        "chart-2": "hsl(var(--chart-2) / <alpha-placeholder>)",
        "chart-3": "hsl(var(--chart-3) / <alpha-placeholder>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
