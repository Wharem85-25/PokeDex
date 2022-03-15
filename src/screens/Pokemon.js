import { ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getPokemonDetailsApi } from '../API/pokeApi';
import Header from '../components/PokemonHeader';
import Type from '../components/Type';
import Stats from '../components/Stats';

export default function Pokemon(props) {
	const { route: { params } ,navigation } = props;
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		navigation.setOptions({
			headerRigth: () => null,
			headerLeft: () =>
			<Icon
				name="arrow-left"
				color="#fff"
				size={20}
				style={{ marginLeft: 20}}
				onPress={navigation.goBack}
			/>
		});
	}, [navigation, params])

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
