import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function PrivatePages({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(options);

  return <>{session ? children : <h1>Missing Page</h1>}</>;
}
