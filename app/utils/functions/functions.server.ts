import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale } from "~/assets/constants";

/**
 * Extracts locale from URL pathname.
 * Example: /en/about -> "en", /de -> "de", /foo -> default "en"
 */
export function getLocaleFromUrl(request: Request): SupportedLocale {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // First path segment
  const firstSegment = pathname.split("/")[1];

  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }

  return DEFAULT_LOCALE;
}
