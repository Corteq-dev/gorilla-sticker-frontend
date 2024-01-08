import IndexPage from "/src/components/page/MyStickers/IndexPage";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import Footer from "../../components/global/Footer/Footer";
import { StickerProvider } from "../../contexts/StickerContext";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <IndexPage />
      <Footer />
    </StickerProvider>
  );
}
