"use client";
import { createI18nClient } from "next-international/client";
import { Lang } from "./types";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  [Lang.EN]: () => import("./en"),
  [Lang.FR]: () => import("./fr"),
});
