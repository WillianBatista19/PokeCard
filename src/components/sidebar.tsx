import React from 'react';
import { Pokemon } from '../types';

interface SidebarProps {
  favorites: Pokemon[];
  onClick: (pokemon: Pokemon) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ favorites, onClick }) => {
  return (
    <div className="w-64 h-full p-4 bg-gray-200">
      <h2 className="text-xl font-bold">Favoritos</h2>
      <ul>
        {favorites.map(pokemon => (
          <li
            key={pokemon.id}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => onClick(pokemon)}
          >
            <img src={pokemon.image} alt={pokemon.name} className="object-cover w-12 h-12 mr-2 rounded-full" />
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
