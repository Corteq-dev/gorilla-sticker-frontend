import IndexPage from "../components/page/Index/IndexPage";
import { StickerProvider } from "../contexts/StickerContext";
import SearchBar from "../components/global/SearchBar/SearchBar";
import { useEffect } from "react";
import DefaultAPI from "../apis/DefaultAPI";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.addEventListener("load", () => {
      document
        .querySelector("html")
        .classList.add(window.Telegram.WebApp.colorScheme);
      console.log(window.Telegram);
    });

    document.body.appendChild(script);

    const locale = localStorage.getItem("locale");
    if (locale) {
    } else {
      //let locale2 = DefaultAPI.GetLocale();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <StickerProvider>
      <SearchBar />
      <IndexPage />
    </StickerProvider>
  );
}
