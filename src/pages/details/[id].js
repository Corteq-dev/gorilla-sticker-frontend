import SearchBar from "../../components/global/SearchBar/SearchBar";
import {
  StickerProvider,
  setDetailedSticker,
} from "../../contexts/StickerContext";
import DetailsPage from "../../components/page/Details/DetailsPage";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <DetailsPage />
    </StickerProvider>
  );
}
