import React, { useState, useEffect, useRef } from "react";
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
  const [searchDelayTimer, setSearchDelayTimer] = useState(null);
  const [sortType, setSortType] = useState(0);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [lock, setLock] = useState(true);
  const {
    setSearchText,
    searchText,
    setStickerSets,
    setCanLoad,
    setPage,
    setDateFilter,
  } = useStickers();
  const didMountRef = useRef(false);

  const sortTypeButton = [
    {
      id: 0,
      value: 0,
      text: "All time",
    },
    {
      id: 1,
      value: 3,
      text: "3 Days",
    },
    {
      id: 3,
      value: 7,
      text: "Week",
    },
    {
      id: 4,
      value: 30,
      text: "Month",
    },
  ];

  const router = useRouter();
  const { t } = useTranslation();

  const controlNavbar = () => {
    if (!lock) setShow(window.scrollY < pageOffsetY);

    setPageOffsetY(window.scrollY > 0 ? window.scrollY : 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [pageOffsetY]);

  useEffect(() => {
    setIsNew(
      window.location.pathname == "/"
        ? true
        : window.location.pathname == "/popular"
        ? false
        : null,
    );
    setTimeout(() => setLock(false), 500);
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      if (searchDelayTimer) {
        clearTimeout(searchDelayTimer);
      }

      if (searchText) {
        const newSearchDelayTimer = setTimeout(async () => {
          setCanLoad(false);
          const newStickerSets = await Search(searchText);
          setStickerSets(newStickerSets);

          setPage(0);
          if (newStickerSets.length == 10)
            setTimeout(() => setCanLoad(true), 500);
        }, 500);

        setSearchDelayTimer(newSearchDelayTimer);
      } else {
        setTimeout(() => setCanLoad(true), 500);
        setPage(-1);
      }
    } else {
      didMountRef.current = true;
    }
  }, [searchText]);

  return (
    <div
      className={styles.wrapper + " " + (show == false ? styles.hidden : "")}
    >
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
          {searchText == "" ? (
            <div
              onClick={() => router.push("/info")}
              className={styles.infoBox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"></path>
              </svg>
            </div>
          ) : (
            <div onClick={() => setSearchText("")} className={styles.infoBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.6em"
                viewBox="-10 60 384 512"
                className={styles.colorChange}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className={styles.menuBox}>
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
          {isNew == false && (
            <div className={styles.sortBar}>
              <button
                className={
                  styles.toggleSortOpen +
                  " " +
                  (isSortOpen ? styles.rotate : "")
                }
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <BsFilter className={styles.sortBarIcon} />
              </button>
              {isSortOpen && (
                <div className={styles.sortTypes}>
                  {sortTypeButton.map((button) => (
                    <button
                      className={`${styles.itemSortBar} ${
                        button.id === sortType ? styles.activeSort : ""
                      }`}
                      key={button.id}
                      onClick={() => {
                        setSortType(button.id);
                        setDateFilter(button.value);
                        setIsSortOpen(false);
                      }}
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
            (isNew == false
              ? styles.moveLeft
              : isNew == true
              ? styles.moveRight
              : styles.hide)
          }
        ></span>
      </div>
    </div>
  );
};

export default SearchBar;
