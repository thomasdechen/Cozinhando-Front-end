import "./card.css";
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { useState } from 'react';
import { useEffect } from 'react';
import { ModalCard } from '../../components/create-modal/modal-card';

interface CardProps {
  id: number;
  likes: number;
  title: string;
  image: string;
  category: string;
  recipe: string;
  date?: Date;
  onClick: () => void;
}

export function Card({ id, likes, image, title, category, date, recipe, onClick }: CardProps) {
  const { mutate} = useFoodDataMutate();
  const [localLikes, setLocalLikes] = useState(likes);


  const handleLikeClick = async () => {
    setLocalLikes((prevLikes) => prevLikes + 1);

    await mutate({ id, date, title, image, category, recipe: "", likes: localLikes + 1 });

    // const updatedData = await mutate({ id });
    // setLocalLikes(updatedData.likes);
  };

  const handleCardClick = async () => {
    // handleCardClick();
  };

  useEffect(() => {
    handleCardClick();
  }, []);

  return (
    <div className="card" onClick={() => onClick()}>
      <img src={image} alt={title} />
      <span className="category">{category}</span>
      <h2>{title}</h2>
      <span className="like-system">
        <img className="like-img" src={'src/img/like.png'} alt="like" />{likes}
      </span>
    </div>
  );
}