import { StyleSheet, Text, View ,ScrollView,StatusBar,Image,TouchableOpacity,FlatList} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../Constants/Colors'
import OverlappingImages from '../../Constants/OverlappingImages '

const MemberDetails = ({route,navigation}) => {
    const {item} =route.params;
    const [filter, setFilter] = useState('All');
    const [searchText, setSearchText] = useState('');

    console.log(item);
    const projectData = [
        {id:1,title:"Leap", customerName:"NSS School" ,status:"InProgress",priority:"Immediate",percentage:"80",category:"Mobile Application",teamMembers: [
          { id: 1, image: require('../../../assets/Images/profile.jpeg') },
          { id: 2, image: require('../../../assets/Images/emp2.jpg')},
          { id: 3, image: require('../../../assets/Images/emp3.jpg') },
        ]},
        {id:2,title:"Athlen", customerName:"Athlen Sports and Events" ,status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application", teamMembers: [{ id: 1, image: require('../../../assets/Images/profile.jpeg') },
          { id: 2, image: require('../../../assets/Images/emp2.jpg') },
          { id: 3, image: require('../../../assets/Images/emp3.jpg') },
          { id: 4, image: require('../../../assets/Images/emp2.jpg') },
        ]},
        {id:3,title:"Tapngo" ,customerName:"Techsoul",status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application", teamMembers: [{ id: 1, image: require('../../../assets/Images/profile.jpeg') },
        ]}
      ]
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
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backGround}}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={{flex:1}}>
                <View style={{width:"100%",padding:20,flexDirection:"row",backgroundColor:Colors.white,}}>
                    <View style={{width:"25%",alignItems:"center",justifyContent:"center"}}>
                      <Text style={{color:Colors.purple,fontFamily:"Poppins_600SemiBold",fontSize:15}}>3</Text>
                      <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Completed Task</Text>
                    </View>
                    <View style={{width:"50%",alignItems:"center",justifyContent:"center"}}>
                      <Image style={{width:90,height:90,borderRadius:75}} source={require('../../../assets/Images/emp2.jpg')}/>
                      <Text style={{fontFamily:"Poppins_500Medium",fontSize:12}}>{item.memberName}</Text>
                      <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>{item.position}</Text>
                      <TouchableOpacity style={{padding:10,backgroundColor:Colors.purple,borderRadius:10}}>
                        <Text style={{color:Colors.white,fontFamily:"Poppins_500Medium",fontSize:12,paddingLeft:15,paddingRight:15}}>Message</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{width:"25%",alignItems:"center",justifyContent:"center"}}>
                      <Text style={{color:Colors.purple,fontFamily:"Poppins_600SemiBold",fontSize:15}}>3</Text>
                      <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Ongoing Task</Text>
                    </View>
                </View>
                <View style={{padding:15}}>
                    <Text style={{fontFamily:"Poppins_700Bold"}}>All Projects</Text>
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
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default MemberDetails

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
        // fontSize: 18,
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
})