import InfoPage from "../../components/page/Info/InfoPage.jsx";
import "../18n";
import { Suspense, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../../components/global/SearchBar/SearchBar";

export default function Info() {
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
    <Container>
      <Suspense>
        <InfoPage></InfoPage>
      </Suspense>

    </Container>
  );
}
