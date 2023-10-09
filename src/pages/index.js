import IndexPage from "../components/page/Index/IndexPage";
import SearchBar from "../components/global/SearchBar/SearchBar";
import { StickerProvider } from "../contexts/StickerContext";
import { ScrollTracker } from "../contexts/HideShowMenu";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <IndexPage />
    </StickerProvider>
  );
}
