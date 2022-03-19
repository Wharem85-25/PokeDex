import React, { useState, useEffect} from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AddPokemonFavoriteApi, isPokemonFavoriteApi } from '../API/favorite';

export default function FavoritePokemon(props) {
	const { id } = props;
	const [favorite, setFavorite] = useState(undefined);
	const Icon = favorite ? FontAwesome : FontAwesome5;

	useEffect(() => {
		(async () => {
			try {
				const response = await isPokemonFavoriteApi(id);
				setFavorite(response);
			} catch (error) {
				setFavorite(false);
			}
		})();
	}, [id])

	const addFavorite = async () => {
		await AddPokemonFavoriteApi(id)
	};

	const removeFavorite = () => {
		console.log("eliminar de favorites");
	}

	return (
		<Icon
			name="heart"
			color="#fff"
			size={20}
			onPress={favorite ? removeFavorite : addFavorite}
			style={{ marginRight: 20 }}
		/>
	)
}

