import SearchBar from "../../components/global/SearchBar/SearchBar";
import { StickerProvider } from "../../contexts/StickerContext";
import DetailsPage from "../../components/page/Details/DetailsPage";
import Footer from "../../components/global/Footer/Footer";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <DetailsPage />
      <Footer />
    </StickerProvider>
  );
}
