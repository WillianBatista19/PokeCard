import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon } from '../types';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: 27 }, (_, i) => axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`))
        );

        const fetchedPokemons = responses.map(response => {
          const pokemon = response.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default, 
            type: pokemon.types[0].type.name,
            strength: pokemon.stats[1].base_stat, 
            defense: pokemon.stats[2].base_stat  
          };
        });

        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error("Erro ao buscar os Pokémons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, loading };
};

export default usePokemons;
