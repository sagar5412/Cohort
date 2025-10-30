export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <div className="p-4 border-b text-center">
        Subscibe to get 20% off today
    </div>
    {children}</div>;
}
