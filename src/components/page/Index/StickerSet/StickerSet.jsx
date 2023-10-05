import { Row } from "react-bootstrap";
import styles from "./StickerSet.module.scss";

export default function StickerSet({ name }) {
  return (
    <div className={styles.container}>
      <Row>{name}</Row>
    </div>
  );
}
