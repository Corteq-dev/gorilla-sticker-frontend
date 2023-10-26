import IndexPage from "../components/page/Index/IndexPage";
import { StickerProvider } from "../contexts/StickerContext";
import SearchBar from "../components/global/SearchBar/SearchBar";

export default function Home() {
  return (
    <StickerProvider>
      <Suspense>
        <SearchBar />
      </Suspense>
      <IndexPage />
    </StickerProvider>
  );
}
