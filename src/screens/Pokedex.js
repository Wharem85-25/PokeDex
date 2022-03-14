import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { getPokemonApi, getPokemonDetailsUrlApi } from '../API/pokeApi';
import PokemonList from '../components/PokemonList';

export default function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [nextUrl, setNextUrl] = useState(null);

	useEffect(() => {
		(async () => {
			await loadPokemons();
		})()
	}, [])

	const loadPokemons = async () => {
		try {
			const response = await getPokemonApi(nextUrl);
			setNextUrl(response.next)

			const pokemonArray = [];
			for await (const pokemon of response.results) {
				const pokemonDetail = await getPokemonDetailsUrlApi(pokemon.url);
				pokemonArray.push({
					id: pokemonDetail.id,
					name: pokemonDetail.name,
					type: pokemonDetail.types[0].type.name,
					order: pokemonDetail.order,
					image: pokemonDetail.sprites.other["official-artwork"].front_default,
				});
			}

			setPokemons([...pokemons, ...pokemonArray]);
		} catch(err) {
			console.error(err)
		}
	}

	return (
		<SafeAreaView>
			<PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} />
		</SafeAreaView>
	)
}
