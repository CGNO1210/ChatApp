import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './SignUp.styles';
import { signUpApi } from '../../services/userService';
import { images } from '../../images/index';
import colors from '../../contains/colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen"
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dsvacsceu'
  },
  url: {
    secure: true
  }
});
const options = {
  upload_preset: 'q1t0suek',
  unsigned: true,
}

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg');
  const [nameUser, setNameUser] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const selectImg = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access media library was denied.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    }).then(async (result) => {
      if (!result.canceled) {
        setResult(result.assets[0].uri);

      }
    }).catch(err => console.log(err))
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const goToSignIn = async () => {
    if (!email || !nameUser || !password || !cfPassword) {
      Alert.alert(
        'Thông báo',
        'Bạn chưa nhập đủ thông tin',
        [
          { text: 'OK' }
        ],
      );
    } else {
      if (isEmailValid(email) === false) {
        Alert.alert(
          'Thông báo',
          'Email format is not correct',
          [
            { text: 'OK' }
          ],
        );
      } else {
        if (password !== cfPassword) {
          Alert.alert(
            'Thông báo',
            'Mật khẩu không khớp',
            [
              { text: 'OK' }
            ],
          );
        } else {
          if (result === '') {

            let rs = await signUpApi(nameUser, email, password)
            if (rs.errCode === 0) {
              setNameUser('')
              setEmail('')
              setPassword('')
              setCfPassword('')
              setResult('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg')
              navigation.navigate("SignIn");
            } else {
              Alert.alert(
                'Thông báo',
                rs.errMessage,
                [
                  { text: 'OK' }
                ],
              );
            }
          } else {
            await upload(cld, {
              file: result, options: options, callback: async (error, response) => {
                //updateAvartar response.secure_url
                let rs = await signUpApi({ nameUser, email, password, img: response.secure_url });
                if (rs.errCode === 0) {
                  Alert.alert(
                    'Thông báo',
                    'tạo tài khoản thành công',
                    [
                      { text: 'OK' }
                    ],
                  );
                  setNameUser('')
                  setEmail('')
                  setPassword('')
                  setCfPassword('')
                  setResult('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg')
                  navigation.navigate("SignIn");
                } else {
                  Alert.alert(
                    'Thông báo',
                    rs.errMessage,
                    [
                      { text: 'OK' }
                    ],
                  );
                }
              }
            })
          }

        }
      }
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.img}>
          <Image style={{
            width: 120,
            height: 120,
            borderRadius: 120,
            borderWidth: 1,
            borderColor: colors.gray03
          }} source={{ uri: result } || images.avatar} />
          <TouchableOpacity onPress={selectImg} style={styles.changeImg}>
            <Ionicons size={50} style={styles.changeImg} name="add-circle" />

          </TouchableOpacity>

        </View>

      </View>
      <Text style={styles.title}>Create new  account</Text>
      <TextInput
        style={styles.textInput}
        placeholder='name'
        value={nameUser}
        onChangeText={(value) => setNameUser(value)} />
      <TextInput
        style={styles.textInput}
        placeholder='email'
        value={email}
        onChangeText={(value) => setEmail(value)} />
      <TextInput
        style={styles.textInput}
        placeholder='password'
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry />
      <TextInput
        style={styles.textInput}
        placeholder='confirm password'
        value={cfPassword}
        onChangeText={(value) => setCfPassword(value)}
        secureTextEntry />
      <TouchableOpacity style={styles.btnSignUp} onPress={goToSignIn} >
        <Text style={styles.titleSignUp}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp