import { StyleSheet, Text, View,StatusBar,ScrollView,TextInput,TouchableOpacity,Button,Modal, Dimensions, Pressable ,FlatList} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../Constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import AntDesign from '@expo/vector-icons/AntDesign';
const{width,height} = Dimensions.get("screen");

const AddWork = ({navigation}) => {
  const [taskDescription, setTaskDescription] = useState('')
  const [status, setStatus] = useState('Select Status')
  const [startTime, setStartTime] = useState(null); 
  const [endTime, setEndTime] = useState(null); 
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
//   const [image, setImage] = useState(null)
//   const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState([]);
  const [modalVisible,setModalVisible] = useState(false);
  const [completeModal,setCompleteModal] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [taskName,setTaskName] = useState('')

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
    if (!date) return null;

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
//   const handleSubmit= () =>{
//     setModalVisible(false)
//   }
  const handleSubmit = () => {
    const newTask = {
      taskDescription,
      status,
      startTime,
      endTime,
      fileName,
    };
    setSubmittedTasks([...submittedTasks, newTask]);
    setModalVisible(false);
    setTaskDescription('');
    setStatus('Select Status');
    setStartTime(null);
    setEndTime(null);
    setFileName([]);
  };
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}> {item.taskDescription}</Text>
      <Text>Status: {item.status}</Text>
      <Text style={styles.projectTitle}>{formatTime(item.startTime)} -{formatTime(item.endTime)} </Text>
      {/* <Text>Files:</Text>
      {item.fileName.map((file, index) => (
        <Text key={index} style={{ marginLeft: 10 }}>
          - {file.name}
        </Text> */}
      {/* ))} */}
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
          <TouchableOpacity style={{padding:10,borderWidth:.5,borderColor:Colors.white,flexDirection:"row",alignItems:"center",gap:10,backgroundColor:Colors.white,elevation:2,borderRadius:10}} onPress={() => setModalVisible(true)}>
            <View style={{backgroundColor:Colors.purple,width:45,height:45,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
              <AntDesign name="plus" size={19} color={Colors.white} />
            </View>
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text  style={styles.title}>Add Work</Text>
            </View>
          </TouchableOpacity>
          {submittedTasks.length !== 0 ? (
            <Text style={[styles.taskTitle,{marginTop:15}]}>Today's Work</Text>
          ):null}
          <FlatList
            data={submittedTasks}
            renderItem={renderTask}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 10 }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <Pressable style={styles.centeredView} >
              <ScrollView contentContainerStyle={styles.scrollView} style={{width:"100%",}}>
                <View style={styles.modalView}>
                  <View style={styles.addWorkContainer}>
                    <Text style={[styles.close,{color:Colors.white}]}>Close</Text>
                    <Text style={styles.title}>Add Task</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalText}>Task Name : </Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={taskName}
                      style={styles.picker}
                      onValueChange={(itemValue) => {
                        if (itemValue !== 'Select Task') {
                          setTaskName(itemValue);
                        }
                      }}>
                      <Picker.Item label="Select Task" value="Select Task" style={{ fontSize: 13 }} />
                      <Picker.Item label="Frontend Designing" value="Frontend Designing" style={{ fontSize: 13 }} />
                      {/* <Picker.Item label="In Progress" value="InProgress" style={{ fontSize: 13 }} />
                      <Picker.Item label="Completed" value="Completed" style={{ fontSize: 13 }} /> */}
                    </Picker>
                  </View>
                  <Text style={styles.modalText}>Work Description : </Text>
                  <TextInput
                    style={[styles.textInput,{height:80}]}
                    placeholderTextColor={Colors.gray}
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                  />
                  <Text style={styles.modalText}>Status : </Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={status}
                      style={styles.picker}
                      onValueChange={(itemValue) => {
                        if (itemValue !== 'Select Status') {
                          setStatus(itemValue);
                        }
                      }}>
                      <Picker.Item label="Select Status" value="Select Status" style={{ fontSize: 13 }} />
                      <Picker.Item label="Pending" value="Pending" style={{ fontSize: 13 }} />
                      <Picker.Item label="In Progress" value="InProgress" style={{ fontSize: 13 }} />
                      <Picker.Item label="Completed" value="Completed" style={{ fontSize: 13 }} />
                    </Picker>
                  </View>
                  <View style={styles.timeContainer}>
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
                        <View key={index} style={[styles.button, { flexDirection: "row", justifyContent: "space-between" ,backgroundColor:Colors.white,borderColor:Colors.purple,borderWidth:.5}]}>
                          <Text style={{ fontFamily:"Poppins_500Medium",fontSize:12,color:Colors.purple}}>{file.name}</Text>
                          <TouchableOpacity onPress={() => handleFileDelete(file.name)}>
                            <AntDesign name="delete" size={16} color={Colors.purple} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                  <TouchableOpacity style={{ backgroundColor: Colors.purple, padding: 10, alignItems: "center", justifyContent: "center", margin: 20, marginLeft: 30, marginRight: 30, borderRadius: 5, flexDirection: "row", gap: 5 }} onPress={handleSubmit} >
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Pressable>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={completeModal}>
            <Pressable style={styles.centeredView} >
              <View style={[styles.modalView,{width:"95%"}]}>
                <Text style={{ fontFamily: "Poppins_600SemiBold",color:Colors.purple,marginBottom:10}}>Today's Work Completed!!</Text>
                <Text style={{fontFamily:"Poppins_500Medium",marginBottom:20,color:Colors.grey}}>If you submit, no additional works can be added today. Are you sure you want to proceed?</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                  <TouchableOpacity style={{padding:10,backgroundColor:Colors.purple,borderWidth:1,borderColor:Colors.purple,borderRadius:10,width:"45%",alignItems:"center",justifyContent:"center"}} onPress={() => setCompleteModal(false)} >
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:10,backgroundColor:Colors.white,borderWidth:1,borderColor:Colors.purple,borderRadius:10,width:"45%",alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontFamily: "Poppins_600SemiBold", color: Colors.purple}}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: Colors.purple, padding: 10, alignItems: "center", justifyContent: "center", margin: 20, marginLeft: 30, marginRight: 30, borderRadius: 5, flexDirection: "row", gap: 5 }} onPress={() => setCompleteModal(true)}>
        <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Complete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddWork

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
    color: Colors.purple,
    textAlign: 'center',
    fontSize:16,
    textTransform:"uppercase"
  },
  textInput: {
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
    fontFamily:"Poppins_500Medium",
    fontSize:12
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 8,
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
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width:"98%",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    padding:15,
    paddingTop:25,
    paddingBottom:20,
    alignSelf:"center"
  },
  taskContainer: {
    backgroundColor: Colors.white,
    marginBottom: 15,
    padding: 10,
    justifyContent: "space-between",
    elevation: 2,
    margin: 2,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth:1,
    borderColor:Colors.success
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 12,
  },
  taskTitle: {
    // fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  scrollView:{
    flexGrow:1,
    alignItems:"center",
    justifyContent:"center"
  },
  addWorkContainer:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginBottom:15
  },
  close:{
    fontFamily:"Poppins_400Regular",
    fontSize:13,
    color:Colors.purple,
    textTransform:"uppercase"
  },
  modalText:{
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
    fontSize: 12
  },
  timeContainer:{
    flexDirection: "row",
     justifyContent: "space-between",
     marginTop: 10,
     marginBottom: 10 
  }
})