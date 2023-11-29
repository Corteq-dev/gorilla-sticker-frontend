import APIConfigs from "../constants/APIConfigs";
import axios from "axios";

export async function GetLocale() {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/locale?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id,
    );
    localStorage.setItem("locale", ...res.data);
    return res.data;
  });
}

export async function GetNewStickers(offset = 0, limit = 10) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/stickers/new?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit,
    );

    let sponsoredStickers = [];
    // Adding sponsored stickers
    if (offset == 0) sponsoredStickers = await GetSponsoredStickers();

    // Use this weird constraction to get rid of duplicates
    return Array.from(
      [...sponsoredStickers, ...res.data]
        .reduce((map, stickerSet) => {
          map.set(stickerSet.id, stickerSet);
          return map;
        }, new Map())
        .values(),
    );
  });
}

export async function GetPopularStickers(
  offset = 0,
  limit = 10,
  dateFilter = new Date(),
) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/stickers/popular?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit +
        "&dateFilter=" +
        dateFilter,
    );

    let sponsoredStickers = [];
    // Adding sponsored stickers
    if (offset == 0) sponsoredStickers = await GetSponsoredStickers();

    // Use this weird constraction to get rid of duplicates
    return Array.from(
      [...sponsoredStickers, ...res.data]
        .reduce((map, stickerSet) => {
          map.set(stickerSet.id, stickerSet);
          return map;
        }, new Map())
        .values(),
    );
  });
}

export async function Search(text, offset = 0, limit = 10) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/search?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit +
        "&text=" +
        text,
    );

    let sponsoredStickers = [];
    // Adding sponsored stickers
    if (offset == 0) sponsoredStickers = await GetSponsoredStickers();

    // Use this weird constraction to get rid of duplicates
    return Array.from(
      [...sponsoredStickers, ...res.data]
        .reduce((map, stickerSet) => {
          map.set(stickerSet.id, stickerSet);
          return map;
        }, new Map())
        .values(),
    );
  });
}

export async function SendActionData(actions) {
  await axios.post(
    APIConfigs.GorillaSticker.url + "/sendActionData",
    {
      userId: window.Telegram.WebApp.initDataUnsafe.user.id,
      actionDataList: actions,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function GetDetailedStickerSet(stickerSetId) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/stickerSet?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&stickerId=" +
        stickerSetId,
    );
    return res.data;
  });
}

export async function GetSimilarStickers(
  customName,
  description,
  offset = 0,
  limit = 10,
) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/similarStickers?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit +
        "&customName=" +
        encodeURIComponent(customName) +
        "&description=" +
        encodeURIComponent(description),
    );

    let sponsoredStickers = [];
    // Adding sponsored stickers
    if (offset == 0) sponsoredStickers = await GetSponsoredStickers();

    // Use this weird constraction to get rid of duplicates
    return Array.from(
      [...sponsoredStickers, ...res.data]
        .reduce((map, stickerSet) => {
          map.set(stickerSet.id, stickerSet);
          return map;
        }, new Map())
        .values(),
    );
  });
}

export async function GetSponsoredStickers() {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/stickers/sponsored?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id,
    );
    return res.data;
  });
}

export async function GetUserFavouriteStickers(offset = 0, limit = 10) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/userFavorites?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit,
    );
    return MakeUnique(res.data);
  });
}

export async function GetUserStickers(offset = 0, limit = 10) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/userStickers?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit,
    );
    return MakeUnique(res.data);
  });
}

function MakeUnique(array) {
  return Array.from(
    array
      .reduce((map, stickerSet) => {
        map.set(stickerSet.id, stickerSet);
        return map;
      }, new Map())
      .values(),
  );
}

function retry(maxRetries, fn) {
  return fn().catch(function (err) {
    if (maxRetries <= 0) {
      throw err;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(retry(maxRetries - 1, fn));
      }, 250);
    });
  });
}
