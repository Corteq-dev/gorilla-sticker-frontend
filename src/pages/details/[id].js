import DetailsPage from "../../components/page/Details/DetailsPage";
import { StickerProvider } from "../../contexts/StickerContext";

export default function Home() {
  return (
    <StickerProvider>
      <DetailsPage />
    </StickerProvider>
  );
}
