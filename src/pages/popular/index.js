import PopularPage from "../../components/page/Popular/IndexPage";
import { StickerProvider } from "/src/contexts/StickerContext";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import Footer from "../../components/global/Footer/Footer";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <PopularPage />
      <Footer />
    </StickerProvider>
  );
}
