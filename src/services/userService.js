import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginApi = async (email, password) => {
    let data = await api.post('login', {
        email,
        password
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}

export const signUpApi = async (formData) => {
    let data = await api.post('register', formData).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}
export const getUserById = async (id) => {
    let token = await AsyncStorage.getItem("token")
    let currentId = await AsyncStorage.getItem("id")
    let data = await api.get('getAllUser', {
        params: {
            id,
            currentId: currentId
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
export const getAllUser = async () => {
    let token = await AsyncStorage.getItem("token")
    let currentId = await AsyncStorage.getItem("id")
    let data = await api.get('getAllUser', {
        params: {
            id: 'ALL',
            currentId
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
export const getOnlyAllUser = async () => {
    let currentId = await AsyncStorage.getItem("id")
    let token = await AsyncStorage.getItem("token")
    let data = await api.get('GetOnlyAllUser', {
        params: {
            currentId
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

export const editUser = async (value, option) => {
    let id = await AsyncStorage.getItem("id")
    let token = await AsyncStorage.getItem("token")
    let data = await api.post('editUser', {
        id,
        value,
        option
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
    return data
}
export const editGroup = async (id, value, option) => {
    let token = await AsyncStorage.getItem("token")
    let data = await api.post('editGroup', {
        id,
        value,
        option
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
    return data
}