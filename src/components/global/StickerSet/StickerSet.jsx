import { Row, Col } from "react-bootstrap";
import styles from "./StickerSet.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import Link from "next/link";
import LazyLoadedLottie from "../LazyLoadedLottie";
import LazyLoadedVideo from "../LazyLoadedVideo";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function StickerSet({
  stickerSet,
  className,
  onActionCallback,
  canAdd = true,
}) {
  const { t } = useTranslation();

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
          speed={5000}
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
                  <LazyLoadedLottie
                    animationPath={item}
                    style={{ height: 90, width: 90 }}
                  />
                ) : item.slice(item.length - 5) == ".webm" ? (
                  <LazyLoadedVideo
                    videoSource={item}
                    key={index}
                    style={{ height: 90, width: 90 }}
                  />
                ) : (
                  <Image
                    src={item}
                    alt={`Gorrila sticker - ${stickerSet.id} - ${index}`}
                    className={styles.stickerImage}
                    height={90}
                    width={90}
                  />
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
            {t("ADD")}
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
