import { useEffect, useState } from "react";
import styles from "./DetailsPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useStickers } from "../../../contexts/StickerContext";
import { useRouter } from "next/router";
import Link from "next/link";
import StickerSet from "../Index/StickerSet/StickerSet";

export default function DetailsPage() {
  const router = useRouter();
  const { detailedStickerSet, setDetailedSticker, stickerSets } = useStickers();

  useEffect(() => {
    if (router) setDetailedSticker(router.query.id);
  }, [router]);

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
              {detailedStickerSet.name}
            </Link>
            <p className={styles.description}>
              {detailedStickerSet.description}
            </p>
          </div>
        </Col>
        <Col lg={12} className={styles.stickers}>
          {detailedStickerSet.stickersUrl &&
            detailedStickerSet.stickersUrl.map((item, index) => (
              <img src={item} key={index} />
            ))}
        </Col>
        <Col lg={6} className={styles.footer}>
          <div className={styles.emojis}>
            <div className={styles.emoji}>❤️ 123</div>
            <div className={styles.emoji}>⭐ 123</div>
          </div>
        </Col>
      </Row>
      <div className={styles.buttons}>
        <a className={styles.buttonShare}>SHARE</a>
        <a className={styles.buttonAdd}>
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
      {stickerSets.map((item) => (
        <StickerSet
          stickerSet={item}
          key={item.id}
          className={styles.stickerSet}
        />
      ))}
    </Container>
  );
}
