import { useEffect, useState, useRef } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "../../global/StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { GetNewStickers, SendActionData } from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";

export default function IndexPage() {
  const { stickerSets, AddStickerSets, ChangeLiked, ChangeFavourite } =
    useStickers();
  const [actions, setActions] = useState([]);
  const actionRef = useRef(actions);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoad, setCanLoad] = useState(false);

  function onActionCallback(stickerSetId, action, status) {
    if (action == "like") ChangeLiked(stickerSetId, status);
    else ChangeFavourite(stickerSetId, status);

    setActions((currentActions) => {
      if (currentActions.find((r) => r.stickerSetId == stickerSetId) == null) {
        if (action == "like")
          return [...currentActions, { stickerSetId, like: status }];
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
    console.log(actions);
    actionRef.current = actions;
  }, [actions]);

  const lastElement = useRef();
  useObserver(lastElement, canLoad, isLoading, () => {
    console.log(`Observer worked: ${page}`);
    setPage(page + 1);
  });

  useEffect(() => {
    async function fetchData(page) {
      setCanLoad(false);
      setIsLoading(true);
      const data = await GetNewStickers(page == 0 ? 0 : page * 10);
      AddStickerSets(data);
      setIsLoading(false);
      setTimeout(() => setCanLoad(true), 250);
      console.log(`Fetching worked: ${page}`);
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
