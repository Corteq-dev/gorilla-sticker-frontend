import IndexPage from "/src/components/page/MyFavourites/IndexPage";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import Footer from "../../components/global/Footer/Footer";
import { useEffect } from "react";
import { useStickers } from "../../contexts/StickerContext";

export default function Home() {
  const { setCurrentPage } = useStickers();
  useEffect(() => {
    setCurrentPage("favourites");
  }, []);

  return (
    <>
      <SearchBar />
      <IndexPage />
      <Footer />
    </>
  );
}
