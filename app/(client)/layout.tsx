import { Footer, Header } from "@/components";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
          {children}
        <Footer />
    </>
  );
}
