export enum Lang {
  FR = "fr",
  EN = "en",
}

export const fallbackLang = Lang.EN;
export const languages: Lang[] = [fallbackLang, Lang.FR];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(
  lang = fallbackLang,
  ns: string | string[] = defaultNS
) {
  return {
    // debug: true,
    supportedlangs: languages,
    // preload: languages,
    fallbackLang,
    lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
