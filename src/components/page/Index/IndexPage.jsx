import { useEffect, useState } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "./StickerSet/StickerSet";
import { Container } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";

export default function IndexPage() {
  const { stickerSets } = useStickers();

  return (
    <Container className={styles.container}>
      <div className={styles.placeholder}></div>
      {stickerSets.map((item) => (
        <StickerSet
          stickerSet={item}
          key={item.id}
          className={styles.stickerSet}
        />
      ))}
    </Container>
  );
}
