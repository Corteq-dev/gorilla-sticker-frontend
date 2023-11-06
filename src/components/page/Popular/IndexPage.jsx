import { useEffect, useState, useRef } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "../../global/StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { GetNewStickers, GetPopularStickers } from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";

export default function IndexPage() {
  const { stickerSets, AddStickerSets } = useStickers();
  const [actions, setActions] = useState({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoad, setCanLoad] = useState(false);

  function onActionCallback(stickerSetId, isLike) {
    setActions((currentActions) => {
      let action = currentActions.find((r) => r.id === stickerSetId);
      const stickerSet = stickerSets.find((r) => r.id === stickerSetId);

      if (!action) action = { stickerSetId, like: false, favorite: false };

      if (isLike) {
        if (stickerSet.liked) {
          action.like = false;
        }
      } else {
      }

      if (currentActions.find((r) => r.id === stickerSetId) == null) {
        return [
          ...currentItems,
          { stickerSetId, like: isLike, favorite: isLike == false },
        ];
      } else {
        return currentActions.map((r) => {
          if (r.id === stickerSetId) {
            if (isLike)
              return { stickerSetId, like: isLike, favorite: r.favorite };
            else return { stickerSetId, like: r.like, favorite: isLike };
          } else return r;
        });
      }
    });
  }

  const lastElement = useRef();
  useObserver(lastElement, canLoad, isLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    async function fetchData(page) {
      setCanLoad(false);
      setIsLoading(true);
      const data = await GetPopularStickers(
        page == 0 ? 0 : page * 10,
        (dateFilter = new Date()),
      );
      AddStickerSets(data);
      setIsLoading(false);
      setTimeout(() => setCanLoad(true), 250);
    }

    fetchData(page);
  }, [page]);


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
          />
        ))}
      <div ref={lastElement} />
    </Container>
  );
}
