import PopularPage from "../../components/page/Popular/IndexPage";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import Footer from "../../components/global/Footer/Footer";
import { useEffect } from "react";
import { useStickers } from "../../contexts/StickerContext";

export default function Home() {
  const { setCurrentPage } = useStickers();
  useEffect(() => {
    setCurrentPage("popular");
  }, []);

  return (
    <>
      <SearchBar />
      <PopularPage />
      <Footer />
    </>
  );
}
