import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'playdate-card-blue-light': '#D6E9FF',   // example light blue
        'playdate-card-blue-lighter': '#EBF5FF', // even lighter blue
        'playdate-card-orange-light': '#FFE6CC', // light orange
        'playdate-primary-blue': '#0056D2',      // primary blue
        'playdate-light-blue': '#4FA4FF',        // gradient end blue
        'playdate-dark-navy': '#001B44',         // dark navy
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Sports theme colors
        sports: {
          blue: {
            DEFAULT: "hsl(var(--sports-blue))",
            light: "hsl(var(--sports-blue-light))",
            dark: "hsl(var(--sports-blue-dark))",
          },
          green: {
            DEFAULT: "hsl(var(--sports-green))",
            light: "hsl(var(--sports-green-light))",
            dark: "hsl(var(--sports-green-dark))",
          },
          orange: {
            DEFAULT: "hsl(var(--sports-orange))",
            light: "hsl(var(--sports-orange-light))",
            dark: "hsl(var(--sports-orange-dark))",
          },
          purple: {
            DEFAULT: "hsl(var(--sports-purple))",
            light: "hsl(var(--sports-purple-light))",
            dark: "hsl(var(--sports-purple-dark))",
          },
          red: {
            DEFAULT: "hsl(var(--sports-red))",
            light: "hsl(var(--sports-red-light))",
            dark: "hsl(var(--sports-red-dark))",
          },
          yellow: {
            DEFAULT: "hsl(var(--sports-yellow))",
            light: "hsl(var(--sports-yellow-light))",
            dark: "hsl(var(--sports-yellow-dark))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
