import { jwtDecode } from "jwt-decode";

export default class JwtService {
  static decodeToken(token) {
    const userData = jwtDecode(token);
    return {
      id: userData.nameid,
      role: userData.role,
    };
  }
}
