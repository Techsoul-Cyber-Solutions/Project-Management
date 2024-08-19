import { StyleSheet, Text, View,StatusBar,ScrollView,TouchableOpacity,FlatList, Dimensions,TextInput,Modal,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors'
import OverlappingImages from '../Constants/OverlappingImages ';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSelect from 'react-native-multiple-select';
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'

const {width,height} = Dimensions.get("screen");

const Project = ({navigation}) => {
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [userRole,setUserRole] = useState('');
  const [addProjectModal,setAddProjectModal] = useState(false);
  const [projectName,setProjectName] = useState('');
  const [clientName,setClientName] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [projectCategory,setProjectCategory] = useState('');
  const [startTime, setStartTime] = useState(null); 
  const [endTime, setEndTime] = useState(null); 
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [projectDescription,setProjectDescription] = useState('');
  const employees = [
    { id: 1, name: 'Employee 1' },
    { id: 2, name: 'Employee 2' },
    { id: 3, name: 'Employee 3' },
  ];
  const projectData = [
    {id:1,title:"Leap", customerName:"NSS School" ,status:"InProgress",priority:"Immediate",percentage:"80",category:"Mobile Application",teamMembers: [
      { id: 1, image: require('../../assets/Images/profile.jpeg') },
      { id: 2, image: require('../../assets/Images/emp2.jpg')},
      { id: 3, image: require('../../assets/Images/emp3.jpg')},
    ]},
    {id:2,title:"Athlen", customerName:"Athlen Sports and Events" ,status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application", teamMembers: [{ id: 1, image: require('../../assets/Images/profile.jpeg') },
      { id: 2, image: require('../../assets/Images/emp2.jpg') },
      { id: 3, image: require('../../assets/Images/emp3.jpg') },
      { id: 4, image: require('../../assets/Images/emp2.jpg') },
    ]},
    {id:3,title:"Tapngo" ,customerName:"Techsoul",status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application", teamMembers: [{ id: 1, image: require('../../assets/Images/profile.jpeg') },
    ]}
  ]
  // const filteredData = projectData.filter(project =>{
  //   if(filter === 'All') return true;
  //   if (filter === 'Ongoing' && project.percentage !== "100") return true;
  //   if (filter === 'Completed' && project.percentage === "100") return true;
  // });
  const filteredData = projectData.filter(project => {
    const matchesFilter = (filter === 'All') || (filter === 'Ongoing' && project.percentage !== "100") || (filter === 'Completed' && project.percentage === "100");
    const matchesSearchText = project.title.toLowerCase().includes(searchText.toLowerCase()) || project.customerName.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearchText;
  });
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Immediate":
        return Colors.danger;
      case "Gradual":
        return Colors.warning;
      default:
        return Colors.black;
    }
  }
  const clearSearch = () => {
    setSearchText('');
  };
  const retrieveData = async () =>{
    const username = await AsyncStorage.getItem('username');
    console.log(username,"username in project");
    setUserRole(username);
   }
   useEffect(() => {
     retrieveData();
   },[]);
   useEffect(() =>{
     console.log(userRole,"userRole in project");
   },[userRole]);
   
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backGround }}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={20} color={Colors.grey} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              cursorColor={Colors.purple}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <AntDesign name="close" size={20} color={Colors.grey} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('All')}>
              <Text style={[styles.filterText, filter === 'All' && styles.activeText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Ongoing')}>
              <Text style={[styles.filterText, filter === 'Ongoing' && styles.activeText]}>Ongoing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Completed')}>
              <Text style={[styles.filterText, filter === 'Completed' && styles.activeText]}>Completed</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.taskTitle,{textTransform:"capitalize"}]}>Projects</Text>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskContainer} onPress={() => navigation.navigate("ProjectDetails",{item})}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ paddingLeft: 10 ,}}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.projectTitle}>{item.customerName}</Text>
                    <Text style={{fontSize:12,fontFamily:"Poppins_500Medium",color:item.status === 'Completed'?Colors.success:Colors.purple}}>{item.status}</Text>
                    <OverlappingImages images={item.teamMembers.map(member => member.image)} />
                  </View>
                </View>
                <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>{item.priority}</Text>
              </TouchableOpacity>
            )}
          />
          <Modal
            animationType='slide'
            transparent={true}
            visible={addProjectModal}
          >
           <Pressable style={styles.centeredView} >
              <ScrollView contentContainerStyle={styles.scrollView} style={{width:"100%",}}>
                <View style={styles.modalView}>
                  <View style={styles.addWorkContainer}>
                    <Text style={[styles.close,{color:Colors.white}]}>Close</Text>
                    <Text style={styles.title}>Add Project</Text>
                    <TouchableOpacity onPress={() => setAddProjectModal(false)}>
                      <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalText}>Project Name : </Text>
                  <TextInput
                    style={[styles.textInput]}
                    placeholderTextColor={Colors.gray}
                    value={projectName}
                    onChangeText={setProjectName}
                    cursorColor={Colors.purple}
                  />
                  <Text style={styles.modalText}>Client Name : </Text>
                  <TextInput
                    style={[styles.textInput]}
                    placeholderTextColor={Colors.gray}
                    value={clientName}
                    onChangeText={setClientName}
                    cursorColor={Colors.purple}
                  />
                  <Text style={styles.modalText}>Project Category : </Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={projectCategory}
                      style={styles.picker}
                      onValueChange={(itemValue) => {
                        if (itemValue !== 'Select Category') {
                          setProjectCategory(itemValue);
                        }
                      }}>
                      <Picker.Item label="Select Category" value="Select Category" style={{ fontSize: 13 }} />
                      <Picker.Item label="Digital Marketing" value="Digital Marketing" style={{ fontSize: 13 }} />
                      <Picker.Item label='Website' value="Website" style={{ fontSize:13}}/>
                      <Picker.Item label='Web Application' value="Web Application" style={{ fontSize:13}} />
                      <Picker.Item label="Mobile Application" value="Mobile Application" style={{fontSize:13}}/>
                    </Picker>
                  </View>
                  <Text style={styles.modalText}>Project Description : </Text>
                  <TextInput
                    style={[styles.textInput,{height:80}]}
                    placeholderTextColor={Colors.gray}
                    value={projectDescription}
                    onChangeText={setProjectDescription}
                    cursorColor={Colors.purple}
                    
                  />
                   <Text style={styles.modalText}>Assign To : </Text>
                   <MultiSelect
                    items={employees}
                    uniqueKey="id"
                    onSelectedItemsChange={(selectedItems) => setSelectedEmployees(selectedItems)}
                    selectedItems={selectedEmployees}
                    selectText="Select Employees"
                    searchInputPlaceholderText="Search Employees"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#000"
                    selectedItemTextColor={Colors.purple}
                    selectedItemIconColor={Colors.purple}
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor={Colors.purple}
                    submitButtonText="Done"
                    hideTags
                    styleItemsContainer={{margin:10,}}
                    styleInputGroup={{padding:10,borderRadius:10}}
                    styleMainWrapper={{justifyContent:"center"}}
                    styleRowList={{}}
                    styleSelectorContainer={{}}
                    styleDropdownMenu={{}}
                    styleDropdownMenuSubsection={{borderRadius:10,alignSelf:"center",height:50,borderColor:Colors.grey,borderWidth:.5,padding:10,paddingLeft:15,}}
                  />
                  <Text style={[styles.modalText,{marginTop:10}]}>Duration: </Text>
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
                  <TouchableOpacity style={{ backgroundColor: Colors.purple, padding: 10, alignItems: "center", justifyContent: "center", margin: 20, marginLeft: 30, marginRight: 30, borderRadius: 5, flexDirection: "row", gap: 5 }} >
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Pressable>
          </Modal> 
        </View>
      </ScrollView>
      {userRole === 'admin' ? (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => setAddProjectModal(true)}>
          <Text style={{ fontFamily: "Poppins_600SemiBold", color: Colors.white }}>Add Project</Text>
        </TouchableOpacity>
      ):null}
    </SafeAreaView>
  )
}

