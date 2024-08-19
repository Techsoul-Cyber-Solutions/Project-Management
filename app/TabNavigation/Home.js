import { StyleSheet, Text, View ,StatusBar, ScrollView,Image,ActivityIndicator, Dimensions,TouchableOpacity,TextInput,FlatList,Pressable, ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState,useEffect} from 'react'
import Colors from '../Constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import NetInfo from '@react-native-community/netinfo';

import {  useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,} from '@expo-google-fonts/poppins';
const {width,height} = Dimensions.get("screen");
  const projectData = [
    {id:1,title:"Leap", customerName:"NSS School" ,status:"InProgress",priority:"Immediate",percentage:"80",category:"Mobile Application",
      teamMembers: [
      { id: 1, image: require('../../assets/Images/profile.jpeg') },
      { id: 2, image: require('../../assets/Images/emp2.jpg')},
      { id: 3, image: require('../../assets/Images/emp3.jpg') },
    ]},
    {id:2,title:"Athlen", customerName:"Athlen Sports and Events" ,status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application", 
      teamMembers: [
      { id: 1, image: require('../../assets/Images/profile.jpeg') },
      { id: 2, image: require('../../assets/Images/emp2.jpg') },
      { id: 3, image: require('../../assets/Images/emp3.jpg') },
      { id: 4, image: require('../../assets/Images/emp2.jpg') },
    ]},
    {id:3,title:"Tapngo" ,customerName:"Techsoul",status:"Completed",priority:"Gradual",percentage:"100",category:"Mobile Application",
      teamMembers: [
        { id: 1, image: require('../../assets/Images/profile.jpeg')},
    ]}
  ]
  const taskData = [
    {id:1,taskTitle:"Fees managemnet" ,projectTitle:"leap",priority:"Immediate",percentage:"80"},
    {id:2,taskTitle:"Exam Management" ,projectTitle:"leap",priority:"Gradual",percentage:"100"},
    {id:3,taskTitle:"Frontend Designing" ,projectTitle:"Project Management",priority:"Gradual",percentage:"100"}
  ]
