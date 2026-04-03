import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Contact from "./contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./profile";
import AddListing from "./add-listing";
import { Toaster } from "sonner";
import SearchByCategory from "./search/[category]";
import SearchByOption from "./search";
import ListingDetail from "./listing-details/[id]";
import NotFound from "./components/NotFound";
import { ThemeProvider } from "next-themes";
import GlobalShowroom from "./GlobalShowroom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/global-showroom",
    element: <GlobalShowroom />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "add-listing",
    element: <AddListing />,
  },
  {
    path: "/search",
    element: <SearchByOption />,
  },
  {
    path: "/search/:category",
    element: <SearchByCategory />,
  },
  {
    path: "/listing-details/:id",
    element: <ListingDetail />,
  },
  {
    path: "*", // catch all undefined routes
    element: <NotFound />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
        <Toaster />
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>
);
