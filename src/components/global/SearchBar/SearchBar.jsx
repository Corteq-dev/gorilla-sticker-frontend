import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [show, setShow] = useState(true);
  const [pageOffsetY, setPageOffsetY] = useState(0);

  const controlNavbar = () => {
    setShow(window.scrollY < pageOffsetY);
    setPageOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [pageOffsetY]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <div className={styles.searchImage}></div>
          <input
            className={styles.searchBox}
            type="text"
            placeholder="Search for stickers"
          />
          <div className={styles.infoBox}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`${styles.menuBox} ${
          show == false ? `${styles.menuBoxHiden}` : ""
        }`}
      >
        <div className={styles.menuItemBox}>New</div>
        <div className={styles.menuItemBox}>Popular</div>
      </div>
    </div>
  );
};

export default SearchBar;
