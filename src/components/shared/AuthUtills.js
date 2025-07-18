import { Admin, User } from "../../helper/Constants/Constants.js";

export default function RedirectBasedOnRole(role) {
  if (role === Admin) return window.location.replace("/admin/dashboard");
  if (role === User) return window.location.replace("/user/dashboard");
  return window.location.replace("/sign-in");
}
