import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './People.styles';
import SearchBox from '../../components/SearchBox/SearchBox';
import Header from '../../components/Header/Header';
import { images } from '../../images/index';
import PeopleList from './PeopleList/PeopleList';
import { AppContext } from '../../context/AppContext';

const People = ({ navigation }) => {
  useEffect(() => {
    return () => {

    };
  }, []);
  return (
    <View style={styles.container}>
      <Header name='People' />
      <SearchBox navigation={navigation} />
      <PeopleList navigation={navigation} />
    </View>
  )
}

export default People