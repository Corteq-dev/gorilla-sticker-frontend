import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./InfoPage.module.scss";
import { router } from "next/client";

const InfoPage = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <div >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2.3em"
            viewBox="0 0 512 590"
            className={styles.colorChange}
          >
            <path d="M256 0c-13.3 0-24 10.7-24 24V88c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24zm0 400c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V424c0-13.3-10.7-24-24-24zM488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24H424c-13.3 0-24 10.7-24 24s10.7 24 24 24h64zM112 256c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H88c13.3 0 24-10.7 24-24zM437 108.9c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-45.3 45.3c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L437 108.9zM154.2 357.8c-9.4-9.4-24.6-9.4-33.9 0L75 403.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l45.3-45.3c9.4-9.4 9.4-24.6 0-33.9zM403.1 437c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L403.1 437zM154.2 154.2c9.4-9.4 9.4-24.6 0-33.9L108.9 75c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l45.3 45.3c9.4 9.4 24.6 9.4 33.9 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"></path>
          </svg>
        </div>
        <div onClick={() => router.push("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2.6em"
            viewBox="-10 60 384 512"
            className={styles.colorChange}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
        </div>
      </div>
      <p className={styles.aboutBox}>
        <b>ABOUT</b>
      </p>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Telegram bot: </p>
        <a href={"#"}>botName</a>
      </div>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Support chat: </p>
        <a href={"#"}>SupportChat</a>
      </div>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Mail: </p>
        <a href={"#"}>Mail</a>
      </div>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Site: </p>
        <a href={"#"}>Site</a>
      </div>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Terms: </p>
        <a href={"#"}> Terms</a>
      </div>
      <div className={styles.nameLinkBox}>
        <p className={styles.linkName}>Github: </p>
        <a href={"#"}>Github </a>
      </div>
      <div className={styles.termsWrapper}>
        <div>
          <p className={styles.aboutBox}>
            <b>TERMS OF USE</b>
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus
          magna nisl, non placerat nisl tincidunt nec. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Praesent ornare suscipit mi,
          vel venenatis sem pharetra et. Nunc fringilla lorem molestie odio
          commodo convallis. Nulla facilisi. Cras et justo efficitur, elementum
          lectus id, suscipit ex. Nam vitae velit sollicitudin, consequat eros
          quis, facilisis dui. Etiam leo lectus, vulputate nec bibendum sed,
          aliquet eget nisl. Integer ante nisi, iaculis quis turpis aliquam,
          consequat volutpat nulla. Mauris ac est faucibus, laoreet ipsum at,
          pulvinar est. Proin et odio gravida, pellentesque mauris ornare,
          iaculis lectus. Cras posuere mi ut magna rutrum, et facilisis metus
          porttitor. Phasellus eget ipsum urna. Vestibulum egestas eu erat et
          ultricies. In velit metus, finibus sit amet odio eget, interdum
          scelerisque sem. Praesent sagittis bibendum augue at aliquet. Vivamus
          elementum dui sit amet quam tincidunt imperdiet. Donec vitae odio ac
          orci elementum accumsan. Morbi nec odio est. Nullam pulvinar nulla non
          feugiat imperdiet. Duis ac viverra quam. Sed porta risus scelerisque
          ex semper pulvinar. Donec rhoncus efficitur orci et efficitur. Duis
          diam sem, dictum vel placerat vitae, cursus non tellus. Nam sed
          malesuada mi. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Integer vel elit in eros
          vehicula eleifend. Donec suscipit ante interdum aliquam faucibus.
          Phasellus pretium, odio ut maximus fermentum, nibh ex lobortis ex, vel
          tempor purus neque eu sapien. Sed sed magna sapien. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Nam facilisis tincidunt vestibulum. Aliquam viverra lectus
          dolor, eget dictum nibh rhoncus ac. Vivamus placerat ut augue non
          tempus. Vestibulum ante eros, sagittis ut posuere id, volutpat et
          quam. In eu consectetur mi, quis feugiat nisi. Nulla facilisi. Cras
          congue lacus velit, ac sagittis risus rutrum sit amet. Integer dolor
          neque, facilisis a commodo non, dignissim vitae ex. Pellentesque vel
          porttitor felis. Fusce condimentum turpis id sem iaculis, vitae
          elementum nisl efficitur. Ut sed massa non eros condimentum commodo.
          Mauris facilisis, purus ut bibendum rutrum, nulla nisi consequat
          lacus, nec vestibulum sem urna ut mi. Cras gravida massa nec arcu
          lacinia, at molestie arcu tincidunt. Maecenas at tincidunt nisl, eu
          ullamcorper risus. Proin bibendum dignissim nibh at convallis. Sed non
          sem nunc. Nam id lorem ultricies, venenatis ante sed, accumsan libero.
          Pellentesque consequat aliquet nisi tincidunt porttitor. Vivamus
          aliquam ipsum sed nibh aliquet, non condimentum erat ultrices. Nunc ut
          consectetur diam. Vivamus interdum ex a ligula aliquet dignissim.
          Quisque placerat diam elementum placerat hendrerit. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Fusce massa ipsum, ultricies non nisl sed, pellentesque
          pellentesque nisl. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Vestibulum sit amet arcu
          pharetra, blandit felis sed, tincidunt tortor. Aenean quis mauris
          blandit, consectetur dui at, tristique ante. In maximus orci ac odio
          finibus, et facilisis sapien dictum. Ut malesuada posuere erat, in
          gravida nisl vulputate vulputate. Vestibulum commodo massa porta
          tellus posuere, eget pretium nisl mollis. Sed quis orci viverra,
          porttitor elit id, feugiat purus. Etiam placerat mi arcu, eget dapibus
          sapien bibendum non. Etiam mattis diam auctor ante sagittis blandit
          nec id metus. Nullam tellus nibh, interdum lacinia dolor sit amet,
          auctor iaculis purus. Pellentesque ultricies rhoncus aliquam. In sed
          leo metus. Morbi sollicitudin sagittis sem nec molestie. Duis nec
          fringilla dui, vel pretium ligula. Duis nec egestas ante. Donec
          vulputate nisl non diam rhoncus eleifend. Sed eget sapien ut lectus
          suscipit hendrerit quis vel risus. Etiam volutpat suscipit velit et
          tristique. Quisque justo orci, pharetra a lacus non, blandit convallis
          sem. Sed quis eleifend diam, at euismod massa. Integer vitae lacinia
          felis. Donec laoreet dapibus diam, non vehicula purus consectetur at.
          Etiam sapien lacus, fermentum sed porttitor a, auctor id nulla. In
          sollicitudin venenatis risus. Pellentesque feugiat interdum lacus ac
          mattis. Suspendisse non odio ornare magna mattis laoreet. Maecenas
          vulputate libero ut magna condimentum ullamcorper. Praesent egestas
          fringilla justo quis congue. Praesent elementum blandit risus. Vivamus
          at nulla non felis elementum efficitur sed quis mauris. Sed sodales
          aliquet mauris, vitae consequat augue aliquet et. Cras eu maximus
          felis, in semper nulla. Quisque sed vulputate velit. Maecenas sodales,
          ligula vel vestibulum feugiat, lacus turpis porttitor tellus, et
          mollis purus est non est. Vestibulum convallis maximus molestie. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Aenean porttitor, nulla vitae ornare pretium,
          tellus massa ullamcorper nisl, et pharetra ante massa quis lorem.
          Pellentesque consequat convallis posuere.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;
