export const APP_NAME = "SmartProposal";
export const APP_DESCRIPTION = "AI-powered proposal automation for freelancers and small agencies";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const FREE_LIMITS = {
  documentsPerMonth: 3,
  templates: 3,
} as const;

export const PRO_LIMITS = {
  documentsPerMonth: 100,
  templates: 50,
} as const;

export const PRO_PRICE_MONTHLY = 19;
export const PRO_PRICE_YEARLY = 190;

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
  signup: "/signup",
  pricing: "/pricing",
  proposals: "/proposals",
  templates: "/templates",
  settings: "/settings",
} as const;
