import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
import { Lang } from "./lib/locales/settings";

const I18nMiddleware = createI18nMiddleware({
  locales: [Lang.EN, Lang.FR],
  defaultLocale: Lang.EN,
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
