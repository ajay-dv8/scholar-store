import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// set public routes
const isPublicRoute = createRouteMatcher([
  "/", 
  "/api/webhooks(.*)"
])
// request authentication for this route
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};