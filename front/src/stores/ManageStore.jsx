import { action, makeObservable, observable } from "mobx";

class Manage {
  id;
  username;
  email;
  nickname;
  rank;

  constructor(id, username, email, nickname, rank) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.nickname = nickname;
    this.rank = rank;
  }
}

export class ManageStore {
  rootStore;

  manages = [];

  constructor(root) {
    makeObservable(this, {
      manages: observable,
    });

    this.rootStore = root;

    this.manages = [
      new Manage(1, "a", "aa@aa.aa", "a", "a"),
      new Manage(2, "b", "bb@bb.bb", "b", "b"),
      new Manage(3, "c", "cc@cc.cc", "c", "c"),
    ];
  }
}
