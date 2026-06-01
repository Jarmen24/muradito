import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(options);
  return (
    <>
      <Header />
      {session ? children : <h1>Missing Page</h1>}
      <Footer />
    </>
  );
}
