import APIConfigs from "../constants/APIConfigs";
import axios from "axios";

export default class DefaultAPI {
  static async GetLocale() {
    const userId = localStorage.getItem("uId"); // TODO: Get this from Telegram API
    /*const res = await axios.get(
      APIConfigs.GorillaSticker.url + "/locale?userId=" + APIConfigs.GorillaSticker.defaultUserId
    ); //+ userId);*/
    const res = await fetch(
      APIConfigs.GorillaSticker.url +
        "/locale?userId=" +
        APIConfigs.GorillaSticker.defaultUserId,
    );
    console.log(res);
    localStorage.setItem("locale", ...res.data);
    return res.data;
  }

  static async GetNewStickers(offset, limit) {
    const userId = localStorage.getItem("uId"); // TODO: Get this from Telegram API
    const res = await axios.get(
      APIConfigs.GorillaSticker.url +
        "/locale?userId=" +
        APIConfigs.GorillaSticker.defaultUserId +
        "&offset=" +
        offset +
        "&limit=" +
        limit,
    );
    console.log(res);
    localStorage.setItem("locale", ...res.data);
    return res.data;
  }
}
