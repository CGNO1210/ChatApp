
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AppContext } from '../../context/AppContext'
import { styles } from './CreateGroup.styles'
import colors from '../../contains/colors'
import { createGroup } from '../../services/groupService';
import { useData } from '../../context/DataContext';


const CreateGroup = ({ navigation, route }) => {
    const { users, onlyAllUsers } = useContext(AppContext)
    const { updateData } = useData();

    const [selectedItems, setSelectedItems] = useState([]);
    const [nameGroup, setNameGroup] = useState('')
    const [canCreate, setCancreate] = useState(false)
    const handleCheckboxChange = (item) => {
        if (selectedItems.includes(item)) {
            let tempList = selectedItems.filter(i => i.id !== item.id)
            setCancreate(tempList.length && (!!nameGroup))
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));

        } else {
            let tempList = [...selectedItems, item]
            setCancreate(tempList.length && (!!nameGroup))
            setSelectedItems(tempList);
        }
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setCancreate(selectedItems.length && (!!nameGroup))
                    handleCheckboxChange(item)
                }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }} >
                <Image style={{ width: 60, height: 60, borderRadius: 60 }} source={{ uri: item.avatar }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500' }}>{item.nameUser}</Text>
                    <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: '300' }}>{item.isOnline ? 'Online' : 'Offline'}</Text>
                </View>
                {selectedItems.includes(item) ?
                    <Ionicons style={{ color: colors.blue }} size={30} name="radio-button-on" />
                    : <Ionicons style={{ color: colors.blue }} size={30} name="radio-button-off" />}

            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons size={30} onPress={() => { navigation.goBack() }} name="arrow-back" />
                <Text style={{ flex: 1, fontSize: 20, fontWeight: '600', marginLeft: 20 }}>New Group</Text>
                <TouchableOpacity
                    onPress={
                        async () => {
                            if (canCreate) {
                                //create group
                                let rs = await createGroup(nameGroup, users.id, selectedItems)
                                console.log(rs);
                                updateData(rs)
                                navigation.navigate('Home')
                            }
                        }
                    }>
                    <Text style={{
                        fontSize: 16,
                        color: canCreate ? colors.blue : colors.gray02
                    }}>Create</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                onChangeText={(text) => {
                    setCancreate(selectedItems.length && (!!text))
                    setNameGroup(text)
                }}
                value={nameGroup}
                style={styles.input}
                placeholder='Name group' />
            {/* <SearchBox /> */}
            <FlatList
                data={onlyAllUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem} />
        </View>
    )
}

export default CreateGroup