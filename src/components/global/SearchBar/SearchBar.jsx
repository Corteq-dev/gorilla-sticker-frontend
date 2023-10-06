import { Container } from "react-bootstrap";
import styles from "./SearchBart.module.scss";

export default function SearchBar() {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.searchImage}></div>
        <input className={styles.searchBar} type="text" placeholder="Search for stickers" />
        <div className={styles.infoBox}></div>
      </div>
    </Container>
  );
}
