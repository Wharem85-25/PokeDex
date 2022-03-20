import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { user, userDatails } from "../../utils/userDb";
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
	const [err, setErr] = useState("");
	const { login } = useAuth();


	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		validateOnChange: false,
		onSubmit: (formValue) => {
			const { username, password } = formValue;
			if(username !== user.username || password !== user.password) {
				setErr("usarname or password is incorrect");
			} else {
				login(userDatails)
			}
		}
	})

	return (
		<View>
			<Text style={styles.title} >Log in</Text>
			<TextInput
				placeholder="User name"
				style={styles.input}
				autoCapitalize='none'
				value={formik.values.username}
				onChangeText={(text) => formik.setFieldValue("username", text)}
			/>
			<TextInput
				placeholder="Password"
				style={styles.input}
				autoCapitalize="none"
				secureTextEntry={true}
				value={formik.values.password}
				onChangeText={(text) => formik.setFieldValue("password", text)}
			/>
			<View style={styles.contentButton}>
				<TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
					<Text style={styles.textButton}>Login</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.err} >{formik.errors.username}</Text>
			<Text style={styles.err} >{formik.errors.password}</Text>
			<Text style={styles.err} >{err}</Text>
		</View>
	)
}

function initialValues() {
	return {
		username: "",
		password: "",
	}
}

function validationSchema() {
	return {
		username: Yup.string().required("The user is obligatory"),
		password: Yup.string().required("Password is required").min(5),
	}
}

const styles = StyleSheet.create({
	title: {
		textAlign: "center",
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 50,
		marginBottom: 15,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
	},
	err: {
		textAlign: "center",
		color: "#f00",
		marginTop: 20,
	},
	contentButton: {
		alignItems: "center"
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
