"use client";
import { useState, useEffect } from "react";
import { fetchUserSession } from "./session"; // Adjust the path as necessary
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { Logo, GithubIcon, DiscordIcon } from "@/components/icons";

// Placeholder for Discord API endpoints
const DISCORD_API_URL = "http://localhost:5000/auth/discord";
const LOGOUT_API_URL = "http://localhost:5000/auth/logout";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null); // Use `any` or define a proper type if needed
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchUserSession(); // Assume session.ts is set up to handle this request
        if (user) {
          setUser(user); // Set user data if available
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_API_URL, {
        method: "POST",
        credentials: "include", // Ensure cookies are included in the request
      });
      setUser(null); // Clear the user data after logging out
      window.location.href = "/"; // Optionally redirect after logout
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if necessary
  }

  return (
    <NextUINavbar
      className="bg-white/5 backdrop-blur-lg"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Trading</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink className="text-primary font-medium" href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {user ? (
          <NavbarItem className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>Hello, {user.username}!</span>
            <Button
              className="text-sm font-normal text-default-600 bg-red-700/60"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="flex items-center gap-4">
            <Button
              className="text-sm font-normal text-default-600 mr-5 bg-default-200"
              onClick={() => {
                window.location.href = DISCORD_API_URL; // Initiate Discord login
              }}
            >
              <DiscordIcon />
              Login with{" "}
              <span className="text-indigo-600/100 font-bold">Discord</span>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NextLink href="#" aria-label="Github">
          <GithubIcon className="text-default-500" />
        </NextLink>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href="#" className="text-primary" size="lg">
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
