import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllUser, getUserById,getOnlyAllUser } from "../services/userService";
import { getGroupsByIdUser } from "../services/groupService";



export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [onlyAllUsers, setAllOnlyUsers] = useState(null)
    const [myGroups, setMyGroups] = useState(null)
    useEffect(() => {
        let getId = async () => {
            let i = await AsyncStorage.getItem("id")
            await getUserById(i).then(
                (data) => {
                    //ng dung hien tai dang dang nhap
                    setUsers(data.users)
                }
            )
            await getAllUser().then(
                (data) => {
                    setAllUsers(data.users)
                }
            )
            await getOnlyAllUser().then(
                (data) => {
                    setAllOnlyUsers(data.users)
                }
            )
            //get group
            await getGroupsByIdUser(i).then((res) => {
                setMyGroups(res.groups)
            })
            const s = io("http://162.16.21.2:3002")
            setSocket(s)
            s.emit('init', i)
        }
        getId()
        // console.log(ioConnect.id);
        return () => {
            socket && socket.disconnect();
        };
    }, []);
    return <AppContext.Provider value={{ socket, users, allUsers, myGroups ,onlyAllUsers}}>
        {children}
    </AppContext.Provider>
}