import React, { useState, useEffect} from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AddPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi } from '../API/favorite';

export default function FavoritePokemon(props) {
	const { id } = props;
	const [favorite, setFavorite] = useState(undefined);
	const [reload, setReload] = useState(false);
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
	}, [id, reload]);

	const onReloadCheckFavorite = () => {
		setReload(prev => !prev);
	}

	const addFavorite = async () => {
		try {
			await AddPokemonFavoriteApi(id)
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
	};

	const removeFavorite = async () => {
		try {
			await removePokemonFavoriteApi(id);
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
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

