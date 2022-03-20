import React, { useState, useCallback } from 'react'
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonFavoriteApi } from '../API/favorite';
import {getPokemonDetailsApi } from '../API/pokeApi';
import useAuth from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import NoLogin from '../components/NoLogin';

export default function Favorite() {
	const [pokemons, setPokemons] = useState([]);
	const { auth } = useAuth();

	useFocusEffect(
		useCallback(() => {
			if(auth) {
				(async () => {
					const response = await getPokemonFavoriteApi();
					const pokemonArray = [];
					for await (const id of response) {
						const pokemonDetail = await getPokemonDetailsApi(id);
						pokemonArray.push({
							id: pokemonDetail.id,
							name: pokemonDetail.name,
							type: pokemonDetail.types[0].type.name,
							order: pokemonDetail.order,
							image: pokemonDetail.sprites.other["official-artwork"].front_default,
						});
					}

					setPokemons(pokemonArray);
				})();
			}
		}, [auth])
	)

	return (
		!auth ? (
			<NoLogin />
		) : (
			<PokemonList pokemons={pokemons} />
		)
	);
}
