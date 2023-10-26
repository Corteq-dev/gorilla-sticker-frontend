import { createContext, useContext, useEffect, useState } from "react";

const StickerContext = createContext({});

export function useStickers() {
  return useContext(StickerContext);
}

export function StickerProvider({ children }) {
  const testUrl =
    "https://api.telegram.org/file/bot5843425182:AAHCCGaALDogGT1TaRGZyNA6eGa368_VPms/stickers/file_327.tgs";
  const [stickerSets, setStickerSets] = useState([
    {
      name: "test 1",
      id: 0,
      stickersUrl: [testUrl, testUrl, testUrl],
      description: "#феликс#стрэйкидс#felix#цвфеликс",
    },
    {
      name: "test 2",
      id: 1,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl],
    },
    {
      name: "test 3",
      id: 2,
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl],
      description: "Мишка купидон • Cupid Bear #cupid #love#cute#bear#animated",
    },
    {
      name: "test 2",
      id: 3,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl],
    },
    {
      name: "test 2",
      id: 4,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl],
    },
    {
      name: "test 2",
      id: 5,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl],
    },
  ]);

  const [detailedStickerSet, setDetailedStickerSet] = useState({});

  function setDetailedSticker(id) {
    // TODO: API call
    setDetailedStickerSet({
      name: "test 2",
      id: 1,
      description:
        "Лето и сезон отпусков потихоньку подходит к концу, и Хопперспешит наверстать упущенное. Заскакивайте и вы в последний вагон, чтобы провести остатки",
      stickersUrl: [testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl, testUrl],
    });
  }

  return (
    <StickerContext.Provider
      value={{
        stickerSets,
        detailedStickerSet,
        setDetailedSticker,
      }}
    >
      {children}
    </StickerContext.Provider>
  );
}
