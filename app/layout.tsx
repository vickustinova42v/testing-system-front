import "../public/css/zero-style.css";
import "../public/css/default-style.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        { children }
      </body>
    </html>
  );
}
