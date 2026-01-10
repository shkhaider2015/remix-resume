import { ILanguagesData } from "~/utils/interfaces/routes";
import "./SelectLanguage.css";
import { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { useLocation, useNavigate } from "@remix-run/react";

export const LANGUAGES: ILanguagesData[] = [
  { name: "English", slug: "en", flag: "🇬🇧" },
  { name: "العربية", slug: "ar", flag: "🇸🇦" },       // Arabic
  { name: "Deutsch", slug: "de", flag: "🇩🇪" },       // German
  { name: "Ελληνικά", slug: "el", flag: "🇬🇷" },     // Greek
  { name: "Español", slug: "es", flag: "🇪🇸" },      // Spanish
  { name: "Français", slug: "fr", flag: "🇫🇷" },     // French
  { name: "Italiano", slug: "it", flag: "🇮🇹" },     // Italian
  { name: "한국어", slug: "ko", flag: "🇰🇷" },        // Korean
  { name: "Polski", slug: "pl", flag: "🇵🇱" },       // Polish
  { name: "Português", slug: "pt", flag: "🇵🇹" },   // Portuguese
  { name: "Русский", slug: "ru", flag: "🇷🇺" },     // Russian
  { name: "Svenska", slug: "sv", flag: "🇸🇪" },      // Swedish
  { name: "اردو", slug: "ur", flag: "🇵🇰" },         // Urdu
  { name: "中文", slug: "zh", flag: "🇨🇳" },          // Chinese
]

const SelectLanguage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openOptions, setOpenOptions] = useState(false);
  const getInitialLang = () => {
    const segment = location.pathname.split("/")[1]; // after leading slash
    return LANGUAGES.find((l) => l.slug === segment) ?? LANGUAGES[0];
  };
  const [selectedValue, setSelectedValue] = useState(getInitialLang());
  const ref = useOutsideClick(() => {
    setOpenOptions(false);
  });

  const onSelectOption = (value: ILanguagesData) => {
    setSelectedValue(value);
    setOpenOptions(false);

    const segments = location.pathname.split("/").filter(Boolean);

    // replace first segment if it matches a language
    if (LANGUAGES.some((l) => l.slug === segments[0])) {
      segments[0] = value.slug;
    } else {
      segments.unshift(value.slug);
    }

    navigate("/" + segments.join("/"));
  };

  return (
    <div className="sl-conntainer" ref={ref}>
      <div
        className="label hoverable"
        onClick={() => setOpenOptions(!openOptions)}
      >
        {selectedValue.flag}
      </div>
      <div className={`options ${openOptions ? "show" : "hide"}`}>
        <div className="abs-con">
          {LANGUAGES.map((item) => (
            <div
              className="option"
              onClick={() => onSelectOption(item)}
              key={item.name}
            >{`${item.flag} ${item.name}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectLanguage;
