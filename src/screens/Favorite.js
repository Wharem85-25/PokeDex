import React from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { getPokemonFavoriteApi } from '../API/favorite';

export default function Favorite() {
	const checkFav = async () => {
		const response = await getPokemonFavoriteApi();
		console.log(response);
	}

	return (
		<SafeAreaView>
			<Text>Favorite</Text>
			<Button title="Obtener" onPress={checkFav} />
		</SafeAreaView>
	)
}
