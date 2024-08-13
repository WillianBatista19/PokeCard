import React from 'react';
import { Card } from './components/card';
import { Sidebar } from './components/sidebar';
import usePokemons from './hooks/usePokemons';
import { Pokemon } from './types';

const App: React.FC = () => {
  const { pokemons, loading } = usePokemons();
  const [favorites, setFavorites] = React.useState<Pokemon[]>([]);
  const [hoveredPokemon, setHoveredPokemon] = React.useState<Pokemon | null>(null);
  const [showExpandedCard, setShowExpandedCard] = React.useState<boolean>(false);

  const handleFavorite = (id: number) => {
    const pokemon = pokemons.find(p => p.id === id);
    if (pokemon) {
      setFavorites(prev => {
        if (prev.some(fav => fav.id === id)) {
          return prev.filter(fav => fav.id !== id);
        } else {
          return [...prev, pokemon];
        }
      });
    }
  };

  const handleHover = (pokemon: Pokemon | null) => {
    setHoveredPokemon(pokemon);
  };

  const handleCardClick = (pokemon: Pokemon | null) => {
    setHoveredPokemon(pokemon);
    setShowExpandedCard(true);
  };

  const handleCloseCard = () => {
    setShowExpandedCard(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <div className="grid flex-grow grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {pokemons.map(pokemon => (
          <Card
            key={pokemon.id}
            {...pokemon}
            onFavorite={handleFavorite}
            isFavorited={favorites.some(fav => fav.id === pokemon.id)}
            onMouseEnter={() => handleHover(pokemon)}
            onMouseLeave={() => handleHover(null)}
          />
        ))}
      </div>
      <Sidebar 
        favorites={favorites}
        onClick={(pokemon) => handleCardClick(pokemon)}
      />
      {showExpandedCard && hoveredPokemon && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseCard}
        >
          <div className="p-8 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Card
              {...hoveredPokemon}
              onFavorite={handleFavorite}
              isFavorited={true}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
