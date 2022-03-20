import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NoLogin() {
 const navigation = useNavigation();

	return (
		<View style={styles.content}>
			<Text style={styles.text} >To add your favorite pokemon and have them saved register and login</Text>
			<View style={styles.contentImage}>
				<Image style={styles.image} source={require('../assets/img/login.png')} />
			</View>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Account")}>
				<Text style={styles.textButton}>Login</Text>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
 content: {
	 marginVertical: 140,
	 paddingHorizontal: 20,
	 alignItems: "center"
 },
 text: {
		textAlign: "center",
		marginTop: 10,
		backgroundColor: "#E0E0E0",
		borderRadius: 10,
		fontSize: 20,
		fontWeight: "bold"
	},
 	image: {
		width: 100,
		height: 100,
 	},
 	contentImage: {
		paddingTop: 50,
		alignItems: "center",
		paddingBottom: 50,
 	},
 	button: {
		backgroundColor: "#7C04B8",
  	borderRadius: 20,
  	width: 250,
  	height: 50,
		paddingHorizontal: 30,
  	paddingVertical: 5,
		alignItems: "center"
 	},
 	textButton: {
		fontSize: 30,
  	fontWeight: '400',
  	color: "#fff",
	}
})
