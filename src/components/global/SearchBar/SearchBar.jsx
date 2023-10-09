import { Container } from "react-bootstrap";
import styles from "./SearchBart.module.scss";

export default function SearchBar() {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.searchBar}>
        <div className={styles.searchImage}></div>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search for stickers"
        />
        <div className={styles.infoBox}></div>
      </div>
      <div className={styles.menuBox}>
        <div className={styles.menuItemBox}>Новинки</div>
        <div className={styles.menuItemBox}>Популярные</div>
      </div>
    </Container>
  );
}
