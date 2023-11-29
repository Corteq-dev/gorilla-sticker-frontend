import { useEffect, useState, useRef } from "react";
import styles from "./DetailsPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { useRouter } from "next/router";
import Link from "next/link";
import StickerSet from "../../global/StickerSet/StickerSet";
import {
  GetDetailedStickerSet,
  GetSimilarStickers,
  SendActionData,
} from "../../../apis/DefaultAPI";
import { useObserver } from "../../../hooks/useObserver";
import { useTranslation } from "react-i18next";

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
  const [actions, setActions] = useState([]);
  const actionRef = useRef(actions);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
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
      console.log(detailedStickerSet);
      if (!canLoad || !detailedStickerSet.id) return;

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
    if (action == "like")
      setDetailedStickerSet({
        ...detailedStickerSet,
        liked: status,
        likes:
          status == true
            ? detailedStickerSet.likes + 1
            : detailedStickerSet.likes - 1,
      });
    else
      setDetailedStickerSet({
        ...detailedStickerSet,
        addedToFavorites: status,
        favorites:
          status == true
            ? detailedStickerSet.favorites + 1
            : detailedStickerSet.favorites - 1,
      });

    setActions((currentActions) => {
      if (currentActions.find((r) => r.stickerSetId == stickerSetId) == null) {
        if (action == "like")
          return [...currentActions, { stickerSetId, like: status }];
        else return [...currentActions, { stickerSetId, favorite: status }];
      } else {
        return currentActions.map((r) => {
          if (r.stickerSetId === stickerSetId) {
            if (action == "like")
              return {
                stickerSetId,
                like: r.like == true ? null : status,
                favorite: r.favorite,
              };
            else
              return {
                stickerSetId,
                like: r.like,
                favorite: r.favorite == true ? null : status,
              };
          } else return r;
        });
      }
    });
  }

  function onActionCallback(stickerSetId, action, status) {
    const stickerSet = stickerSets.find((item) => item.id === stickerSetId);

    setActions((currentActions) => {
      if (currentActions.find((r) => r.stickerSetId == stickerSetId) == null) {
        if (action == "like")
          return [
            ...currentActions,
            {
              stickerSetId,
              like: !stickerSet.liked,
              initialLike: stickerSet.liked,
              initialFav: stickerSet.addedToFavorites,
            },
          ];
        else
          return [
            ...currentActions,
            {
              stickerSetId,
              favorite: !stickerSet.addedToFavorites,
              initialLike: stickerSet.liked,
              initialFav: stickerSet.addedToFavorites,
            },
          ];
      } else {
        return currentActions.map((r) => {
          if (r.stickerSetId === stickerSetId) {
            if (action == "like")
              return {
                ...r,
                like: r.like == undefined ? !r.initialLike : !r.like,
              };
            else
              return {
                ...r,
                favorite: r.favorite == undefined ? !r.initialFav : !r.favorite,
              };
          } else return r;
        });
      }
    });

    if (action == "like") ChangeLiked(stickerSetId, status);
    else ChangeFavourite(stickerSetId, status);
  }

  useEffect(() => {
    return () => {
      if (actionRef.current.length > 0) {
        const data = actionRef.current.map((item) => {
          return {
            stickerSetId: item.stickerSetId,
            like: item.like === item.initialLike ? null : item.like,
            favorite: item.favorite === item.initialFav ? null : item.favorite,
          };
        });
        SendActionData(data);
      }
    };
  }, []);

  useEffect(() => {
    actionRef.current = actions;
  }, [actions]);

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
              <>
                {item.slice(item.length - 4) == ".tgs" ? (
                  <tgs-player
                    id="firstLottie"
                    autoplay
                    loop
                    mode="normal"
                    src={item}
                    style={{ width: 90, height: 90 }}
                  ></tgs-player>
                ) : item.slice(item.length - 5) == ".webm" ? (
                  <video width="90" height="90" autoPlay loop>
                    <source src={item} type="video/webm" />
                  </video>
                ) : (
                  <img src={item} />
                )}
              </>
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
        <a
          className={styles.buttonAdd}
          href={`https://t.me/addstickers/${detailedStickerSet.name}`}
        >
          {t("ADD")}{" "}
          {detailedStickerSet.stickersUrl &&
            detailedStickerSet.stickersUrl.length}
          {t("STICKERS")}
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
    </Container>
  );
}
