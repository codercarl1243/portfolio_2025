import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio || Coder Carl",
  description: "Edit Sanity content",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    {children}
   </div>
  );
}