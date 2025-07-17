import { jwtDecode } from "jwt-decode";

const JwtService = {
  decodeToken(token) {
    const userData = jwtDecode(token);
    return {
      id: userData.nameid,
      role: userData.role,
    };
  },
};

export default JwtService;
