import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
