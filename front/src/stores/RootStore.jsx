import { UserStore } from "./UserStore";

export class RootStore {
  userStore;

  constructor() {
    this.userStore = new UserStore(this);
  }
}
