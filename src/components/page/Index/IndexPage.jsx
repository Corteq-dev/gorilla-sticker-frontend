import { useEffect, useState } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "../../global/StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { GetNewStickers } from "../../../apis/DefaultAPI";

export default function IndexPage() {
  const { stickerSets, AddStickerSets } = useStickers();
  const { actions, setActions } = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await GetNewStickers();
      AddStickerSets(data);
    }
    fetchData();
  }, []);

  function onActionCallback(stickerSetId, isLike) {
    setActions((currentActions) => {
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
    </Container>
  );
}
