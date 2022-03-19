import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from 'lodash'
import { FAVORITE_STORAGE } from '../utils/constants'

export async function getPokemonFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem('fav7');
		console.log('response', response);
		if (!response){
			return []
		}
		return JSON.parse(response)
  } catch (error) {
    throw error;
  }
}

export async function AddPokemonFavoriteApi(id) {
	try {
		const favorites = await getPokemonFavoriteApi();
		favorites.push(id);
		await AsyncStorage.setItem('fav7', JSON.stringify(favorites));
	} catch (error) {
		throw error;
	}
}

export async function isPokemonFavoriteApi(id) {
	try {
		const response = await getPokemonFavoriteApi();
		return includes(response, id);
	} catch (error) {
		throw error;
	}
}
