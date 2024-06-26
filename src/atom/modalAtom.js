import { atom } from "recoil";

const modalState = atom({
  key: "modalState",
  default: false,
});

const postIdState = atom({
  key: "postIdState",
  default: "",
});

export { modalState, postIdState };
