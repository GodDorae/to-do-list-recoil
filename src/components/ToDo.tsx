import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState, categories } from "../atoms";
import styled from "styled-components";

const List = styled.li`
  margin: 1.5rem auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`

const Button = styled.button`
  margin-left: 1rem;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
`;

const DeleteButton = styled.button`
  display: block;
  margin-top: 1rem;
  width: 100%;
  margin: 0 auto;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const allCategories = useRecoilValue(categories);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, category: name as any, id };
      const frontPart = oldToDos.slice(0, targetIndex);
      const backPart = oldToDos.slice(targetIndex + 1);
      const newToDos = [...frontPart, newToDo, ...backPart];
      return newToDos;
    });
  };

  const deleteToDo = (id: number) => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <List>
      <span>{text}</span>
      <Buttons>
        {allCategories
          .filter((each: string) => each !== category)
          .map((each: string) => {
            return (
              <Button name={each} onClick={onClick}>
                {each}
              </Button>
            );
          })}
      </Buttons>
      {/* {category !== Categories.TO_DO && (
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
      )} */}
      <DeleteButton onClick={() => deleteToDo(id)}>Delete</DeleteButton>
    </List>
  );
}

export default ToDo;
