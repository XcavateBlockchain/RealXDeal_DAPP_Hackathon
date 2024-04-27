import localFont from "next/font/local";

export const fontText = localFont({
  src: [
    {
      path: "/fonts/DrukTextWideMediumTrial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/DrukTextWideBoldTrial.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-text",
});
