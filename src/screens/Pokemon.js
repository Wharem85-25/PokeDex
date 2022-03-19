import { ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getPokemonDetailsApi } from '../API/pokeApi';
import Header from '../components/PokemonHeader';
import Type from '../components/Type';
import Stats from '../components/Stats';
import Favorite from '../components/FavoritePokemon';
import useAuth from '../hooks/useAuth';

export default function Pokemon(props) {
	const { route: { params } ,navigation } = props;
	const [pokemon, setPokemon] = useState(null);
	const { auth } = useAuth();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => auth && <Favorite id={pokemon?.id} />,
			headerLeft: () =>
			<Icon
				name="arrow-left"
				color="#fff"
				size={20}
				style={{ marginLeft: 20}}
				onPress={navigation.goBack}
			/>
		});
	}, [navigation, params, pokemon])

	useEffect(() => {
		(async () => {
			try {
				const response = await getPokemonDetailsApi(params.id);
				setPokemon(response);
			} catch (err) {
				navigation.goBack();
			}
		})()
	}, [params]);

	if(!pokemon) return null;

	return (
		<ScrollView>
			<Header
				name={pokemon.name}
				order={pokemon.order}
				image={pokemon.sprites.other["official-artwork"].front_default}
				type={pokemon.types[0].type.name}
			/>
			<Type types={pokemon.types} />
			<Stats stats={pokemon.stats} />
		</ScrollView>
	)
}
