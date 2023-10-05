import { useEffect, useState } from "react";
import styles from "./IndexPage.module.scss";
import StickerSet from "./StickerSet/StickerSet";
import { Container } from "react-bootstrap";

export default function IndexPage() {
  const [stickersets, setStickersets] = useState([
    { id: 0, name: "asd" },
    { id: 1, name: "asd2" },
    { id: 3, name: "asd3" },
  ]);

  return (
    <Container className={styles.container}>
      {stickersets.map((item) => (
        <StickerSet name={item.name} key={item.id} />
      ))}
    </Container>
  );
}
