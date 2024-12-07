
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './AddMember.styles'
import colors from '../../contains/colors'
import { addMemberGroup, getMemberNotInGroup } from '../../services/groupService';
import { useData } from '../../context/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddMember = ({ navigation, route }) => {
    const { updateData } = useData();

    const [selectedItems, setSelectedItems] = useState([]);
    const [members, setMembers] = useState([])
    const [canCreate, setCancreate] = useState(false)

    useEffect(() => {
        let getMember = async () => {
            await getMemberNotInGroup(route.params.id).then((rs) => {
                setMembers(rs.users)
            })
        }
        getMember()
        return () => {

        };
    }, []);

    const handleCheckboxChange = (item) => {
        if (selectedItems.includes(item.id)) {
            let tempList = selectedItems.filter(i => i !== item.id)
            setCancreate(tempList.length)
            setSelectedItems(tempList);

        } else {
            let tempList = [...selectedItems, item.id]
            setCancreate(tempList.length)
            setSelectedItems(tempList);
        }
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    handleCheckboxChange(item)
                }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }} >
                <Image style={{ width: 60, height: 60, borderRadius: 60 }} source={{ uri: item.avatar }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500' }}>{item.nameUser}</Text>
                    {/* <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: '300' }}>{item.isOnline ? 'Online' : 'Offline'}</Text> */}
                </View>
                {selectedItems.includes(item.id) ?
                    <Ionicons style={{ color: colors.blue }} size={30} name="radio-button-on" />
                    : <Ionicons style={{ color: colors.blue }} size={30} name="radio-button-off" />
                }


            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons size={30} onPress={() => { navigation.goBack() }} name="arrow-back" />
                <Text style={{ flex: 1, fontSize: 20, fontWeight: '600', marginLeft: 20 }}>Add new member</Text>
                <TouchableOpacity
                    onPress={
                        async () => {
                            if (canCreate) {

                                let id = await AsyncStorage.getItem("id")
                                await addMemberGroup(selectedItems, route.params.id, id).then(rs => {
                                    if (!rs.errCode) {
                                        Alert.alert(
                                            'Thông báo',
                                            'Add members success',
                                            [
                                                { text: 'OK' }
                                            ],
                                        );
                                        updateData(rs)
                                        navigation.goBack()
                                    }
                                })

                            }
                        }
                    }>
                    <Text style={{
                        fontSize: 16,
                        color: canCreate ? colors.blue : colors.gray02
                    }}>Save</Text>
                </TouchableOpacity>
            </View>
            {/* <SearchBox /> */}
            <FlatList
                data={members}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem} />
        </View>
    )
}

export default AddMember