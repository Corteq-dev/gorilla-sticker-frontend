import React, { useState, useEffect, useRef } from "react";
import styles from "./Footer.module.scss";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [show, setShow] = useState(true);
  const [pageOffsetY, setPageOffsetY] = useState(0);
  const [isFav, setIsFav] = useState(null);

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
    setIsFav(
      window.location.pathname === "/favourites"
        ? true
        : window.location.pathname === "/mystickers"
        ? false
        : null,
    );
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
