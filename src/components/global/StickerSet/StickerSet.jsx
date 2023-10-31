import { Row, Col } from "react-bootstrap";
import styles from "./StickerSet.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import Link from "next/link";

export default function StickerSet({
  stickerSet,
  className,
  onActionCallback,
}) {
  return (
    <Row className={className}>
      <Col lg={12} className={styles.header}>
        <div className={styles.headerText}>
          <Link href={`/details/${stickerSet.id}`} className={styles.name}>
            {stickerSet.customName}
          </Link>
          <p className={styles.description}>{stickerSet.description}</p>
        </div>
      </Col>
      <Col lg={12} className={styles.stickers}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          grabCursor={true}
          scrollbar={{
            hide: true,
          }}
          modules={[Pagination, FreeMode]}
        >
          {stickerSet.stickersUlr &&
            stickerSet.stickersUlr.map((item, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <img src={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Col>
      <Col lg={6} className={styles.footer}>
        <a
          href={`https://t.me/addstickers/Yellowboi`}
          className={styles.button}
        >
          ADD
        </a>
        <div className={styles.emojis}>
          <div
            className={
              styles.emoji + " " + (stickerSet.liked == true && styles.liked)
            }
            onClick={() => onActionCallback(stickerSet.id, true)}
          >
            ❤️ {stickerSet.likes}
          </div>
          <div
            className={
              styles.emoji +
              " " +
              (stickerSet.addedToFavorites == true && styles.liked)
            }
            onClick={() => onActionCallback(stickerSet.id, false)}
          >
            ⭐ {stickerSet.favorites}
          </div>
        </div>
      </Col>
    </Row>
  );
}