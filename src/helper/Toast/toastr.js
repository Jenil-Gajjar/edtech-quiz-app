import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
const toastr = {
  configureToast(message, background) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      ariaLive: "assertive",
      style: {
        background: background,
      },
    }).showToast();
  },

  success(message) {
    this.configureToast(message, "linear-gradient(to right, #00b09b, #96c93d)");
  },

  info(message) {
    this.configureToast(message, "linear-gradient(to right, #3498db, #2980b9)");
  },

  warning(message) {
    this.configureToast(message, "linear-gradient(to right, #f1c40f, #e67e22)");
  },

  error(message) {
    this.configureToast(message, "linear-gradient(to right, #e74c3c, #c0392b)");
  },
};

export default toastr;
