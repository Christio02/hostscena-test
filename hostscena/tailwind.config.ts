import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx,js,jsx}",
        "./app/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ['var(--font-wittgenstein)', 'serif'],
            body: ['var(--font-source-sans)', 'sans-serif'],
            },
            fontSize: {
                xxs: "0.65rem",
                mdplus: "1.125rem",
                giant: "4.5rem",
            },
        },
    },
    plugins: [],
};

export default config;
