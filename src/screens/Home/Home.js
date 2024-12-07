import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import People from '../../screens/People/People';
import Me from '../../screens/Me/Me';
import { images } from '../../images/index';
import { styles } from './Home.styles';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import UserListing from '../Chats/UserListing/UserListing';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../contains/colors';

const Tab = createBottomTabNavigator();


function ChatsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        name='Chats'
        navigation={navigation}
        icon={true} />
      <SearchBox navigation={navigation} />
      {/* <StorySlider /> */}
      <UserListing navigation={navigation} />
    </View>
  )
}
export default function Home() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let source;

        switch (route.name) {
          case 'Chats':
            source = focused ? images.chatActive : images.chat
            break;
          case 'People':
            source = focused ? images.peopleActive : images.people
            break;
          case 'Me':
            return <Ionicons size={30} style={{ color: focused ? colors.black : colors.gray02 }} name="person" />
        }

        // Trả về biểu tượng
        return <Image source={source} />;
      },
      tabBarLabelStyle: {
        fontSize: 12,
        paddingBottom: 8
      },
      tabBarStyle: {
        height: 60,
        paddingTop: 6,
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray'
    })

    }>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          header: () => null
        }} />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          header: () => null
        }} />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          header: () => null
        }} />
    </Tab.Navigator>

  );
}
