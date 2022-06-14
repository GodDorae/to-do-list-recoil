import { atom, selector } from "recoil";

// export enum Categories {
//     "TO_DO" = "TO_DO",
//     "DOING" = "DOING",
//     "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  category: string;
  id: number;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

let categoryOutput = localStorage.getItem("categories");
let localCategoryData = JSON.parse(categoryOutput as any);

export const categories = atom({
  key: "categories",
  default: localCategoryData || ["TO_DO", "DOING", "DONE"],
});

let toDoOutput = localStorage.getItem("toDos");
let localToDoData = JSON.parse(toDoOutput as any);

export const toDoState = atom<IToDo[]>({ key: "toDo", default: localToDoData || [] });

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
