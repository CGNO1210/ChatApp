import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './Header.styles';
import { images } from '../../images/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../services/userService';
import { useData } from '../../context/DataContext';


const Header = (props) => {
    const [avatar, setAvatar] = useState('a');
    const [id, setId] = useState(null);
    const updata = useData()
    useEffect(() => {
        let getId = async () => {
            try {
                const value = await AsyncStorage.getItem('id')
                setId(value)
                let user = await getUserById(value).then((data) => { setAvatar(data.users.avatar) });
            } catch (error) {
                console.log(error);
            }
        }

        getId()
    }, [updata.data])
    const createGroupChat = () => {
        props.navigation.navigate('CreateGroup', { id })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} barStyle='dark-content' />
            <View style={styles.row}>
                <Image style={styles.avatar} source={{ uri: avatar } || images.avatar} />
                <Text style={styles.title}>{props.name}</Text>
            </View>
            <View style={styles.row}>
                {props.icon && <TouchableOpacity onPress={createGroupChat}>
                    <Image style={styles.icon} source={images.newMessage} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default Header