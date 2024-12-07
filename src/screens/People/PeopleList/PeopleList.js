import { View, Text, FlatList, Image, useWindowDimensions, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './PeopleList.styles'
import { TabView, SceneMap } from 'react-native-tab-view';
import { AppContext } from '../../../context/AppContext';
import { getOnlyAllUser } from '../../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleList = ({ navigation }) => {

    const FirstRoute = () => {
        const [users, setUsers] = useState([]);
        useEffect(() => {
            let getuser = async () => {
                try {
                    let i = await AsyncStorage.getItem("id")
                    await getOnlyAllUser(i).then((data) => {
                        setUsers(data.users)
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            getuser()
            return () => {
            };
        }, []);
        return (
            <View style={styles.container}>
                <FlatList data={users} renderItem={renderItem} />
            </View>
        )
    };
    const renderItem = ({ item }) => {

        return (
            <Pressable
                onPress={() => {
                    let isGroup = item.isGroup !== undefined
                    navigation.navigate('DetailChat', { id: item.id, isGroup })
                }}
                style={styles.rowContainer} key={item.id}>
                <View style={styles.rowLeft}>
                    <Image style={styles.image} source={{ uri: item.avatar }} />
                    <Text style={styles.label1}>{item.nameUser}</Text>
                </View>

            </Pressable>
        )
    }
    const SecondRoute = () => {
        const { myGroups } = useContext(AppContext)
        return (
            <View style={styles.container}>
                <FlatList data={myGroups} renderItem={renderItem} />
            </View>
        )
    };

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Users' },
        { key: 'second', title: 'Groups' },
    ]);



    return (
        // <View style={styles.container}>
        //     <FlatList data={Data} renderItem={renderItem} />
        // </View>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

export default PeopleList