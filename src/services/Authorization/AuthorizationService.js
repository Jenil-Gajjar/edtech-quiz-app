import CookieService from "../Cookie/CookieService.js";
import JwtService from "../Jwt/JwtService.js";

const AuthService = {
  isAuthenticated() {
    const token = CookieService.getAuthCookie();
    if (!token) return false;
    try {
      const decode = JwtService.decodeToken(token);
      return !!decode.id;
    } catch {
      return false;
    }
  },
  getUserRole() {
    const token = CookieService.getAuthCookie();
    if (!token) return null;
    try {
      const decode = JwtService.decodeToken(token);
      return decode.role;
    } catch {
      return null;
    }
  },
  getUserId() {
    const token = CookieService.getAuthCookie();
    if (!token) return null;
    try {
      const decode = JwtService.decodeToken(token);
      return decode.id;
    } catch {
      return null;
    }
  },
  hasRole(role) {
    return this.getUserRole() === role;
  },
  logout() {
    CookieService.removeAuthCookie();
  },
};

export default AuthService;
