export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Trade",
  description: "Trade",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    discord: "https://discord.gg/{add_your_link}",
  },
};
