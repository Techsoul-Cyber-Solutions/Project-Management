import { StyleSheet, Text, View,StatusBar,ScrollView,TextInput,TouchableOpacity,Button,Modal, Dimensions, Pressable ,FlatList} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../Constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import toastConfig from '../Constants/toastConfig';
const{width,height} = Dimensions.get("screen");

const AddClients = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity style={{padding:10,borderWidth:.5,borderColor:Colors.white,flexDirection:"row",alignItems:"center",gap:10,backgroundColor:Colors.white,elevation:2,borderRadius:10}} onPress={() => setModalVisible(true)}>
            <View style={{backgroundColor:Colors.purple,width:45,height:45,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
              <AntDesign name="plus" size={19} color={Colors.white} />
            </View>
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text  style={styles.title}>Add Work</Text>
            </View>
          </TouchableOpacity>     
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddClients

const styles = StyleSheet.create({})