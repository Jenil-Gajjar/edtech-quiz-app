import Cookies from "js-cookie";
export default class CookieService {
  static setAuthCookie(token) {
    const defaultOptions = {
      expires: 1,
    };
    Cookies.set("AuthToken", token, defaultOptions);
  }
  static getAuthCookie() {
    Cookies.get("AuthToken");
  }
  static removeAuthCookie() {
    Cookies.remove("AuthToken");
  }
}
