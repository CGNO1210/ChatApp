import { View, Text, TextInput, Image, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { styles } from './SearchBox.style';
import { images } from '../../images/index';
import color from '../../contains/colors';
import { AppContext } from '../../context/AppContext';

const SearchBox = (props) => {
    const { allUsers } = useContext(AppContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const detailChat = (id, isGroup, socketId) => {
        props.navigation.navigate('DetailChat', { id, isGroup, socketId })
    }
    const handleSearch = (text) => {
        setSearchTerm(text);
        const filteredData = allUsers.filter(item => {
            return item.nameUser.toLowerCase().includes(text.toLowerCase())
        }

        );
        setSearchResults(filteredData);
        setShowResults(!!text); // Đặt showResults thành true nếu có text, ngược lại đặt thành false
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSearchTerm('')
                    setShowResults(false)
                    detailChat(item.id, item.isGroup, item.socketId)
                }}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} >
                <Image style={{ width: 60, height: 60, borderRadius: 60 }} source={{ uri: item.avatar }} />
                <View>
                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500' }}>{item.nameUser}</Text>
                    {item.email &&  <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: '400' }}>{item.email}</Text>}
                    {item.isGroup ? <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: '300' }}>group</Text> :
                        <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: '300' }}>{item.isOnline ? 'Online' : 'Offline'}</Text>}

                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image style={styles.search} source={images.search} />
                <TextInput style={styles.textInput}
                    value={searchTerm}
                    onChangeText={handleSearch}
                    // onBlur={() => setShowResults(false)}
                    onPressIn={() => {
                        if (searchTerm) {
                            setShowResults(true)
                        }
                    }}
                    placeholderTextColor={color.gray02}
                    cursorColor={'black'}
                    placeholder='Search' />
                {showResults &&
                    <View style={styles.listSearch}>
                        <FlatList style={{ flex: 1 }}
                            data={searchResults}
                            renderItem={renderItem} // Thay 'name' bằng trường dữ liệu bạn muốn hiển thị
                            keyExtractor={(item) => item.id.toString()} // Thay 'id' bằng trường dữ liệu duy nhất của mỗi mục
                        />
                    </View>}
            </View>

        </View>
    )
}

export default SearchBox