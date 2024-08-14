import { StyleSheet, Text, View,ScrollView,StatusBar,FlatList ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors';

const Clients = () => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('Active');

    const ClientData = [
      { id: 1, clientName: "Haseeb", projectTitle: "Leap", priority: "Immediate", percentage: "80" ,image:require("../../assets/Images/emp3.jpg"),status:"Ongoing"},
      { id: 2, clientName: "Aslam", projectTitle: "Accounting", priority: "Gradual", percentage: "100" ,image:require("../../assets/Images/emp2.jpg"),status:"Completed"},
    ];
  
    // const filteredData = taskData.filter(task => {
    //     const matchesStatusFilter = (filter === 'Active' && task.status === 'Active') || (filter === 'Deactive' && task.status === 'Deactive');
    //     const matchesSearchText = task.clientName.toLowerCase().includes(searchText.toLowerCase()) || task.projectTitle.toLowerCase().includes(searchText.toLowerCase());
    //     return matchesStatusFilter && matchesSearchText;
    //   });
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
  return (
    <SafeAreaView styles={{flex:1,}}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
           <View style={{flex:1,padding:15}}>
                <FlatList
                    data={ClientData}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.taskContainer} >
                          <View style={{flexDirection:"row",width:"80%"}}>
                            {/* <View style={styles.projectIcon}>
                              <Image source={item.image} style={{width:"100%",height:"100%",borderRadius:30}}/>
                            </View> */}
                            <View style={{ paddingLeft: 10 }}>
                              <Text style={styles.clientName}>{item.clientName}</Text>
                              <Text style={styles.projectTitle}>{item.projectTitle}</Text>
                            </View>
                            <View style={{backgroundColor:Colors.purple,width:50,height:50,borderRadius:25}}>

                            </View>
                          </View>
                         {/* <View style={{width:"20%",alignItems:"flex-end",}}>
                            <Text style={[styles.priority,{color:getPriorityColor(item.status)}]}>{item.status}</Text>*/}
                          {/* </View>  */}
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
      },
      projectTitle: {
        fontFamily: "Poppins_500Medium",
        textTransform: "capitalize",
        fontSize: 12,
      },
      clientName: {
        // fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        textTransform: "uppercase",
      },
})