import { View, Image, Alert, Modal, Text, Pressable, Vibration, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react';
import { styles } from './Message.styles';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../contains/colors';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import { deleteMessage } from '../../../services/messageService';
import { useData } from '../../../context/DataContext';
import { AppContext } from '../../../context/AppContext';
import moment from 'moment';



const Message = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { socket } = useContext(AppContext);
  const { updateData } = useData();
  const handleDownload = async (uri) => {
    const filename = uri.split('/').pop();
    const fileUri = FileSystem.documentDirectory + filename;

    try {
      const downloadObject = FileSystem.createDownloadResumable(
        uri,
        fileUri
      );

      const downloadedImageUri = await downloadObject.downloadAsync();
      Alert.alert('Download successful!', `File saved at: ${downloadedImageUri}`);
      console.log(downloadedImageUri);
      ToastAndroid.showWithGravityAndOffset(
        'Download Successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      setModalVisible(!modalVisible);
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Download failed!', 'Unable to download the file.');
    }
  };
  const handleDeleteMessage = async () => {
    console.log(props);
    await deleteMessage(props.id, props.isGroup).then(res => {
      updateData(res)
      socket.emit('delete', res)
      console.log(res)
    })
  }


  if (props.type === 'text') {
    return (
      <Pressable
        onLongPress={() => {
          Vibration.vibrate([60, 30])
          setModalVisible(true)
        }}
        style={styles[`container${props.method}`]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback onPress={() => {
            setModalVisible(false);
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="copy" size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}>Copy</Text>
                </Pressable>
                {props.method === 'send' && <Pressable
                  style={[styles.button, styles.buttonClose, { backgroundColor: colors.gray02 }]}
                  onPress={() => {
                    handleDeleteMessage()
                    setModalVisible(!modalVisible)
                  }}>
                  <Ionicons name="trash" size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}>Delete</Text>
                </Pressable>}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles[props.method]}>
          {!!props.isGroup && <Text style={styles[`name${props.method}`]}>{props.name}</Text>}
          <Text style={styles[`text${props.method}`]}>{props.content}</Text>
          <Text style={styles[`time${props.method}`]}>{moment(props.time).format('HH:mm DD-MM-YYYY')}</Text>
        </View>
      </Pressable>
    )
  } else {
    return (
      <Pressable
        onLongPress={() => {
          Vibration.vibrate([60, 30])
          setModalVisible(true)
        }}
        style={styles[`container${props.method}`]}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback onPress={() => {
            setModalVisible(false);
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>

                    handleDownload(props.content)}>
                  <Ionicons name="download" size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}>Download</Text>
                </Pressable>
                {props.method === 'send' && <Pressable
                  style={[styles.button, styles.buttonClose, { backgroundColor: colors.gray02 }]}
                  onPress={() => {
                    handleDeleteMessage()
                    setModalVisible(!modalVisible)
                  }}>
                  <Ionicons name="trash" size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}>Delete</Text>
                </Pressable>}

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View>
          {!!props.isGroup && <Text style={styles[`name${props.method}`]}>{props.name}</Text>}

          {props.type === 'img' ? <Image resizeMode="cover" source={{ uri: props.content }} style={{ width: 200, height: 200, borderRadius: 18 }} />
            : <Video
              source={{ uri: props.content }} // hoặc require('path/to/video.mp4')
              style={{ width: 200, height: 200, borderRadius: 18 }}
              resizeMode="cover"
              useNativeControls // Hiển thị điều khiển video mặc định của thiết bị
            />}
          <Text style={styles[`time${props.method}`]}>{moment(props.time).format('HH:mm DD-MM-YYYY')}</Text>

        </View>
      </Pressable>
    )
  }
}

export default Message