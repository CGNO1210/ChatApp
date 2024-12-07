import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles } from './UserListing.styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { images } from '../../../images/index';
import color from '../../../contains/colors';
import { getAllUser } from '../../../services/userService';
import moment from 'moment';
import { useData } from '../../../context/DataContext';
import { AppContext } from '../../../context/AppContext';
import { upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen"
import * as ImagePicker from 'expo-image-picker';
import { createMessage } from '../../../services/messageService';

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dsvacsceu'
    },
    url: {
        secure: true
    },

});
const options = {
    upload_preset: 'q1t0suek',
    unsigned: true,
}



export default function UserListing(props) {
    const [data, setData] = useState([]);
    const { socket, users } = useContext(AppContext);
    const updata = useData();

    const selectCamera = async (idReceive, socketId, isGroup, isOnline) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Permission to access media library was denied.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 0.5,
        }).then((result) => {
            if (!result.canceled) {
                upload(cld, {
                    file: result.assets[0].uri, options: options, callback: async (error, response) => {
                        if (error) {
                            console.log('lỗi:', error);
                        } else {
                            await createMessage(users.id, idReceive, isGroup, response.secure_url, 'img').then(
                                (rs) => {
                                    console.log(rs)
                                    updata.updateData(rs)
                                    if (!isGroup) {
                                        if (isOnline) {
                                            socket.emit('send message', { idSend: users.id, idReceive, isGroup, message: response.secure_url, type: 'img', socketId })
                                        }
                                    } else {
                                        socket.emit('send message', { room: idReceive, idSend: users.id, idReceive, isGroup, message: response.secure_url, type: 'img', socketId })
                                    }

                                }
                            )
                        }
                    }
                })
                return result
            }
        }).catch(err => console.log(err))
    };

    const detailChat = (id, isGroup, socketId) => {
        props.navigation.navigate('DetailChat', { id, isGroup, socketId })
    }
    useEffect(() => {
        const getData = async () => {
            await getAllUser().then(
                (data) => {
                    setData(data.users)
                }
            )
        }
        getData()
        
    }, [updata.data]);
    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight style={styles.user}
                underlayColor={color.gray03}
                onPress={() => detailChat(item.id, item.isGroup, item.socketId)}>
                <View style={styles.userItemContainer}>
                    {item.avatar && <View>
                        <Image
                            source={{ uri: item.avatar } || images.avatar}
                            resizeMode='cover'
                            style={styles.userIcon} />
                    </View>}
                    <View style={styles.userDetailsSectionContainer}>
                        <View>
                            <Text style={styles.nameLabel}>{item.nameUser}</Text>
                            {item.lastMessages && <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.lastMessageLabel}>{item.lastMessages && item.nameSend + ':'}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.lastMessageLabel, { maxWidth: 100 }]}>{item.lastMessages && ` ${item.lastMessages} · `}</Text>
                                <Text style={styles.lastMessageLabel}>{item.lastMessages && moment(item.lastMessagesTime).format('HH:mm DD-MM-YYYY')}</Text>
                            </View>}
                        </View>
                        {!!item.isOnline && <Image source={images.online} />}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <View style={styles.itemRowWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        let socketId = data.item.socketId || ''
                        let isOnline = data.item.isOnline || 0
                        let idReceive = data.item.id
                        let isGroup = data.item.isGroup
                        selectCamera(idReceive, socketId, isGroup, isOnline)
                    }}>
                    <Image style={styles.itemRowIcon} source={images.camera} />
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <View style={{ marginBottom: 60 }}>
            <SwipeListView
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => { return `${item.id}${item.isGroup ? 'group' : 'user'}` }}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={70}
            />
        </View>
    )
}