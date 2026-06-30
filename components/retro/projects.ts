// =====================================================================
//  Selected Work — honest, category-driven entries (no fabricated client
//  names). Each becomes a frame on the 3D film-reel. `accent` tints the
//  placeholder frame until real project media (video/image) is supplied.
// =====================================================================

export type Project = {
  no: string;
  tag: string;
  title: string;
  category: string;
  accent: string;
  /** optional real media — drop in later; reel auto-uses it */
  video?: string;
  image?: string;
};

export const projects: Project[] = [
  { no: "01", tag: "MOBILE", title: "Native Mobile Apps", category: "iOS & Android · Kotlin · Swift", accent: "#7856c8", image: "/work-retro/work1.jpg" },
  { no: "02", tag: "PLATFORM", title: "Dashboards & Web Apps", category: "Admin panels & internal tools", accent: "#39a7ff", image: "/work-retro/work2.jpg" },
  { no: "03", tag: "COMMERCE", title: "E-commerce & Storefronts", category: "Conversion-built stores", accent: "#3ecf6a", image: "/work-retro/work3.jpg" },
  { no: "04", tag: "STARTUP", title: "MVPs for Founders", category: "Idea to investor-ready", accent: "#ffe14d", image: "/work-retro/work4.jpg" },
  { no: "05", tag: "REALTIME", title: "Realtime Systems", category: "Live data, chat, tracking", accent: "#ff3b5c", image: "/work-retro/work5.jpg" },
  { no: "06", tag: "AI", title: "AI & Automation", category: "Smart workflows that scale", accent: "#9b5bff", image: "/work-retro/work6.jpg" },
  { no: "07", tag: "ENGINEER", title: "Custom Software", category: "Built around your workflow", accent: "#2ec9c9", image: "/work-retro/work7.jpg" },
  { no: "08", tag: "DESIGN", title: "UI, Motion & Brand", category: "Interfaces that convert", accent: "#ff9d2f", image: "/work-retro/work8.jpg" },
  { no: "09", tag: "CLOUD", title: "Cloud & Scale", category: "Secure, cloud-native infra", accent: "#5eead4", image: "/work-retro/work9.jpg" },
];
