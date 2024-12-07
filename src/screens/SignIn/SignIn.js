import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { styles } from './SignIn.styles';
import { loginApi } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = ({ navigation }) => {
    const [email, setsEmail] = useState('');
    const [password, setPassword] = useState('')
    useEffect(() => {
        const isLogin = async () => {
            const value = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            if (value !== null && token !== null) {
                setsEmail('')
                setPassword('')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Chats'}],
                  });
            }
        }
        isLogin()
    }, []);

    const goToHomePage = async () => {
        if (!email || !password) {
            Alert.alert(
                'Thông báo',
                'Bạn chưa nhập đủ thông tin',
                [
                    { text: 'OK' }
                ],
            );
        } else {
            let check = await loginApi(email, password)
            if (!check.errCode) {
                // save id user and token in async storage
                await AsyncStorage.setItem('id', check.user.id.toString());
                await AsyncStorage.setItem('token', check.token.accessToken.toString());
                setsEmail('')
                setPassword('')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Chats'}],
                  });
            } else {
                Alert.alert(
                    'Thông báo',
                    check.errMessage,
                    [
                        { text: 'OK' }
                    ],
                );
            }
        }

    }
    const goToSignUp = () => {

        navigation.navigate("SignUp");
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat App</Text>
            <TextInput
                style={styles.textInput}
                placeholder='email'
                value={email}
                onChangeText={(value) => setsEmail(value)} />
            <TextInput
                style={styles.textInput}
                placeholder='password'
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry />
            <TouchableOpacity style={styles.btnSignIn} onPress={goToHomePage}>
                <Text style={styles.titleSignIn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignUp} onPress={goToSignUp} >
                <Text style={styles.titleSignUp}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn