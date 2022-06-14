import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50rem;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 5rem;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 2.5rem 0;
`

const SelectOptions = styled.select`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2.5rem;
`

function ToDoList() {
  const rawToDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const allCategories = useRecoilValue(categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(rawToDos));
    localStorage.setItem("categories", JSON.stringify(allCategories));
  }, [rawToDos, categories]);

  return (
    <Container>
      <Title>To Dos</Title>
      <Line />
      <SelectOptions value={category} onInput={onInput}>
        {/* <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option> */}
        {allCategories.map((eachCategory:string, index:number) => {
          return <option key={index} value={eachCategory}>{eachCategory}</option>;
        })}
      </SelectOptions>
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((aToDo) => (
        <ToDo key={aToDo.id} {...aToDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
