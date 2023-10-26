import "../assets/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import DefaultAPI from "../apis/DefaultAPI";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.addEventListener("load", () => {
      document.querySelector("html").classList.add(window.Telegram.WebApp.colorScheme);

      let locale = localStorage.getItem("locale");
      if (locale) {
      } else {
        locale = DefaultAPI.GetLocale();
      }
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <Component {...pageProps} />;
}
