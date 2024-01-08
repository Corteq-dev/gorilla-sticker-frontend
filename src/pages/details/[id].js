import DetailsPage from "../../components/page/Details/DetailsPage";
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

  return <DetailsPage />;
}
