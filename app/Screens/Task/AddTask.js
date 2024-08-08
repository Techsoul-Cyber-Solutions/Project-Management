import { StyleSheet, Text, View,StatusBar,ScrollView,TextInput,TouchableOpacity,Button } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../Constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import AntDesign from '@expo/vector-icons/AntDesign';

const AddTask = ({navigation}) => {
  const [taskDescription, setTaskDescription] = useState('')
  const [status, setStatus] = useState('Select Status')
  const [startTime, setStartTime] = useState(null); // Initialize with null
  const [endTime, setEndTime] = useState(null); // Initialize with null
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState([]);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startTime
    setShowStartPicker(false)
    setStartTime(currentDate)
  }

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endTime
    setShowEndPicker(false);
    setEndTime(currentDate);
  }
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { name, uri } = result.assets[0];
      setFileName([...fileName, { name, uri }]);
    }
  };
  
  const formatTime = (date) => {
    if (!date) return null; // Return null if date is not set

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };
  const handleFileDelete = (fileToDelete) => {
    setFileName(fileName.filter(file => file.name !== fileToDelete));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.title}>Add New Task</Text>
          <Text style={{ fontFamily: "Poppins_500Medium", marginBottom: 5, fontSize: 12 }}>Work Description : </Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={Colors.gray}
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <Text style={{ fontFamily: "Poppins_500Medium", marginBottom: 5, fontSize: 12 }}>Status : </Text>
          <View style={styles.pickerContainer}>
          <Picker
              selectedValue={status}
              style={styles.picker}
              onValueChange={(itemValue) => {
                if (itemValue !== 'Select Status') {
                  setStatus(itemValue);
                }
              }}
            >
              <Picker.Item label="Select Status" value="Select Status" style={{ fontSize: 13 }} />
              <Picker.Item label="Pending" value="Pending" style={{ fontSize: 13 }} />
              <Picker.Item label="In Progress" value="InProgress" style={{ fontSize: 13 }} />
              <Picker.Item label="Completed" value="Completed" style={{ fontSize: 13 }} />
            </Picker>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowStartPicker(true)}>
              <Text style={styles.buttonText}>{startTime ? formatTime(startTime) : 'Start Time'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeButton} onPress={() => setShowEndPicker(true)}>
              <Text style={styles.buttonText}>{endTime ? formatTime(endTime) : 'End Time'}</Text>
            </TouchableOpacity>
          </View>
          {showStartPicker && (
            <DateTimePicker
              value={startTime || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeStart}
            />
          )}
          {showEndPicker && (
            <DateTimePicker
              value={endTime || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={pickDocument}>
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>
          {fileName.length > 0 && (
            <View>
              {fileName.map((file, index) => (
                <View key={index} style={[styles.button, { flexDirection: "row", justifyContent: "space-between" }]}>
                  <Text style={{ fontFamily:"Poppins_500Medium",fontSize:12,color:Colors.grey}}>{file.name}</Text>
                  <TouchableOpacity onPress={() => handleFileDelete(file.name)}>
                    <AntDesign name="delete" size={16} color={Colors.grey} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: Colors.purple, padding: 10, alignItems: "center", justifyContent: "center", margin: 20, marginLeft: 30, marginRight: 30, borderRadius: 5, flexDirection: "row", gap: 5 }}>
        <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily:"Poppins_600SemiBold",
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    height: 80,
    borderColor: Colors.grey,
    borderWidth: .5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: Colors.white,
    justifyContent:"flex-start"
  },
  pickerContainer: {
    borderColor: Colors.grey,
    borderWidth: .5,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  picker: {
    height: 50,
    width: '100%',
    fontFamily:"Poppins_500Medium",
  },
  button: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop:10,
    borderWidth:0.5,
    borderColor:Colors.grey
  },
  buttonText: {
    // color: Colors.grey,
    fontFamily:"Poppins_500Medium",
    fontSize:12
  },
  timeText: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 8,
  },
  fileText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    marginBottom: 16,
  },
  timeButton:{
    width:"45%",
    alignItems:"center",
    backgroundColor:Colors.white,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:10,
    borderWidth:.5,
    borderColor:Colors.grey
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor:Colors.white,
    padding:10,
    borderRadius:10
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  pickerItem:{
    fontSize:12
  }
})