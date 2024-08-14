import { StyleSheet, Text, View,StatusBar,ScrollView ,Animated, FlatList, Pressable, Image,TouchableOpacity} from 'react-native'
import React,{useRef,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../Constants/Colors';
import OverlappingImages from '../Constants/OverlappingImages ';
import { Circle } from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProjectDetails = ({route,navigation}) => {
    const {item} =route.params;
    console.log(item,"Item ");
    const taskData = [
        {id:1,taskTitle:"Fees managemnet" ,projectTitle:"leap",priority:"Immediate",percentage:"80",status:"Inprogress"},
        {id:2,taskTitle:"Exam Management" ,projectTitle:"leap",priority:"Gradual",percentage:"100",status:"Completed"},
        {id:3,taskTitle:"UI Designing" ,projectTitle:"leap",priority:"Gradual",percentage:"100",status:"Completed"}
    ]
    const teamData = [
        {id:2,image:require("../../assets/Images/emp3.jpg"),name:"Haseeb",role:"Web Developer", days:"7"},
        {id:3,image:require("../../assets/Images/profile.jpeg"),name:"Arya",role:"App Developer", days:"7"},
        {id:1,image:require("../../assets/Images/emp2.jpg"),name:"Aslam",role:"Web Developer", days:"7"}
    ]
    const getStatusColor = (status) =>{
        switch(status){
            case "Inprogress":
            return Colors.info;
            default:
            return Colors.success;
        }

    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backGround}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,padding:15}}>
          <View style={{padding:10,backgroundColor:Colors.white,flexDirection:"row",borderRadius:10,marginBottom:10}}>
            <View style={{width:"80%",}}>
              <Text style={{color:Colors.black,fontFamily:"Poppins_600SemiBold",textTransform:"uppercase",fontSize:16}}>{item.title}</Text>
              <Text style={{fontFamily:"Poppins_500Medium",textTransform:"capitalize",fontSize:12,}}>{item.category}</Text>
              <Text style={{fontSize:12,fontFamily:"Poppins_500Medium",color:Colors.purple,paddingBottom:10}}>{item.status}</Text>
              <OverlappingImages images={item.teamMembers.map(member => member.image)} />
            </View>
            <View style={{width:"20%",alignItems:"center",justifyContent:"center"}}>
              <Circle
                size={70}
                progress={item.percentage / 100}
                showsText={false}
                color={Colors.purple}
                thickness={4}
                unfilledColor="#f4ebfe"
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{`${item.percentage}%`}</Text>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:Colors.white,padding:10,flexDirection:"row",alignItems:"center"}}>
            <View style={{width:"80%"}}>
              <Text style={{fontFamily:"Poppins_500Medium"}}>Due Date</Text>
              <Text style={{fontFamily:"Poppins_400Regular",fontSize:13}}>Monday 20 August 2024</Text>
            </View>
            <View style={{width:"20%",alignItems:"flex-end"}}>
              <AntDesign name="calendar" size={24} color={Colors.grey} />
            </View>
          </View>
          <View style={{marginTop:10,marginBottom:10}}>
            <Text  style={{fontFamily:"Poppins_500Medium"}}>Description</Text>
            <Text style={{fontFamily:"Poppins_400Regular",fontSize:11,textAlign:"justify"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
          </View>
          <View>
            <View style={{width:"100%",justifyContent:"space-between",flexDirection:"row",marginBottom:10}}>
              <Text  style={{fontFamily:"Poppins_500Medium",}}>List Of Activities</Text>
              <TouchableOpacity>
                <Text style={{fontFamily:"Poppins_500Medium"}}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={taskData}
              keyExtractor={(item,index) => index.toString()}
              showsVerticalScrollIndicator= {false}
              renderItem={({item}) => (
              <Pressable style={{backgroundColor:Colors.white,flexDirection:"row",marginBottom:10,padding:10,}}>
                <View style={{width:"80%",flexDirection:"row",gap:10}}>
                  <AntDesign name={item.percentage === '100' ? "checkcircle": "checkcircleo"} size={24} color={Colors.success} />
                  <View>
                   <Text  style={{fontFamily:"Poppins_500Medium"}}>{item.taskTitle}</Text>
                   <Text style={{fontFamily:"Poppins_400Regular",fontSize:11,color:getStatusColor(item.status)}}>{item.status}</Text>
                  </View>
                </View>
                <View style={{width:"20%",alignItems:"flex-end"}}>
                  <Text  style={{fontFamily:"Poppins_500Medium"}}>5 days</Text>
                  <Text  style={{fontFamily:"Poppins_400Regular",fontSize:11,color:Colors.grey,}}>Time</Text>
                </View>
              </Pressable>
            )}/>
          </View>
          <View>
            <Text  style={{fontFamily:"Poppins_500Medium",marginBottom:5}}>Team Members</Text>
            <FlatList
              data={teamData}
              keyExtractor={(item,index) => index.toString()}
              showsVerticalScrollIndicator= {false}
              renderItem={({item}) => (
              <Pressable style={{backgroundColor:Colors.white,flexDirection:"row",marginBottom:10,padding:10,alignItems:"center"}}>
                <View style={{width:"80%",flexDirection:"row",gap:10,alignItems:"center"}}>
                  <Image source={item.image} style={{width:50,height:50,borderRadius:25}}/>
                  <View>
                    <Text  style={{fontFamily:"Poppins_500Medium"}}>{item.name}</Text>
                    <Text style={{fontFamily:"Poppins_400Regular",fontSize:11,color:Colors.grey}}>{item.role}</Text>
                  </View>
                </View>
                <View style={{width:"20%",alignItems:"flex-end",}}>
                  <Text  style={{fontFamily:"Poppins_500Medium"}}>{item.days} days</Text>
                  <Text  style={{fontFamily:"Poppins_400Regular",fontSize:11,color:Colors.grey,}}>Time</Text>
                </View>
              </Pressable>
            )}/>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={{backgroundColor:Colors.purple,padding:10,alignItems:"center",justifyContent:"center",margin:20,marginLeft:30,marginRight:30,borderRadius:5,flexDirection:"row",gap:5}} onPress={() => navigation.navigate("AddTask")}>
        <AntDesign name="plus" size={19} color={Colors.white} />
        <Text style={{fontFamily:"Poppins_600SemiBold",color:Colors.white}}>Complete</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}

export default ProjectDetails

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color:Colors.purple
    }
})