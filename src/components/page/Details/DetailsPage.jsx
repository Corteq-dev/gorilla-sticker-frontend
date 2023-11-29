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
    if (action == "like") ChangeLiked(stickerSetId, status);
    else ChangeFavourite(stickerSetId, status);

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

  useEffect(() => {
    return () => {
      if (actionRef.current.length > 0) SendActionData(actionRef.current);
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
            <p className={styles.description}>
              {detailedStickerSet.description}
            </p>
          </div>
        </Col>
        <Col lg={12} className={styles.stickers}>
          {detailedStickerSet.stickersUlr &&
            detailedStickerSet.stickersUlr.map((item, index) => (
              <img src={item} key={index} />
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
              onClick={() =>
                onDetailedActionCallback(
                  detailedStickerSet.id,
                  "like",
                  !detailedStickerSet.liked,
                )
              }
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
            navigator.clipboard.writeText(
              `https://t.me/addstickers/${detailedStickerSet.name}`,
            );
          }}
        >
          SHARE
        </a>
        <a
          className={styles.buttonAdd}
          href={`https://t.me/addstickers/${detailedStickerSet.name}`}
        >
          ADD{" "}
          {detailedStickerSet.stickersUrl &&
            detailedStickerSet.stickersUrl.length}{" "}
          STICKERS
        </a>
      </div>
      <div className={styles.recommendedText}>
        <div />
        <span>Related sticker sets</span>
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
