import APIConfigs from "../constants/APIConfigs";
import axios from "axios";

export default class DefaultAPI {
  static async GetLocale() {
    const userId = localStorage.getItem("uId");
    const res = await axios.get(
      APIConfigs.GorillaSticker.url + "/locale?userId=" + window.Telegram.WebApp.initDataUnsafe.user.id
    );
    console.log(res);
    localStorage.setItem("locale", ...res.data);
    return res.data;
  }

  static async GetNewStickers(offset, limit) {
    const userId = localStorage.getItem("uId");
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/locale?userId=" +
        APIConfigs.GorillaSticker.defaultUserId +
        "&offset=" +
        offset +
        "&limit=" +
        limit
    );
    localStorage.setItem("locale", ...res.data);
    return res.data;
  }
}
