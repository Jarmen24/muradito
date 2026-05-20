export { default } from "next-auth/middleware";

// apply next auth only to matching routes
export const config = {
  matcher: ["/booking", "/account"],
};
