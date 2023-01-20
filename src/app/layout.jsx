import "./globals.css";
import ContextProvider from "./context-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
