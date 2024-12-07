import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const createMessage = async (idSend, idReceive, isGroup, content, type) => {
    let token = await AsyncStorage.getItem('token')
    return await api.post('createMessage', {
        idSend, idReceive, isGroup, content, type
    }, {
        headers: {
            token
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
}

export const getMessageByUser1AndUser2 = async (user1, user2) => {
    let token = await AsyncStorage.getItem("token")
    let data = await api.get('getMessagesPrivate', {
        params: {
            user1, user2
        },
        headers: {
            token
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}
export const getMessageByGroup = async (groupId) => {
    let token = await AsyncStorage.getItem("token");
    let data = await api.get('getMessagesGroup', {
        params: {
            groupId
        },
        headers: {
            token
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}

export const deleteMessage = async (id, isGroup) => {
    let token = await AsyncStorage.getItem("token")
    return await api.delete('deleteMessage', {
        headers: {
            token
        },
        params: {
            id, isGroup
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
}
export const uploadVideo = async (data) => {
    let token = await AsyncStorage.getItem("token")
    return await api.post('upvideo', data, {
        headers: {
            token,
            'Content-Type': 'multipart/form-data'
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
}