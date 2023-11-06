import IndexPage from "/src/components/page/Index/IndexPage";
import { StickerProvider } from "/src/contexts/StickerContext";
import SearchBar from "/src/components/global/SearchBar/SearchBar";
import { useEffect } from "react";

export default function Home() {
    return (
        <StickerProvider>
            <SearchBar />
            <IndexPage />
        </StickerProvider>
    );
}
