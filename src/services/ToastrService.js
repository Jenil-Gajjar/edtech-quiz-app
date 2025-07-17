import {
  error,
  info,
  success,
  TOASTR_STORAGE_KEY,
  warning,
} from "../helper/Constants/Constants.js";
import toastr from "../helper/Toast/toastr.js";

export default class ToastrService {
  static setToast(type, message) {
    localStorage.setItem(
      TOASTR_STORAGE_KEY,
      JSON.stringify({
        type,
        message,
      })
    );
  }
  static getToast() {
    return localStorage.getItem(TOASTR_STORAGE_KEY);
  }
  static clearToast() {
    localStorage.removeItem(TOASTR_STORAGE_KEY);
  }
  static displayToast() {
    const toastData = localStorage.getItem(TOASTR_STORAGE_KEY);

    if (toastData) {
      const { type, message } = JSON.parse(toastData);
      switch (type) {
        case success:
          toastr.success(message);
          break;
        case warning:
          toastr.warning(message);
          break;
        case info:
          toastr.info(message);
          break;
        case error:
          toastr.error(message);
          break;
      }
      this.clearToast();
    }
  }
}
