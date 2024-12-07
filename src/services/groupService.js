import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createGroup = async (nameGroup, ownGroup, groupMembers) => {
    let token = await AsyncStorage.getItem("token")
    return await api.post('createGroup', {
        nameGroup, ownGroup, groupMembers
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
export const addMemberGroup = async (idUsers, idGroup, ownGroup) => {
    let token = await AsyncStorage.getItem("token")
    return await api.post('addMemberGroup', {
        idUsers, idGroup, ownGroup
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
export const deleteMemberGroup = async (idUsers, idGroup, ownGroup) => {
    let token = await AsyncStorage.getItem("token")
    return await api.post('deleteMemberGroup', {
        idUsers, idGroup, ownGroup
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

export const getGroupById = async (id) => {
    let token = await AsyncStorage.getItem("token")

    let data = await api.get('getGroupById', {
        params: {
            id
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
export const getGroupsByIdUser = async (id) => {
    let token = await AsyncStorage.getItem("token")
    let data = await api.get('getGroupsByIdUser', {
        params: {
            id
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
export const getMembersGroup = async (id) => {
    let token = await AsyncStorage.getItem("token")
    let data = await api.get('getMembersGroup', {
        params: {
            id
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
export const getMemberNotInGroup = async (id) => {
    let token = await AsyncStorage.getItem('token')
    let data = await api.get('getMemberNotInGroup', {
        params: {
            id
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
