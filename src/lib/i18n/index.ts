import { createInstance, Namespace, FlatNamespace, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FallbackNs } from "react-i18next";
import { Lang, getOptions } from "./settings";

const initI18next = async (lang: Lang, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(lang: Lang, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lang,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );

  return {
    t: i18nextInstance.getFixedT(lang, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
