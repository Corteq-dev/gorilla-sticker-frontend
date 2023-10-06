import { Container } from "react-bootstrap";
import styles from "./SearchBart.module.scss";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function SearchBar() {
  return (
    <Container className={styles.wrapper}>
      <Container className={styles.container}>
        <Container className={styles.search_image}></Container>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search for stickers"
        />
        <Container className={styles.info_box}></Container>
      </Container>
    </Container>
  );
}
