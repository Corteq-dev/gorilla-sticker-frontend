import { createContext, useContext, useEffect, useState } from "react";

const StickerContext = createContext({});

export function useStickers() {
  return useContext(StickerContext);
}

export function StickerProvider({ children }) {
  const [stickerSets, setStickerSets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [canLoad, setCanLoad] = useState(false);
  const [page, setPage] = useState(-1);
  const [dateFilter, setDateFilter] = useState(0);

  const [detailedStickerSet, setDetailedStickerSet] = useState({});

  function AddStickerSets(newStickerSets) {
    if (newStickerSets)
      setStickerSets((currentStickers) => [
        ...currentStickers,
        ...newStickerSets,
      ]);
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
        canLoad,
        setCanLoad,
        setStickerSets,
        stickerSets,
        detailedStickerSet,
        searchText,
        setSearchText,
        setDetailedStickerSet,
        AddStickerSets,
        ChangeLiked,
        ChangeFavourite,
        page,
        setPage,
        dateFilter,
        setDateFilter,
      }}
    >
      {children}
    </StickerContext.Provider>
  );
}
