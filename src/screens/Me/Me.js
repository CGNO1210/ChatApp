import { View, TextInput, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Pressable, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { styles } from './Me.style';
import { images } from '../../images/index';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../contains/colors';
import { AppContext } from '../../context/AppContext';
import { upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen"
import { editUser } from '../../services/userService';
import * as ImagePicker from 'expo-image-picker';
import { useData } from '../../context/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Me = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { socket, users } = useContext(AppContext)
  const { updateData } = useData();
  const [img, setImg] = useState(users.avatar);
  const [name, setName] = useState(users.nameUser);
  const [email, setEmail] = useState(users.email);
  const [isName, setIsName] = useState(true);
  const [value, setValue] = useState('');

  const logout = async () => {
    await AsyncStorage.removeItem("id")
    await AsyncStorage.removeItem("token")
    socket.disconnect()
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  }
  const updateDataUser = async (value) => {
    if (value) {
      if (isName) {
        await editUser(value, 'name').then(rs => {
          setName(value)
          Alert.alert(
            'Thông báo',
            rs.errMessage,
            [
              { text: 'OK' }
            ],
          );
        })
      } else {
        await editUser(value, 'email').then(rs => {
          Alert.alert(
            'Thông báo',
            rs.errMessage,
            [
              { text: 'OK' }
            ],
          );
          if (!rs.errCode) {
            setEmail(value)
          }
        })
      }
    }
  }
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
        await upload(cld, {
          file: result.assets[0].uri, options: options, callback: async (error, response) => {
            //updateAvartar
            await editUser(response.secure_url, 'img').then(async (rs) => {
              Alert.alert(
                'Thông báo',
                rs.errMessage,
                [
                  { text: 'OK' }
                ],
              );
              if (!rs.errCode) {
                setImg(response.secure_url)
                updateData(response.secure_url)
              }
            })
          }
        })
        return result
      }
    }).catch(err => console.log(err))
  };


  useEffect(() => {
    return () => {
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.img}>
          <Image style={{
            width: 160,
            height: 160,
            borderRadius: 160,
            borderWidth: 1,
            borderColor: colors.gray03
          }} source={{ uri: img } || images.avatar} />
          <TouchableOpacity
            onPress={selectImg}
            style={styles.changeImg}>
            <Ionicons size={50} style={styles.changeImg} name="add-circle" />

          </TouchableOpacity>

        </View>

      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setIsName(true)
            setModalVisible(true)
          }}
          style={styles.option}>
          <Ionicons style={{ color: colors.blue }} size={36} name="person-circle" />
          <Text style={styles.textStyle}>
            {name}
          </Text>
          <View style={styles.change}>
            <Text style={{ color: colors.blue, fontWeight: '300' }}>Change</Text>
            <Ionicons style={styles.icon} name="chevron-forward" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
            setIsName(false)
          }}
          style={styles.option}>
          <Ionicons style={{ color: colors.blue }} size={36} name="mail" />
          <Text style={styles.textStyle}>{email}</Text>
          <View style={styles.change}>
            <Text style={{ color: colors.blue, fontWeight: '300' }}>Change</Text>
            <Ionicons style={styles.icon} name="chevron-forward" />
          </View>
        </TouchableOpacity>

      </View>
      <View style={[styles.option, { flex: 1, borderWidth: 0 }]}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: 'red' }}>Log Out</Text>
        <TouchableOpacity
          onPress={logout}>
          <Ionicons style={[styles.icon, styles.logOutIcon]} name="log-out-outline" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => {
          setModalVisible(false);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 22, fontWeight: '500', paddingBottom: 15 }}>{isName ? 'Change Name' : ' Change Email'}</Text>
              <TextInput
                onChangeText={(value) => setValue(value)}
                style={styles.textInput} placeholder={isName ? 'Name' : 'Email'} />
              <Pressable
                style={[styles.button, { backgroundColor: colors.blue }]}
                onPress={() => {
                  updateDataUser(value)
                  setModalVisible(!modalVisible)
                }}>
                <Text style={{ color: colors.white }}>Change</Text>
              </Pressable>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>

  )
}

export default Me