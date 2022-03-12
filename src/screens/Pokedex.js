import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { getPokemonApi } from '../API/pokeApi'

export default function Pokedex() {
	useEffect(() => {
		(async () => {
			await loadPokemons();
		})()
	}, [])

	const loadPokemons = async () => {
		try {
			const response = await getPokemonApi();
			console.log(response)
		} catch(err) {
			console.error(err)
		}
	}

	return (
		<SafeAreaView>
			<Text>Pokedex</Text>
		</SafeAreaView>
	)
}
