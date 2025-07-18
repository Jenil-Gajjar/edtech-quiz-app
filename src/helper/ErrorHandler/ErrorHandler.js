export function ErrorHandler(id, message) {
  document.getElementById(id).innerText = message;
}

export function ValidationHandler(id, message, regex, event) {
  if (!regex.test(event.target.value)) {
    ErrorHandler(id, message);
  } else {
    ErrorHandler(id, null);
  }
}
