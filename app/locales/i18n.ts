import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "~/assets/constants";

export default {
  supportedLngs: SUPPORTED_LOCALES,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  debug: false,
  // Disabling suspense is recommended
  react: { useSuspense: false },
};
