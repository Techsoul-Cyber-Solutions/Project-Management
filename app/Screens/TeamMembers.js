import { StyleSheet, Text, View ,ScrollView,StatusBar,TouchableOpacity,FlatList,Image,TextInput} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';

const TeamMembers = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('Active');

    const taskData = [
      { id: 1, memberName: "Haseeb",position: "Web Developer", priority: "Immediate", percentage: "80" ,image:require("../../assets/Images/emp3.jpg"),status:"Active"},
      { id: 2, memberName: "Aslam", position: "Web Developer", priority: "Gradual", percentage: "100" ,image:require("../../assets/Images/emp2.jpg"),status:"Active"},
    ];
  
    const filteredData = taskData.filter(task => {
      const matchesStatusFilter = (filter === 'Active' && task.status === 'Active') || (filter === 'Deactive' && task.status === 'Deactive');
      const matchesSearchText = task.memberName.toLowerCase().includes(searchText.toLowerCase()) || task.projectTitle.toLowerCase().includes(searchText.toLowerCase());
      return matchesStatusFilter && matchesSearchText;
    });

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "Active":
          return Colors.success;
        case "Deactive":
          return Colors.danger;
        default:
          return Colors.black;
      }
    }

    const clearSearch = () => {
      setSearchText('');
    };
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backGround,padding:15}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,}}>
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
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Active')}>
              <Text style={[styles.filterText, filter === 'Active' && styles.activeText]}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Deactive')}>
              <Text style={[styles.filterText, filter === 'Deactive' && styles.activeText]}>Deactive</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskContainer} onPress={() => navigation.navigate("MemberDetails",{item})}>
                <View style={{flexDirection:"row",width:"80%"}}>
                  <View style={styles.projectIcon}>
                    <Image source={item.image} style={{width:"100%",height:"100%",borderRadius:30}}/>
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.memberName}>{item.memberName}</Text>
                    <Text style={styles.projectTitle}>{item.position}</Text>
                    
                  </View>
                </View>
                <View style={{width:"20%",alignItems:"flex-end",}}>
                  <Text style={[styles.priority,{color:getPriorityColor(item.status)}]}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TeamMembers

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
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
    // backgroundColor: Colors.purple,
    width: 60,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  projectIconText: {
    color: Colors.white,
    // fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  memberName: {
    // fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 12,
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    // marginLeft:10,
    // marginRight:10,
    marginBottom:10,
    backgroundColor:Colors.white,
    elevation:2
  },
  input: {
    flex: 1,
    paddingLeft:10
  },
  priority:{
    textTransform:"uppercase",
    fontFamily:"Poppins_500Medium",
    fontSize:10,
  },
})