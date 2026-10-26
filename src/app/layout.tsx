import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({ variable: "--font-sans-kr", subsets: ["latin"], weight: ["400", "500", "700"] });
const serif = Noto_Serif_KR({ variable: "--font-serif-kr", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "다섯 열쇠 리딩",
  description: "MBTI, 혈액형, 키, 나이, 타로 세 장을 하나로 엮어 오늘의 나를 읽어드립니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
