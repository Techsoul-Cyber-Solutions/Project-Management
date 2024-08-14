import { StyleSheet, Text, View,ScrollView,StatusBar,FlatList ,TouchableOpacity,TextInput} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

  const Clients = () => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('Active');

    const ClientData = [
      { id: 1, clientName: "Haseeb", projectTitle: "Leap", priority: "Immediate", percentage: "80" ,image:require("../../assets/Images/emp3.jpg"),status:"Ongoing",number:1,email:"haseeb@gmail.com"},
      { id: 2, clientName: "Aslam", projectTitle: "Accounting App , Digital Marketing", priority: "Gradual", percentage: "100" ,image:require("../../assets/Images/emp2.jpg"),status:"Completed",number:2,email:"aslam@gmail.com"},
    ];
    const filteredClientData = ClientData.filter(item =>
      item.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.projectTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    const getPriorityColor = (status) => {
      switch (status) {
        case "Completed":
          return Colors.success;
        case "Ongoing":
          return Colors.info;
        default:
          return Colors.black;
      }
    }
    const clearSearch = () => {
      setSearchText('');
    };
  return (
    <SafeAreaView styles={{flex:1,}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,padding:15}}>
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
          <FlatList
            data={filteredClientData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskContainer} >
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                  <View style={{ paddingLeft: 10 ,}}>
                    <Text style={styles.clientName}>{item.clientName}</Text>
                    <Text style={styles.projectTitle}>{item.projectTitle}</Text>
                    <Text style={[styles.projectTitle,{color:Colors.grey,textTransform:"none"}]}>{item.email}</Text>
                  </View>
                  <View style={{alignItems:"center",justifyContent:"center",gap:3}}>
                    <View style={{backgroundColor:Colors.purple,width:40,height:40,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
                      <Text style={{color:Colors.white,fontFamily:"Poppins_600SemiBold",}}>{item.number}</Text>
                    </View>
                    <Text style={{fontFamily:"Poppins_400Regular",fontSize:10}}>Projects</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Clients

const styles = StyleSheet.create({
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
    borderRadius:10
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 12,
  },
  clientName: {
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
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
})