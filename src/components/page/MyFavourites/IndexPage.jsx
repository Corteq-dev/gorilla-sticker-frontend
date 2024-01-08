import { useEffect, useState, useRef } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "../../global/StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import {
  GetNewStickers,
  SendActionData,
  Search,
  GetUserFavouriteStickers,
} from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";

export default function IndexPage() {
  const {
    stickerSets,
    AddStickerSets,
    ChangeLiked,
    ChangeFavourite,
    searchText,
    canLoad,
    setCanLoad,
    page,
    setPage,
    setStickerSets,
    setCurrentPage,
  } = useStickers();
  const [canDoAction, setCanDoAction] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function onActionCallback(stickerSetId, action, status) {
    if (!canDoAction) return;
    if (action == "like") {
      SendActionData([{ stickerSetId, like: status }]);
      ChangeLiked(stickerSetId, status);
    } else {
      SendActionData([{ stickerSetId, favorite: status }]);
      ChangeFavourite(stickerSetId, status);
    }
    setCanDoAction(false);
    setTimeout(() => {
      setCanDoAction(true);
    }, 500);
  }

  const lastElement = useRef();
  useObserver(lastElement, canLoad, isLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    async function fetchData(page) {
      if (!canLoad) return;

      setCanLoad(false);
      setIsLoading(true);

      let data = "";
      if (searchText && searchText != "")
        data = await Search(searchText, page * 10);
      else data = await GetUserFavouriteStickers(page * 10);

      if (page === 0) setStickerSets(data);
      else AddStickerSets(data);

      setIsLoading(false);
      if (data.length >= 10) setTimeout(() => setCanLoad(true), 250);
    }

    fetchData(page);
  }, [page]);

  useEffect(() => {
    setCanLoad(true);
    setCurrentPage("favourites");
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.placeholder}></div>
      {stickerSets &&
        stickerSets.map((item) => (
          <StickerSet
            stickerSet={item}
            key={item.id}
            className={styles.stickerSet}
            onActionCallback={onActionCallback}
            canAdd={false}
          />
        ))}
      <div ref={lastElement} />
    </Container>
  );
}
