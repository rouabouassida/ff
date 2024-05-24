import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const LanguageResources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18next.use(initReactI18next).init({
  resources: LanguageResources,
  lng: "fr",
  fallbackLng: "fr",
  compatibilityJSON: "v3", 
});

export default i18next;
