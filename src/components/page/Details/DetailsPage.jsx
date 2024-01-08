import { useEffect, useState, useRef } from "react";
import styles from "./DetailsPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import StickerSet from "../../global/StickerSet/StickerSet";
import {
  GetDetailedStickerSet,
  GetSimilarStickers,
  SendActionData,
} from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";
import { useTranslation } from "react-i18next";
import LazyLoadedLottie from "../../global/LazyLoadedLottie";
import LazyLoadedVideo from "../../global/LazyLoadedVideo";
import ReportPopup from "../../global/ReportPopup/ReportPopup";

export default function DetailsPage() {
  const router = useRouter();
  const {
    detailedStickerSet,
    setDetailedStickerSet,
    stickerSets,
    page,
    setPage,
    canLoad,
    setCanLoad,
    searchText,
    AddStickerSets,
    ChangeLiked,
    ChangeFavourite,
  } = useStickers();
  const [isLoading, setIsLoading] = useState(false);
  const [canDoAction, setCanDoAction] = useState(true);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function FetchStickerSet() {
      if (router && router.query.id) {
        const stickerSet = await GetDetailedStickerSet(router.query.id);
        setDetailedStickerSet(stickerSet);
      }
    }
    FetchStickerSet();
  }, [router]);

  const lastElement = useRef();
  useObserver(lastElement, canLoad, isLoading, () => {
    setPage(page + 1);
  });
  useEffect(() => {
    async function fetchData(page) {
      if (!canLoad || !detailedStickerSet || !detailedStickerSet.id) return;

      setCanLoad(false);
      setIsLoading(true);

      let data = "";
      if (searchText && searchText != "")
        data = await Search(searchText, page * 10);
      else
        data = await GetSimilarStickers(
          detailedStickerSet.customName,
          detailedStickerSet.description,
          page * 10,
        );

      AddStickerSets(data);
      setIsLoading(false);
      if (data.length >= 10) setTimeout(() => setCanLoad(true), 250);
    }

    fetchData(page);
  }, [page, detailedStickerSet]);

  useEffect(() => {
    setCanLoad(true);
  }, []);

  function onDetailedActionCallback(stickerSetId, action, status) {
    if (!canDoAction) return;
    if (action == "like") {
      setDetailedStickerSet({
        ...detailedStickerSet,
        liked: status,
        likes:
          status == true
            ? detailedStickerSet.likes + 1
            : detailedStickerSet.likes - 1,
      });
      SendActionData([{ stickerSetId, like: status }]);
    } else {
      setDetailedStickerSet({
        ...detailedStickerSet,
        addedToFavorites: status,
        favorites:
          status == true
            ? detailedStickerSet.favorites + 1
            : detailedStickerSet.favorites - 1,
      });
      ChangeFavourite(stickerSetId, status);
    }
    setCanDoAction(false);
    setTimeout(() => {
      setCanDoAction(true);
    }, 500);
  }

  function onActionCallback(stickerSetId, action, status) {
    if (!canDoAction) return;
    if (action == "like") {
      SendActionData([{ stickerSetId, like: status }]);
      ChangeLiked(stickerSetId, status);
    } else {
      SendActionData([{ stickerSetId, favorite: status }]);
      ChangeFavourite(stickerSetId, status);
    }
    setCanDoAction(false);
    setTimeout(() => {
      setCanDoAction(true);
    }, 500);
  }

  if (!detailedStickerSet) return null;

  return (
    <Container className={styles.container}>
      <div className={styles.placeholder}></div>
      <Row>
        <Col lg={12} className={styles.header}>
          <div className={styles.headerText}>
            <Link
              href={`/details/${detailedStickerSet.id}`}
              className={styles.name}
            >
              {detailedStickerSet.customName}
            </Link>
            {detailedStickerSet.description && (
              <p className={styles.description}>
                {detailedStickerSet.description}
              </p>
            )}
          </div>
        </Col>
        <Col lg={12} className={styles.stickers}>
          {detailedStickerSet.stickersUlr &&
            detailedStickerSet.stickersUlr.map((item, index) => (
              <span key={index}>
                {item.slice(item.length - 4) == ".tgs" ? (
                  <LazyLoadedLottie
                    animationPath={item}
                    style={{ width: 90, height: 90 }}
                  />
                ) : item.slice(item.length - 5) == ".webm" ? (
                  <LazyLoadedVideo videoSource={item} />
                ) : (
                  <Image
                    width={90}
                    height={90}
                    src={item}
                    alt={`sticker-set-${detailedStickerSet.id}-${index}`}
                  />
                )}
              </span>
            ))}
        </Col>
        <Col lg={6} className={styles.footer}>
          <div className={styles.emojis}>
            <div
              className={
                styles.emoji +
                " " +
                (detailedStickerSet.liked == true && styles.liked)
              }
              onClick={() => {
                onDetailedActionCallback(
                  detailedStickerSet.id,
                  "like",
                  !detailedStickerSet.liked,
                );
              }}
            >
              ❤️ {detailedStickerSet.likes}
            </div>
            <div
              className={
                styles.emoji +
                " " +
                (detailedStickerSet.addedToFavorites == true && styles.liked)
              }
              onClick={() =>
                onDetailedActionCallback(
                  detailedStickerSet.id,
                  "fav",
                  !detailedStickerSet.addedToFavorites,
                )
              }
            >
              ⭐ {detailedStickerSet.favorites}
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.buttons}>
        <a
          className={styles.buttonShare}
          onClick={() => {
            setShowReportPopup(true);
          }}
        >
          {t("REPORT")}
        </a>
        <div className={styles.copiedMessageContainer}>
          <span
            className={
              styles.copiedMessage +
              " " +
              (showCopiedMessage == true ? styles.showCopiedMessage : "")
            }
          >
            {t("Link was copied to clipboard!")}
          </span>
          <a
            className={styles.buttonShare}
            onClick={() => {
              setShowCopiedMessage(true);
              setTimeout(() => {
                setShowCopiedMessage(false);
              }, 2000);

              navigator.clipboard.writeText(
                `https://t.me/addstickers/${detailedStickerSet.name}`,
              );
            }}
          >
            {t("SHARE")}
          </a>
        </div>
        <a
          className={styles.buttonAdd}
          href={`https://t.me/addstickers/${detailedStickerSet.name}`}
        >
          {t("ADD STICKERS")}
        </a>
      </div>
      <div className={styles.recommendedText}>
        <div />
        <span>{t("Related sticker sets")}</span>
        <div />
      </div>
      {stickerSets &&
        stickerSets.map((item) => (
          <StickerSet
            stickerSet={item}
            key={item.id}
            className={styles.stickerSet}
            onActionCallback={onActionCallback}
          />
        ))}
      <div ref={lastElement} />
      <ReportPopup
        show={showReportPopup}
        stickerSetId={detailedStickerSet.id}
        onHide={() => {
          setShowReportPopup(false);
        }}
      />
    </Container>
  );
}
