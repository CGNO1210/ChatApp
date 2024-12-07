import { View, Image, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles } from './DetailChat.styles';
import { Ionicons } from '@expo/vector-icons'
import { images } from '../../images/index'
import * as ImagePicker from 'expo-image-picker';
import Message from './Message/Message';
import { getUserById } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessageByUser1AndUser2, getMessageByGroup, createMessage, uploadVideo } from '../../services/messageService';
import { upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen"
import { AppContext } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { getGroupById } from '../../services/groupService';
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


const DetailChat = ({ navigation, route }) => {
    const { socket, users } = useContext(AppContext);
    const { data, updateData } = useData();
    const [user, setUser] = useState(route.params.id)
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const [isOnline, setIsOnline] = useState('')
    const [socketId, setSocketId] = useState(route.params.socketId)
    const [isOwn, setIsOnw] = useState(false)

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
                if (result.assets[0].type === "image") {
                    upload(cld, {
                        file: result.assets[0].uri, options: options, callback: (error, response) => {
                            if (error) {
                                console.log('lỗi:', error);
                            } else {
                                console.log('khong loi', response);
                                handleSendMessage(response.secure_url, 'img')
                            }
                        }
                    })
                    return result
                }
                if (result.assets[0].type === 'video') {
                    const formData = new FormData()
                    formData.append('video', {
                        uri: result.assets[0].uri,
                        type: 'video/mp4', // Loại video
                        name: 'video.mp4', // Tên của file trên máy chủ
                    });
                    await uploadVideo(formData).then((res) => {
                        handleSendMessage(res.video, 'video')
                    }).catch(err => console.log(err))
                }
            }
        }).catch(err => console.log(err))
    };
    const selectCamera = async () => {
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
                // handleSendMessage(result, 'img')
                upload(cld, {
                    file: result.assets[0].uri, options: options, callback: (error, response) => {
                        if (error) {
                            console.log('lỗi:', error);
                        } else {
                            console.log('khong loi', response);
                            handleSendMessage(response.secure_url, 'img')
                        }
                    }
                })
                return result
            }
        }).catch(err => console.log(err))
    };
    const selectRecord = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Permission to access media library was denied.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 0.2,
        }).then(async (result) => {
            if (!result.canceled) {
                // handleSendMessage(result, 'img')
                const formData = new FormData()
                formData.append('video', {
                    uri: result.assets[0].uri,
                    type: 'video/mp4', // Loại video
                    name: 'video.mp4', // Tên của file trên máy chủ
                });
                await uploadVideo(formData).then((res) => {
                    console.log(res);
                    handleSendMessage(res.video, 'video')
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    };

    const handleSendMessage = async (message, type) => {
        if (!!message && message !== '\n') {
            let newMessage
            let idSend = await AsyncStorage.getItem("id")
            let idReceive = route.params.id
            let isGroup = route.params.isGroup
            switch (type) {
                case 'text':
                    newMessage = {
                        method: 'send',
                        content: message,
                        type
                    }
                    setMessageList([newMessage, ...messageList]);
                    setMessage('')
                    //save to db
                    await createMessage(idSend, idReceive, isGroup, message, type).then(
                        data => {
                            console.log(data)
                            if (!isGroup) {
                                if (isOnline) {
                                    socket.emit('send message', { idSend, idReceive, isGroup, message, type, socketId })
                                }
                            } else {
                                socket.emit('send message', { room: route.params.id, idSend, idReceive, isGroup, message, type, socketId })
                            }
                        }
                    )
                    break;
                case 'video':
                case 'img':
                    newMessage = {
                        method: 'send',
                        content: message,
                        type
                    }
                    setMessageList([newMessage, ...messageList]);
                    await createMessage(idSend, idReceive, isGroup, message, type).then(
                        (rs) => {
                            console.log(rs)
                            if (!isGroup) {
                                if (isOnline) {
                                    socket.emit('send message', { idSend, idReceive, isGroup, message, type, socketId })
                                }
                            } else {
                                socket.emit('send message', { room: route.params.id, idSend, idReceive, isGroup, message, type, socketId })
                            }
                        }
                    )
                    break;
                default:
                    break;
            }
            updateData(newMessage)
        }
    }
    const goInfo = () => {
        navigation.navigate("Info", { user: user, messageList, isGroup: route.params.isGroup, isOwn })
    }
    useEffect(() => {
        //socket
        //call api get info user or group by id
        const getUser = async () => {
            if (!route.params.isGroup) {
                await getUserById(route.params.id).then(
                    (data) => {
                        setUser(data.users);
                        setIsOnline(data.users.isOnline)
                        if (data.users.isOnline) {
                            setSocketId(data.users.socketId)
                        } else {
                            setSocketId('')
                        }
                    }
                )
            } else {
                await getGroupById(route.params.id).then((data) => {
                    setUser(data.group);
                    setSocketId(route.params.id)
                    setIsOnw(data.group.ownGroup === users.id)
                })
            }
        }
        const getMessage = async () => {
            if (!route.params.isGroup) {
                let id1 = await AsyncStorage.getItem('id')
                let id2 = route.params.id
                let messages = await getMessageByUser1AndUser2(id1, id2)

                let data = messages.messages.map((item) => {
                    if (item.idSend == id1) {
                        item.method = 'send'
                        return item
                    } else {
                        item.method = 'receive'
                        return item
                    }
                })
                setMessageList(data)
            } else {
                let id1 = await AsyncStorage.getItem('id')
                let messagesGroup = await getMessageByGroup(route.params.id)
                let data = messagesGroup.messages.map((item) => {
                    if (item.idSend == id1) {
                        item.method = 'send'
                        return item
                    } else {
                        item.method = 'receive'
                        return item
                    }
                })
                setMessageList(data)
            }
        }
        getMessage()
        getUser();
        //socket
        if (route.params.isGroup) {
            socket.emit('joinRoom', route.params.id)
        }
        socket.on('online', (data) => { updateData(data) })
        socket.on('receive message', ({ idSend, idReceive, isGroup, message, type }) => {
            console.log('du lieu nhan duoc', idSend, idReceive, isGroup, message, type)
            updateData({ idSend, idReceive, isGroup, message, type })
            let idSendCrr = route.params.id
            if (idSend == idSendCrr && !isGroup) {
                getMessage()
            }
        })
        socket.on('receive message group', ({ idSend, idReceive, isGroup, message, type }) => {
            updateData({ idSend, idReceive, isGroup, message, type })
            let idSendCrr = route.params.id
            if (idReceive == idSendCrr && isGroup) {
                getMessage()
            }
        })

        return () => {
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons style={styles.icon} name="chevron-back" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goInfo}
                    style={styles.infoUser}>
                    <Image style={styles.avatar} source={{ uri: user.avatar } || images.avatar} />
                    <View style={styles.labels}>
                        <Text style={styles.nameUser}>{user.nameUser}</Text>
                        {route.params.isGroup ? <Text style={styles.status}>Group</Text>
                            : <Text style={styles.status}>{isOnline ? 'Online' : 'Offline'}</Text>}
                    </View>
                </TouchableOpacity>
                {isOwn && <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DeleteMember', { nameUser: user.nameUser, id: route.params.id, isGroup: route.params.isGroup })}
                    >
                        <Ionicons style={styles.icon} name="people" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddMember', { id: route.params.id, isGroup: route.params.isGroup })}

                    >
                        <Ionicons style={styles.icon} name="person-add" />
                    </TouchableOpacity>
                </View>}
            </View>
            <FlatList
                style={{ paddingBottom: 30 }}
                data={messageList}
                keyExtractor={() => Math.floor(Math.random() * 1000000).toString()}
                renderItem={({ item }) => <Message
                    isGroup={route.params.isGroup}
                    content={item.content}
                    method={item.method}
                    type={item.type}
                    name={item.nameSend}
                    id={item.id}
                    time={item.createdAt}
                />}
                inverted
            />
            <View style={styles.inputBar}>
                <TouchableOpacity onPress={selectCamera}>
                    <Ionicons style={styles.icon} name="camera" />
                </TouchableOpacity>
                <TouchableOpacity onPress={selectRecord}>
                    <Ionicons style={styles.icon} name="aperture" />
                </TouchableOpacity>
                <TouchableOpacity onPress={selectImg}>
                    <Ionicons style={styles.icon} name="image" />
                </TouchableOpacity>

                <View style={styles.inputArea}>
                    <TextInput
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        placeholder='Aa'
                        style={styles.input} />
                </View>
                <TouchableOpacity onPress={() => handleSendMessage(message, 'text')}>
                    <Ionicons style={[styles.icon, { opacity: message ? 1 : 0.3 }]} name="send" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailChat