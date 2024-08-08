import { StyleSheet, Text, View,StatusBar,ScrollView,TouchableOpacity,FlatList, Dimensions,TextInput } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors'
import OverlappingImages from '../Constants/OverlappingImages ';
import AntDesign from '@expo/vector-icons/AntDesign';

const {width,height} = Dimensions.get("screen");

const Project = ({navigation}) => {
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const projectData = [
    {id:1,title:"Leap", customerName:"NSS School" ,status:"InProgress",priority:"Immediate",percentage:"80",category:"Mobile Application",teamMembers: [
      { id: 1, image: require('../../assets/Images/profile.jpeg') },
      { id: 2, image: require('../../assets/Images/emp2.jpg')},
      { id: 3, image: require('../../assets/Images/emp3.jpg') },
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
          <Text>Projects</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Project

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    paddingLeft:20,
    paddingRight:20,
    // backgroundColor: Colors.white,
  },
  activeFilter: {
    backgroundColor: Colors.white,
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
  projectIcon: {
    backgroundColor: Colors.purple,
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  projectIconText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  taskTitle: {
    fontSize: 18,
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
    marginLeft:10,
    marginRight:10,
    marginBottom:15,
    backgroundColor:Colors.white,
    elevation:2
  },
  input: {
    flex: 1,
    paddingLeft:10
  },
})