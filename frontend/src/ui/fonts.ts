import { Jost, Hanuman, Inter } from "next/font/google";

export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: "variable",
});

export const hanuman = Hanuman({
  variable: "--font-hanuman",
  weight: ["100", "300", "400", "700", "900"],
});
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});
