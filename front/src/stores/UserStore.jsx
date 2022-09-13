import { action, makeObservable, observable } from "mobx";

class User {
  id;
  nickname;
  src_photo;
  rank;

  constructor({ id, nickname, src_photo, rank }) {
    this.id = id;
    this.nickname = nickname;
    this.src_photo = src_photo;
    this.rank = rank;
  }
}

export class UserStore {
  rootStore;

  user = {};

  constructor(root) {
    makeObservable(this, {
      user: observable,
      login: action,
      logout: action,
    });

    this.rootStore = root;

    this.user = {};
  }

  login({ id, nickname, src_photo, rank }) {
    this.user = new User({ id, nickname, src_photo, rank });
    console.log(this.user);
  }

  logout() {
    this.user = {};
    console.log(this.user);
  }
}

// import { observable } from "mobx";

// const UserStore = observable({
//   id: 0,
//   nickname: "",
//   src_photo: "",
//   rank: "",

//   login({ id, nickname, src_photo, rank }) {
//     this.id = id;
//     this.nickname = nickname;
//     this.src_photo = src_photo;
//     this.rank = rank;
//     console.log(this.id);
//     console.log(this.nickname);
//     console.log(this.src_photo);
//     console.log(this.rank);
//   },

//   logout() {
//     this.id = 0;
//     this.nickname = "";
//     this.src_photo = "";
//     this.rank = "";
//     console.log(this.id);
//     console.log(this.nickname);
//     console.log(this.src_photo);
//     console.log(this.rank);
//   },
// });

// export default UserStore;
