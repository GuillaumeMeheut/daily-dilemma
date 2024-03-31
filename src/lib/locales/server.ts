import { createI18nServer } from "next-international/server";
import { Lang } from "./settings";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    [Lang.EN]: () => import("./en"),
    [Lang.FR]: () => import("./fr"),
  });
