import SearchBar from "../../components/global/SearchBar/SearchBar";
import { StickerProvider } from "../../contexts/StickerContext";
import DetailsPage from "../../components/page/Details/DetailsPage";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.addEventListener("load", () => {
      document.querySelector("html").classList.add(window.Telegram.WebApp.colorScheme);
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
      <DetailsPage />
    </StickerProvider>
  );
}
