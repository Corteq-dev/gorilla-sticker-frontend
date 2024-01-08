import IndexPage from "../components/page/Index/IndexPage";
import SearchBar from "../components/global/SearchBar/SearchBar";
import Footer from "../components/global/Footer/Footer";
import { StickerProvider } from "../contexts/StickerContext";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <IndexPage />
      <Footer />
    </StickerProvider>
  );
}
