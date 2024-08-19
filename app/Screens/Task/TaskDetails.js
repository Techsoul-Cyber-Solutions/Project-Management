import { StyleSheet, Text, View ,StatusBar,ScrollView, TouchableOpacity} from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle } from 'react-native-progress';
import Colors from '../../Constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';


const TaskDetails = ({route,navigation}) => {
  const {item} = route.params;
  console.log(item,"Item");
  const getPriorityColor = (priority) =>{
    switch(priority){
        case "Immediate":
            return Colors.danger;
        default:
            return Colors.warning;
    }
  }
   return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backGround}}>
       <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
       <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
           <View style={{flex:1,padding:15}}>
               <View style={{padding:10,backgroundColor:Colors.white,flexDirection:"row",borderRadius:10,marginBottom:10,elevation:2}}>
                    <View style={{width:"80%",}}>
                       <Text style={{color:Colors.black,fontFamily:"Poppins_600SemiBold",textTransform:"uppercase",fontSize:16}}>{item.taskTitle}</Text>
                       <Text style={{fontFamily:"Poppins_500Medium",textTransform:"capitalize",fontSize:12,}}>{item.projectTitle}</Text>
                       <Text style={{fontSize:12,fontFamily:"Poppins_500Medium",color:getPriorityColor(item.priority),paddingBottom:10}}>{item.priority}</Text>
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
               <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingTop:5}}>
                    <View style={{width:"45%",backgroundColor:Colors.white,alignItems:"center",justifyContent:"center",padding:10,elevation:2,borderRadius:5}}>
                       <View style={{paddingLeft:10,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5}}>
                         <AntDesign name="calendar" size={14} color={Colors.purple} />
                         <Text style={{fontFamily:"Poppins_500Medium",top:2,color:Colors.purple,fontSize:13}}>Start Date</Text>
                       </View>
                       <Text style={{fontFamily:"Poppins_400Regular",fontSize:10,color:Colors.black,left:8}}>20-04-2024</Text>
                    </View>
                    <View style={{width:"45%",backgroundColor:Colors.white,alignItems:"center",justifyContent:"center",padding:10,elevation:2,borderRadius:5}}>
                       <View style={{paddingLeft:10,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5}}>
                         <AntDesign name="calendar" size={14} color={Colors.purple} />
                         <Text style={{fontFamily:"Poppins_500Medium",top:2,color:Colors.purple,fontSize:13}}>Due Date</Text>
                       </View>
                       <Text style={{fontFamily:"Poppins_400Regular",fontSize:10,color:Colors.black,left:8}}>20-04-2024</Text>
                    </View>
               </View>
               <View style={{marginTop:10,marginBottom:10}}>
                  <Text  style={{fontFamily:"Poppins_500Medium"}}>Description</Text>
                  <Text style={{fontFamily:"Poppins_400Regular",fontSize:11,textAlign:"justify"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
               </View>

           </View>
       </ScrollView>
       {/* <TouchableOpacity style={{backgroundColor:Colors.purple,padding:10,alignItems:"center",justifyContent:"center",margin:20,marginLeft:30,marginRight:30,borderRadius:5,flexDirection:"row",gap:5}} onPress={() => navigation.navigate("AddTask")}>
         <AntDesign name="plus" size={19} color={Colors.white} />
         <Text style={{fontFamily:"Poppins_600SemiBold",color:Colors.white}}>Add Activity</Text>
       </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default TaskDetails

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