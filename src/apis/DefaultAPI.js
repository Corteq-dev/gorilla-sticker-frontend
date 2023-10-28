import APIConfigs from "../constants/APIConfigs";
import axios from "axios";

export async function GetLocale() {
  return retry(10, async () => {
    const res = await axios.get(
      APIConfigs.GorillaSticker.url + "/locale?userId=" + window.Telegram.WebApp.initDataUnsafe.user.id
    );
    console.log(res);
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
        limit
    );
    console.log(res.data);
    return res.data;
  });
}

function retry(maxRetries, fn) {
  return fn().catch(function (err) {
    if (maxRetries <= 0) {
      throw err;
    }
    console.log(`retry n ${maxRetries}`);
    return setTimeout(() => retry(maxRetries - 1, fn), 250);
  });
}
