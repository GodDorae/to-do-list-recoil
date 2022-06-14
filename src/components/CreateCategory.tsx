import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categories, categoryState } from "../atoms";
import styled from "styled-components";

const Button = styled.button`
  margin-left: 1rem;
  cursor: pointer;
`

interface IForm {
    newCategory: string;
}

function CreateCategory() {
    const addCategories = useSetRecoilState(categories);
    const setCategory = useSetRecoilState(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ newCategory }: IForm) => {
        addCategories((prevCategories: any) => [...prevCategories, newCategory]);
        setCategory((prevCategory) => newCategory);
        setValue("newCategory", "");
    };
    return (
      <form onSubmit={handleSubmit(handleValid)}>
        <input 
            {...register("newCategory", {
          required: "Please write a new category",
        })}
        placeholder="Write a new category"/>
        <Button>Add</Button>
      </form>
    )
}

export default CreateCategory;