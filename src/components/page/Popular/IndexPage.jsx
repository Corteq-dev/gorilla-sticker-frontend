import { useEffect, useState, useRef } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "../../global/StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { GetNewStickers, SendActionData, Search, GetPopularStickers } from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";

export default function IndexPage() {
  const {
    stickerSets,
    setStickerSets,
    AddStickerSets,
    ChangeLiked,
    ChangeFavourite,
    searchText,
    canLoad,
    setCanLoad,
    page,
    setPage,
    dateFilter,
  } = useStickers();
  const [actions, setActions] = useState([]);
  const actionRef = useRef(actions);
  const [isLoading, setIsLoading] = useState(false);

  function onActionCallback(stickerSetId, action, status) {
    if (action == "like") ChangeLiked(stickerSetId, status);
    else ChangeFavourite(stickerSetId, status);

    setActions((currentActions) => {
      if (currentActions.find((r) => r.stickerSetId == stickerSetId) == null) {
        if (action == "like") return [...currentActions, { stickerSetId, like: status }];
        else return [...currentActions, { stickerSetId, favorite: status }];
      } else {
        return currentActions.map((r) => {
          if (r.stickerSetId === stickerSetId) {
            if (action == "like")
              return {
                stickerSetId,
                like: r.like == true ? null : status,
                favorite: r.favorite,
              };
            else
              return {
                stickerSetId,
                like: r.like,
                favorite: r.favorite == true ? null : status,
              };
          } else return r;
        });
      }
    });
  }

  useEffect(() => {
    return () => {
      if (actionRef.current.length > 0) SendActionData(actionRef.current);
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
      if (searchText && searchText != "") data = await Search(searchText, page * 10);
      else data = await GetPopularStickers(page * 10, 10, dateFilter);

      if (page == 0) setStickerSets(data);
      else AddStickerSets(data);
      setIsLoading(false);
      if (data.length == 10) setTimeout(() => setCanLoad(true), 250);
    }

    fetchData(page);
  }, [page]);

  useEffect(() => {
    setCanLoad(true);
  }, []);

  useEffect(() => {
    setCanLoad(true);
    setPage(0);
  }, [dateFilter]);

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
