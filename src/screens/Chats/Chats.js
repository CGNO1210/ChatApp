import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailChat from '../DetailChat/DetailChat';
import Home from '../Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from '../../context/AppContext';
import { DataProvider } from '../../context/DataContext';
import CreateGroup from '../CreateGroup/CreateGroup';
import AddMember from '../AddMember/AddMember';
import DeleteMember from '../DeleteMember/DeleteMember';
import Info from '../Info/Info';


const Stack = createNativeStackNavigator();

export default function Chats() {

    
    useEffect(() => {
        let getId = async () => {
            try {
                const value = await AsyncStorage.getItem('id')
            } catch (error) {
                console.log(error);
            }
        }
        getId()
    }, [])
    return (
        <AppProvider>
            <DataProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="DetailChat"
                        component={DetailChat}
                    />
                    <Stack.Screen
                        name="CreateGroup"
                        component={CreateGroup}
                    />
                    
                    <Stack.Screen
                        name="AddMember"
                        component={AddMember}
                    />
                    <Stack.Screen
                        name="DeleteMember"
                        component={DeleteMember}
                    />
                    <Stack.Screen
                        name="Info"
                        component={Info}
                    />

                </Stack.Navigator>
            </DataProvider>
        </AppProvider>
    )
}
