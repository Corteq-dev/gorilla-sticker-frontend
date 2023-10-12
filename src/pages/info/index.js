import InfoPage from "../../components/page/Info/InfoPage.jsx";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

export default function Info() {
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

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Container>
      <InfoPage></InfoPage>
    </Container>
  );
}
