import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Pokemon } from '../types';

interface CardProps extends Pokemon {
  onFavorite: (id: number) => void;
  isFavorited: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  image,
  type,
  strength,
  defense,
  onFavorite,
  isFavorited,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      className="relative p-4 transition-transform duration-300 border rounded-lg shadow-md cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={image} alt={name} className="object-cover w-full h-32 rounded-lg" />
      <h2 className="mt-2 text-xl font-bold">{name}</h2>
      <p>Type: {type}</p>
      <p>Strength: {strength}</p>
      <p>Defense: {defense}</p>
      <button
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(id);
        }}
      >
        {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    </div>
  );
};
