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

  function ChangeLiked(stickerSetId, status) {
    setStickerSets((currentStickers) => {
      return currentStickers.map((item) => {
        if (item.id == stickerSetId)
          return {
            ...item,
            liked: status,
            likes: status == true ? item.likes + 1 : item.likes - 1,
          };
        else return item;
      });
    });
  }

  function ChangeFavourite(stickerSetId, status) {
    setStickerSets((currentStickers) => {
      return currentStickers.map((item) => {
        if (item.id == stickerSetId)
          return {
            ...item,
            addedToFavorites: status,
            favorites: status == true ? item.favorites + 1 : item.favorites - 1,
          };
        else return item;
      });
    });
  }

  return (
    <StickerContext.Provider
      value={{
        setStickerSets,
        stickerSets,
        detailedStickerSet,
        setDetailedSticker,
        AddStickerSets,
        ChangeLiked,
        ChangeFavourite,
      }}
    >
      {children}
    </StickerContext.Provider>
  );
}
