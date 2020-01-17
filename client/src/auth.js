import jwt from "jsonwebtoken";
const tokenKey = "token";

// const userTypeA = jwt.decode(localStorage.getItem(tokenKey)).userType || "user";
// const userIdA = jwt.decode(localStorage.getItem(tokenKey))._id || "noId";

const getUserTypeAndId = () => {
  const token = localStorage.getItem(tokenKey);

  if (token) {
    const decodedToken = jwt.decode(token);

    if (
      decodedToken.userRole > -1 &&
      decodedToken.userRole < 3 &&
      decodedToken._id
    ) {
      return { userRole: decodedToken.userRole, userId: decodedToken._id };
    }

    localStorage.removeItem(tokenKey);
    return { userRole: "user", userId: "noId" };
  }

  return { userRole: "user", userId: "noId" };
};

class Auth {
  constructor() {
    this.authenticated = localStorage.getItem(tokenKey) ? true : false;
    this.userType = getUserTypeAndId().userType;
    this.userId = getUserTypeAndId().userId;
  }

  login(token, cb) {
    localStorage.setItem(tokenKey, token);
    this.authenticated = true;
    this.userType = getUserTypeAndId().userType;
    this.userId = getUserTypeAndId().userId;

    cb();
  }

  logout(cb) {
    localStorage.removeItem(tokenKey);
    this.authenticated = false;
    this.userId = "noId";
    this.userType = "user";

    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
