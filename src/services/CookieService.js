import Cookies from "js-cookie";
import { JWT_TOKEN_STORAGE_KEY } from "../helper/Constants/Constants.js";
const CookieService = {
  setAuthCookie(token) {
    const defaultOptions = {
      expires: 1,
    };
    Cookies.set(JWT_TOKEN_STORAGE_KEY, token, defaultOptions);
  },
  getAuthCookie() {
    return Cookies.get(JWT_TOKEN_STORAGE_KEY);
  },
  removeAuthCookie() {
    Cookies.remove(JWT_TOKEN_STORAGE_KEY);
  },
};
export default CookieService;
