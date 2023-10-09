import IndexPage from "../components/page/Index/IndexPage";
import SearchBar from "../components/global/SearchBar/SearchBar";
import { StickerProvider } from "../contexts/StickerContext";
import Navbar from "../contexts/HideShowMenu";

export default function Home() {
  return (
    <StickerProvider>
      <SearchBar />
      <IndexPage />
      <Navbar></Navbar>
    </StickerProvider>
  );
}
