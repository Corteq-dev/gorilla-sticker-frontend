import { createContext, useContext, useEffect, useState } from "react";

const StickerContext = createContext({});

export function useStickers() {
  return useContext(StickerContext);
}

export function StickerProvider({ children }) {
  const [stickerSets, setStickerSets] = useState([]);

  const [detailedStickerSet, setDetailedStickerSet] = useState({});

  function setDetailedSticker(id) {
    // TODO: API call
    setDetailedStickerSet({
      name: "test 2",
      id: 1,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
        testUrl,
      ],
    });
  }

  function AddStickerSets(newStickerSets) {
    if (newStickerSets) setStickerSets([...stickerSets, ...newStickerSets]);
  }

  return (
    <StickerContext.Provider
      value={{
        stickerSets,
        detailedStickerSet,
        setDetailedSticker,
        AddStickerSets,
      }}
    >
      {children}
    </StickerContext.Provider>
  );
}
