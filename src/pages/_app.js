import "../assets/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { GetLocale } from "../apis/DefaultAPI";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const isDetailsPage = window.location.pathname.includes("/details/");
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.addEventListener(
      "load",
      async () => {
        document
          .querySelector("html")
          .classList.add(window.Telegram.WebApp.colorScheme);
        const uId = localStorage.getItem("uId");
        if (!uId || uId != window.Telegram.WebApp.initDataUnsafe.user.id)
          localStorage.setItem(
            "uId",
            window.Telegram.WebApp.initDataUnsafe.user.id,
          );

        let locale = localStorage.getItem("locale");
        if (!locale) locale = await GetLocale();

        i18n.changeLanguage(locale);
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.BackButton.onClick(() => router.back());

        if (isDetailsPage) window.Telegram.WebApp.BackButton.show();
        else window.Telegram.WebApp.BackButton.hide();
      },
      false,
    );

    document.body.appendChild(script);

    const tgsPlayerScript = document.createElement("script");
    tgsPlayerScript.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/tgs-player.js";
    tgsPlayerScript.async = true;
    document.body.appendChild(tgsPlayerScript);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <Component {...pageProps} />;
}
