import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';


import "./modal.css";


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}  


interface ModalProps {
    closeModal(): void
}


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label> {/* Título do input */}
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}


export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState(""); // Hook do React para manipulação de estados
    const [image, setImage] = useState(""); // useState re-renderiza o html quando um valor é alterado
    const [category, setCategory] = useState("");
    const [recipe, setRecipe] = useState("");
    const [likes, setLikes] = useState(0);
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();
  
    const submit = async () => {
      const foodData: FoodData = {
        title,
        category,
        image,
        recipe,
        likes
      };
  
      await mutate(foodData);
    };
  
    useEffect(() => {
      if (isSuccess) {
        closeModal();
      }
    }, [isSuccess, closeModal]);
  
    return (
      <div className="modal-overlay">
        <div className="modal-body">
          <h2>Poste uma nova receita</h2>
          <form className="input-container">
            <Input label="Nome" value={title} updateValue={setTitle} />
            <Input label="Categoria" value={category} updateValue={setCategory} />
            <Input label="Imagem" value={image} updateValue={setImage} />
            <Input label="Likes" value={likes} updateValue={setLikes} />
            <Input label="Receita" value={recipe} updateValue={setRecipe} />
          </form>
          <button onClick={submit} className="btn-secondary">
            {isLoading ? 'postando...' : 'postar'}
          </button>
        </div>
      </div>
    );
  }
  