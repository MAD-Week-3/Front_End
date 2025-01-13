import Header from "./components/Header";
import Footer from "././components/Footer";
import "./styles/index.css";
import { UserProvider } from "./UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
