import { Row, Col } from "react-bootstrap";
import styles from "./StickerSet.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import Link from "next/link";

export default function StickerSet({
  stickerSet,
  className,
  onActionCallback,
  canAdd = true,
}) {
  return (
    <Row className={styles.wrapper}>
      <Col lg={12} className={styles.header}>
        <div className={styles.headerText}>
          <Link href={`/details/${stickerSet.id}`} className={styles.name}>
            {stickerSet.customName}
          </Link>
          {stickerSet.description && (
            <p className={styles.description}>{stickerSet.description}</p>
          )}
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
                {item.slice(item.length - 4) == ".tgs" ? (
                  <tgs-player
                    id={`tgs-player-${stickerSet.id}-${index}`}
                    autoplay
                    loop
                    mode="normal"
                    src={item}
                    style={{ width: 90, height: 90 }}
                  ></tgs-player>
                ) : item.slice(item.length - 5) == ".webm" ? (
                  <video
                    width="90"
                    height="90"
                    playsinline
                    autoPlay
                    loop
                    muted
                    id={`video-${stickerSet.id}-${index}`}
                  >
                    <source src={item} type="video/webm" />
                  </video>
                ) : (
                  <img src={item} />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </Col>
      <Col lg={6} className={styles.footer}>
        {canAdd && (
          <a
            href={`https://t.me/addstickers/${stickerSet.name}`}
            className={styles.button}
          >
            ADD
          </a>
        )}
        <div className={styles.emojis}>
          <div
            className={
              styles.emoji + " " + (stickerSet.liked == true && styles.liked)
            }
            onClick={() =>
              onActionCallback(stickerSet.id, "like", !stickerSet.liked)
            }
          >
            ❤️ {stickerSet.likes}
          </div>
          <div
            className={
              styles.emoji +
              " " +
              (stickerSet.addedToFavorites == true && styles.liked)
            }
            onClick={() =>
              onActionCallback(
                stickerSet.id,
                "fav",
                !stickerSet.addedToFavorites,
              )
            }
          >
            ⭐ {stickerSet.favorites}
          </div>
        </div>
      </Col>
    </Row>
  );
}
