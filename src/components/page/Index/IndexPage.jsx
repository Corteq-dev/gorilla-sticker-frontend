import { useEffect, useState } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "./StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { GetNewStickers } from "../../../apis/DefaultAPI";

export default function IndexPage() {
  const { stickerSets, AddStickerSets } = useStickers();

  useEffect(() => {
    async function fetchData() {
      const data = await GetNewStickers();
      console.log(data);
      AddStickerSets(data);
    }
    fetchData();
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
          />
        ))}
    </Container>
  );
}
