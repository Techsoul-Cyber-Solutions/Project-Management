import { StyleSheet, Text, View,StatusBar,ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = () => {
  return (
    <SafeAreaView style={{flex:1,}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,}}>
          <View style={{width:"100%",padding:20,flexDirection:"row",backgroundColor:Colors.white,}}>
            <View style={{width:"25%",alignItems:"center",justifyContent:"flex-end"}}>
              <Text style={{color:Colors.purple,fontFamily:"Poppins_600SemiBold",fontSize:15}}>3</Text>
              <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Completed Task</Text>
            </View>
            <View style={{width:"50%",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:100,height:100,borderRadius:75}} source={require('../../assets/Images/emp2.jpg')}/>
               <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Haseeb</Text>
               <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Web Developer</Text>
            </View>
            <View style={{width:"25%",alignItems:"center",justifyContent:"flex-end"}}>
              <Text style={{color:Colors.purple,fontFamily:"Poppins_600SemiBold",fontSize:15}}>3</Text>
              <Text style={{fontFamily:"Poppins_400Regular",fontSize:12}}>Ongoing Task</Text>
            </View>
          </View>
          <View style={{marginTop:10,padding:15}}>
           <TouchableOpacity style={{flexDirection:"row",padding:10,backgroundColor:Colors.white,borderRadius:10,alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{backgroundColor:"#E6E6FA",borderRadius:30,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                  <MaterialCommunityIcons name="folder-key-outline" size={24} color={Colors.purple} />
                </View>
                <Text style={{fontFamily:"Poppins_500Medium",paddingLeft:15}}>Reset Password</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.grey} />
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:"row",padding:10,backgroundColor:Colors.white,borderRadius:10,alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{backgroundColor:"#E6E6FA",borderRadius:30,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color={Colors.purple} />
                </View>
                <Text style={{fontFamily:"Poppins_500Medium",paddingLeft:15}}>Terms and Conditions</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.grey} />
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:"row",padding:10,backgroundColor:Colors.white,borderRadius:10,alignItems:"center",justifyContent:"space-between",}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{backgroundColor:"#E6E6FA",borderRadius:30,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                  <MaterialCommunityIcons name="shield-account-outline" size={24} color={Colors.purple} />
                </View>
                <Text style={{fontFamily:"Poppins_500Medium",paddingLeft:15}}>Privacy Policy</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.grey} />
           </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})