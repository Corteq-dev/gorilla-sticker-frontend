import IndexPage from "/src/components/page/Index/IndexPage";
import { StickerProvider } from "/src/contexts/StickerContext";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.addEventListener("load", () => {
      document
        .querySelector("html")
        .classList.add(window.Telegram.WebApp.colorScheme);
    });

    document.body.appendChild(script);

    const locale = localStorage.getItem("locale");
    if (locale) {
    } else {
      //locale = DefaultAPI.GetLocale();
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
