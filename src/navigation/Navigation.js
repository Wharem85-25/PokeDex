import React from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountNavigation from '../navigation/AccountNavigation';
import FavoriteNavigation from '../navigation/FavoriteNavigation';
import PokedexNavigation from '../navigation/PokedexNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Favorite" component={FavoriteNavigation} options={{
				tabBarLabel: "Favorite",
				tabBarIcon: ({color, size}) => {
					return (
						<Icon name="heart" color={color} size={size} />
					)
				}
			}} />
			<Tab.Screen name="Pokedex" component={PokedexNavigation} options={{
				tabBarLabel: "",
				tabBarIcon: () => renderPokeball()
			}} />
			<Tab.Screen name="Account" component={AccountNavigation} options={{
				tabBarLabel: "My account",
				tabBarIcon: ({color, size}) => {
					return (
						<Icon name="user" color={color} size={size} />
					)
				} }} />
		</Tab.Navigator>
	)
}

function renderPokeball() {
	return(
		<Image
			source={require('../assets/img/pokeball.png')}
			style={{ width: 75, height: 75, top: -10}}
		/>
	)
}
