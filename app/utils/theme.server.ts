import { parse, serialize } from "cookie";

const THEME_COOKIE_NAME = "theme";

/**
 * Retrieves the theme from cookies.
 * Defaults to "light" if no cookie is found.
 */
export function getThemeFromCookies(request: Request): "light" | "dark" {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  return cookies[THEME_COOKIE_NAME] === "light" ? "light" : "dark";
}

/**
 * Creates a new cookie with the given theme.
 */
export function createThemeCookie(theme: "light" | "dark") {
  return serialize(THEME_COOKIE_NAME, theme, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}
