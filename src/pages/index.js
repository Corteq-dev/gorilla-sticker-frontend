import IndexPage from "../components/page/Index/IndexPage";
import { StickerProvider } from "../contexts/StickerContext";
import SearchBar from "../components/global/SearchBar/SearchBar";
import { Suspense } from "react";
import Footer from "../components/global/Footer/Footer";

export default function Home() {
  return (
    <StickerProvider>
      <Suspense>
        <SearchBar />
      </Suspense>
      <IndexPage />
      <Footer />
    </StickerProvider>
  );
}
