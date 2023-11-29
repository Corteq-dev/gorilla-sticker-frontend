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
  } = useStickers();
  const [actions, setActions] = useState([]);
  const actionRef = useRef(actions);
  const [isLoading, setIsLoading] = useState(false);

  function onActionCallback(stickerSetId, action, status) {
    const stickerSet = stickerSets.find((item) => item.id === stickerSetId);

    setActions((currentActions) => {
      if (currentActions.find((r) => r.stickerSetId == stickerSetId) == null) {
        if (action == "like")
          return [
            ...currentActions,
            {
              stickerSetId,
              like: !stickerSet.liked,
              initialLike: stickerSet.liked,
              initialFav: stickerSet.addedToFavorites,
            },
          ];
        else
          return [
            ...currentActions,
            {
              stickerSetId,
              favorite: !stickerSet.addedToFavorites,
              initialLike: stickerSet.liked,
              initialFav: stickerSet.addedToFavorites,
            },
          ];
      } else {
        return currentActions.map((r) => {
          if (r.stickerSetId === stickerSetId) {
            if (action == "like")
              return {
                ...r,
                like: r.like == undefined ? !r.initialLike : !r.like,
              };
            else
              return {
                ...r,
                favorite: r.favorite == undefined ? !r.initialFav : !r.favorite,
              };
          } else return r;
        });
      }
    });

    if (action == "like") ChangeLiked(stickerSetId, status);
    else ChangeFavourite(stickerSetId, status);
  }

  useEffect(() => {
    return () => {
      if (actionRef.current.length > 0) {
        const data = actionRef.current.map((item) => {
          return {
            stickerSetId: item.stickerSetId,
            like: item.like === item.initialLike ? null : item.like,
            favorite: item.favorite === item.initialFav ? null : item.favorite,
          };
        });
        SendActionData(data);
      }
    };
  }, []);

  useEffect(() => {
    actionRef.current = actions;
  }, [actions]);

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