const Home = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading,setLoading] = useState(false);
  // const [showUsername,setUsername] = useState('');
  // useEffect(() =>{
  //   const retrieveData = async () =>{
  //     const username = JSON.parse(await AsyncStorage.getItem('username'));
  //     console.log(username,"username in Homescreen");
  //     setUsername(showUsername);
  //   }
  //   retrieveData();
  // },[])
  let [fontsLoaded] = useFonts({Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,});
  const clearSearch = () => {
    setSearchText('');
  };
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.purple}/>;
  }
  const getPriorityColor = (priority) => {
    switch(priority){
      case "Immediate" :
        return Colors.danger;
      default :
        return Colors.warning
    }
  }
  const filteredProjects = projectData.filter(project =>
    project.title.toLowerCase().includes(searchText.toLowerCase()) ||
    project.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredTasks = taskData.filter(task =>
    task.taskTitle.toLowerCase().includes(searchText.toLowerCase()) ||
    task.projectTitle.toLowerCase().includes(searchText.toLowerCase())
  );
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backGround, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size='large' color={Colors.purple} />
      </View>
    )
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={Colors.backGround} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:Colors.backGround}} showsVerticalScrollIndicator={false}> 
        <View style={{flex:1,padding:15}}>
          <View style={styles.subContainer}>
            <View style={{flexDirection:"row",width:"80%"}}>
              <Image source={require('../../assets/Images/profile.jpeg')} style={{width:50,height:50,borderRadius:25}}/>
              <View style={{paddingLeft:10}}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text  style={{fontFamily:"Poppins_600SemiBold",}}>Haseebha</Text>
              </View>
            </View>
            <TouchableOpacity style={{width:"10%",alignItems:"center",justifyContent:"center"}} onPress={() => navigation.navigate("Notification")}>
              <Image source={require('../../assets/Images/notification.png')} style={{width:25,height:25,borderRadius:0}}/>
            </TouchableOpacity>
          </View>
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
          {filteredProjects.length > 0 && (
            <>
              <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:15,paddingBottom:15}}>
                <Text  style={{fontFamily:"Poppins_700Bold"}}>Projects</Text>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen',{screen:'Project'})}>
                  <Text style={{fontFamily:"Poppins_500Medium"}}>See All</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                 horizontal
                 data={filteredProjects}
                 keyExtractor={(item,index) => index.toString()}
                 showsHorizontalScrollIndicator={false}
                 style={{}}
                 renderItem={({ item }) => (
                  <TouchableOpacity style={{borderRadius:10,width:200,height:200,paddingRight:10,}} onPress={ () => navigation.navigate("ProjectDetails",{item})}>
                    <ImageBackground style={{width:"100%",height:"100%",justifyContent:"space-between"}} source={require("../../assets/Images/background2.jpeg")} imageStyle={{borderRadius:10,}}> 
                      <View style={{paddingTop:10,justifyContent:"flex-end",alignItems:"flex-end",paddingRight:10}}>
                        <Text style={{paddingLeft:15,color:Colors.white,textTransform:"uppercase",fontFamily:"Poppins_500Medium",fontSize:12}}>{item.status}</Text>
                      </View>
                      <View style={{paddingLeft:10,paddingRight:10,paddingBottom:15}}>
                        <Text style={{color:Colors.white,fontSize:18,fontFamily:"Poppins_600SemiBold",textTransform:"uppercase"}}>{item.title}</Text>
                        <Text style={{color:Colors.white,fontFamily:"Poppins_500Medium",textTransform:"capitalize",fontSize:12}}>{item.customerName}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingTop:20}}>
                          <Progress.Bar progress={item.percentage/100} width={140} animated={true} color={Colors.white} />
                          <Text style={{fontFamily:"Poppins_500Medium",fontSize:12,color:Colors.white,}}>{item.percentage}%</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                 )}
                />
              </View>
            </>
          )}
          {filteredTasks.length > 0 && (
            <>
              <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:25,paddingBottom:15}}>
                <Text  style={{fontFamily:"Poppins_700Bold"}}>Tasks</Text>
                <TouchableOpacity onPress={() => navigation.navigate("TaskScreen")}>
                  <Text style={{fontFamily:"Poppins_500Medium"}}>See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
                data={filteredTasks}
                keyExtractor={(item,index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity style={{backgroundColor:Colors.white,marginBottom:15,padding:10,flexDirection:"row",justifyContent:"space-between",elevation:2,margin:2,paddingTop:15,paddingBottom:15,width:"100%"}} onPress={() => navigation.navigate("TaskDetails",{item})}>
                    <View style={{flexDirection:"row",width:"80%"}}>
                      <View style={{backgroundColor:Colors.purple,width:50,height:50,borderRadius:5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:Colors.white,fontFamily:"Poppins_600SemiBold",textTransform:"uppercase"}}>{item.projectTitle.charAt(0)}</Text>
                      </View>
                      <View style={{paddingLeft:10,width:"80%",}}>
                        <Text style={{fontFamily:"Poppins_600SemiBold",textTransform:"uppercase"}}>{item.taskTitle}</Text>
                        <Text style={{fontFamily:"Poppins_500Medium",textTransform:"capitalize",fontSize:12}}>{item.projectTitle}</Text>
                      </View>
                    </View>
                    <View style={{width:"20%",alignItems:"flex-end",}}>
                      <Text style={{textTransform:"uppercase",fontFamily:"Poppins_500Medium",fontSize:10,color:getPriorityColor(item.priority)}}>{item.priority}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          )}  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft:10
  },
  subContainer:{
    paddingBottom:15,
    paddingTop:25,
    flexDirection:"row",
    justifyContent:"space-between",
    // backgroundColor:Colors.white
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
  projectStyle:{
    width:200,
    height:200,
    flexDirection:"row",
    marginRight:5,
    backgroundColor:Colors.purple,
    borderRadius:10,padding:15
  },
  welcomeText:{
    fontFamily:"Poppins_600SemiBold",
    fontSize:18
  }
})