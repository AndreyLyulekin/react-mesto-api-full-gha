import { Api } from "./Api";
import { apiCredentials } from "../utils/consts";

class UserService extends Api {
  constructor() {
    super(apiCredentials);
  }

  getCurrentUser() {
    return this.get("/users/me").then((response) => {
      return response;
    });
  }

  updateUserInfo(userInfo) {
    return super.patch("/users/me", userInfo);
  }

  changeAvatar(avatarData) {
    return super.patch("/users/me/avatar", avatarData);
  }
}

export const userService = new UserService(apiCredentials);
