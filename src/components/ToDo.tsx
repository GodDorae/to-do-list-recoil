import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
        const newToDo = { text, category: name as any, id };
        const frontPart = oldToDos.slice(0, targetIndex);
        const backPart = oldToDos.slice(targetIndex + 1);
        const newToDos = [...frontPart, newToDo, ...backPart];
        return newToDos;
    });
  };

  const deleteToDo = (id: number) => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  }

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={() => deleteToDo(id)}>Delete</button>
    </li>
  );
}

export default ToDo;
