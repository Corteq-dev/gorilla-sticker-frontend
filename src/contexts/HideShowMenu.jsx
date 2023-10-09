import React, { useState, useEffect } from "react";
import styles from "../components/global/SearchBar/SearchBart.module.scss";
import { Container } from "react-bootstrap";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);

      setLastScrollY(window.scrollY);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  console.log(show);
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
      <div className={`styles.menuBox ${show && "styles.menuBoxHiden"}`}>
        <div className={styles.menuItemBox}>Новинки</div>
        <div className={styles.menuItemBox}>Популярные</div>
      </div>
    </Container>
  );
};


export default Navbar;