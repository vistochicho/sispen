import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mx-auto h-screen content-center p-60 bg-gray-100 flex justify-center items-center">{children}</main>;
}