export default Project

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    paddingLeft:20,
    paddingRight:20,
  },
  filterText: {
    color: Colors.grey,
    fontFamily: "Poppins_500Medium",
  },
  activeText:{
    color: Colors.purple,
    fontFamily: "Poppins_600SemiBold",
  },
  taskContainer: {
    backgroundColor: Colors.white,
    marginBottom: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    margin: 2,
    paddingTop: 15,
    paddingBottom: 15,
  },
  taskTitle: {
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 12,
  },
  priority: {
    paddingLeft: 15,
    textTransform: "uppercase",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom:10,
    backgroundColor:Colors.white,
    elevation:2
  },
  input: {
    flex: 1,
    paddingLeft:10
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
  buttonStyle:{
    backgroundColor: Colors.purple,
    padding: 10, 
    alignItems: "center",
    justifyContent: "center", 
    margin: 20,
    marginLeft: 30, 
    marginRight: 30,
    borderRadius: 5, 
    flexDirection: "row",
    gap: 5 
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
  title: {
    fontFamily:"Poppins_600SemiBold",
    color: Colors.purple,
    textAlign: 'center',
    fontSize:16,
    textTransform:"uppercase"
  },
  modalText:{
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
    fontSize: 12
  },
  textInput: {
    borderColor: Colors.grey,
    borderWidth: .5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  picker: {
    height: 50,
    width: '100%',
    fontFamily:"Poppins_500Medium",
  },
  pickerContainer: {
    borderColor: Colors.grey,
    borderWidth: .5,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  timeContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
    marginBottom: 10 
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
  buttonText: {
    fontFamily:"Poppins_500Medium",
    fontSize:12
  },
})