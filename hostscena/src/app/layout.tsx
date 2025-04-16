import "./globals.css";
import { Wittgenstein, Source_Sans_3 } from "next/font/google";

const wittgenstein = Wittgenstein({
    subsets: ["latin"],
    variable: "--font-wittgenstein",
    display: "swap",
});

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-source-sans",
    display: "swap",
});

export default function RootLayout({children,}: { children: React.ReactNode;}) {
    return (
        <html
            lang="en"
            className={`${wittgenstein.variable} ${sourceSans.variable}`}
        >
        <body className="font-body antialiased">{children}</body>
        </html>
    );
}
