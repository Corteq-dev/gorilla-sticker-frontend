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
    return res.data;
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
    return res.data;
  });
}

export async function GetStickerDetails(stickerSetId) {
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
    return res.data;
  });
}
export async function Search(text, offset = 0, limit = 10) {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/stickers/new?userId=" +
        window.Telegram.WebApp.initDataUnsafe.user.id +
        "&offset=" +
        offset +
        "&limit=" +
        limit +
        "&text=" +
        text,
    );
    return res.data;
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
