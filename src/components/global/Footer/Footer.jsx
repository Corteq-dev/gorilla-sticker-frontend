import React, { useState, useEffect, useRef } from "react";
import styles from "./Footer.module.scss";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const [show, setShow] = useState(true);
  const [pageOffsetY, setPageOffsetY] = useState(0);
  const [isFav, setIsFav] = useState(null);
  const [lock, setLock] = useState(true);

  const router = useRouter();
  const { t } = useTranslation();

  const controlNavbar = () => {
    if (!lock) setShow(window.scrollY < pageOffsetY);
    setPageOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [pageOffsetY]);

  useEffect(() => {
    setIsFav(
      router.pathname === "/favourites"
        ? true
        : router.pathname === "/mystickers"
        ? false
        : null,
    );
    setTimeout(() => setLock(false), 500);
  }, []);

  return (
    <>
      <div style={{ height: 70 }}></div>
      <div
        className={`${styles.container} ${
          show == false ? `${styles.hidden}` : ""
        }`}
      >
        <div
          onClick={() => router.push("/favourites")}
          className={styles.option + " " + (isFav == true ? styles.active : "")}
        >
          <span>{t("Favourites")}</span>
        </div>
        <div
          onClick={() => router.push("/mystickers")}
          className={
            styles.option + " " + (isFav == false ? styles.active : "")
          }
        >
          <span>{t("My stickers")}</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
