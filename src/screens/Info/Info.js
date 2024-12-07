import { View, Text, FlatList, Image, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './Info.style'
import { Video } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { upload } from 'cloudinary-react-native'
import { Cloudinary } from "@cloudinary/url-gen"
import { editGroup } from '../../services/userService'
import { useData } from '../../context/DataContext'
import colors from '../../contains/colors'
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

const Info = ({ navigation, route }) => {
    const [files, setFiles] = useState([]);
    const { updateData } = useData();
    const [modalVisible, setModalVisible] = useState(false)
    const [img, setImg] = useState(route.params.user.avatar)
    const [name, setName] = useState(route.params.user.nameUser)
    const [val, setVal] = useState('')

    useEffect(() => {
        let imgsvsvideos = route.params.messageList.filter((item) => item.type === "img" || item.type === "video");
        setFiles(imgsvsvideos)
        return () => {

        };
    }, []);

    const renderItem = ({ item }) => {
        if (item.type === 'img') {
            return (
                <Image
                    style={styles.file}
                    source={{ uri: item.content }} />
            )
        } else {
            return (
                <Video
                    source={{ uri: item.content }} // hoặc require('path/to/video.mp4')
                    style={styles.file}
                    resizeMode="cover"
                    useNativeControls // Hiển thị điều khiển video mặc định của thiết bị
                />
            )
        }
    };

    const selectImg = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Permission to access media library was denied.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        }).then(async (result) => {
            if (!result.canceled) {
                await upload(cld, {
                    file: result.assets[0].uri, options: options, callback: async (error, response) => {
                        //updateAvartar
                        await editGroup(route.params.user.id, response.secure_url, 'img').then(async (rs) => {
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
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View>
                    <Image style={styles.avatar} source={{ uri: img }} />
                    {route.params.isOwn && <TouchableOpacity
                        onPress={selectImg}
                        style={styles.changeImg}>
                        <Ionicons size={50} style={styles.changeImg} name="add-circle" />

                    </TouchableOpacity>}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 15 }}>
                    <Text style={styles.text}>{name}</Text>
                    {route.params.isOwn && <Pressable
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    >
                        <Ionicons size={22} style={{ marginLeft: 15, color: colors.blue }} name="create" />
                    </Pressable>}
                </View>
            </View>
            <Text style={styles.imgvd}>Images and Videos: </Text>
            <FlatList
                style={styles.list}
                data={files}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={3} // Số cột trong grid view
                contentContainerStyle={{ flexGrow: 1 }}
            />
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
                            <Text style={{ fontSize: 22, fontWeight: '500', paddingBottom: 15 }}>Change Name</Text>
                            <TextInput
                                onChangeText={(value) => setVal(value)}
                                style={styles.textInput} placeholder='Name Group' />
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.blue }]}
                                onPress={async () => {
                                    // updateDataUser(value)
                                    setModalVisible(!modalVisible)
                                    await editGroup(route.params.user.id, val, 'name').then(async (rs) => {
                                        Alert.alert(
                                            'Thông báo',
                                            rs.errMessage,
                                            [
                                                { text: 'OK' }
                                            ],
                                        );
                                        if (!rs.errCode) {
                                            setName(val)
                                            updateData(val)
                                        }
                                    })

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

export default Info