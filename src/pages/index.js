import IndexPage from "../components/page/Index/IndexPage";
import SearchBar from "../components/global/SearchBar/SearchBar";
import Footer from "../components/global/Footer/Footer";
import { useEffect } from "react";
import { useStickers } from "../contexts/StickerContext";

export default function Home() {
  const { setCurrentPage } = useStickers();
  useEffect(() => {
    setCurrentPage("home");
  }, []);

  return (
    <>
      <SearchBar />
      <IndexPage />
      <Footer />
    </>
  );
}
