import SearchBar from "../../components/global/SearchBar/SearchBar";
import { StickerProvider } from "../../contexts/StickerContext";
import DetailsPage from "../../components/page/Details/DetailsPage";
import Footer from "../../components/global/Footer/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.BackButton.show();
    }

    return () => {
      window.Telegram.WebApp.BackButton.hide();
    };
  }, []);

  return (
    <StickerProvider>
      <DetailsPage />
    </StickerProvider>
  );
}
