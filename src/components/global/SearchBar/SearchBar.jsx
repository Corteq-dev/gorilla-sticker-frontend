import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Search } from "../../../apis/DefaultAPI";
import { useStickers } from "../../../contexts/StickerContext";
import { BsFilter } from "react-icons/bs";

const SearchBar = () => {
  const [show, setShow] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [pageOffsetY, setPageOffsetY] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchDelayTimer, setSearchDelayTimer] = useState(null);
  const [sortType, setSortType] = useState(0);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { AddStickerSets } = useStickers();

  const sortTypeButton = [
    {
      id: 0,
      text: "All time",
    },
    {
      id: 1,
      text: "1 Day",
    },
    {
      id: 2,
      text: "3 Days",
    },
    {
      id: 3,
      text: "Week",
    },
    {
      id: 4,
      text: "Month",
    },
  ];

  const router = useRouter();
  const { t } = useTranslation();

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

  useEffect(() => {
    setIsNew(window.location.pathname === "/");
  }, []);

  useEffect(() => {
    if (searchDelayTimer) {
      clearTimeout(searchDelayTimer);
    }

    if (searchText) {
      const newSearchDelayTimer = setTimeout(async () => {
        const newStickerSets = await Search(searchText);
        AddStickerSets(newStickerSets);
      }, 1500);

      setSearchDelayTimer(newSearchDelayTimer);
    }
  }, [searchText]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <div className={styles.searchImage}></div>
          <input
            className={styles.searchBox}
            type="text"
            placeholder={t("Search for stickers")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div onClick={() => router.push("/info")} className={styles.infoBox}>
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
        <div
          onClick={() => router.push("/")}
          className={
            styles.menuItemBox + " " + (isNew == true ? styles.active : "")
          }
        >
          {t("New")}
        </div>
        <div
          onClick={() => router.push("/popular")}
          className={
            styles.menuItemBox + " " + (isNew == false ? styles.active : "")
          }
        >
          {t("Popular")}
          {!isNew && (
            <div className={styles.sortBar}>
              <button
                className={styles.toggleSortOpen}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <BsFilter />
              </button>
              {isSortOpen && (
                <div className={styles.sortTypes}>
                  {sortTypeButton.map((button) => (
                    <button
                      className={`${styles.itemSortBar} ${
                        button.id === sortType ? styles.activeSort : ""
                      }`}
                      key={button.id}
                      onClick={() => setSortType(button.id)}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <span
          className={
            styles.scrollBar +
            " " +
            (isNew == false ? styles.moveLeft : styles.moveRight)
          }
        ></span>
      </div>
    </div>
  );
};

export default SearchBar;
