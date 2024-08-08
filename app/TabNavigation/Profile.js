import { StyleSheet, Text, View,StatusBar,ScrollView, Image, TouchableOpacity,Modal,Pressable,TextInput,ActivityIndicator, Dimensions } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

const {width,height} = Dimensions.get("screen");

const Profile = ({navigation}) => {
  const [changePwdModal,setChangePwdModal] = useState(false);
  const[confirmPassword,setConfirmPassword] = useState('');
  const [newPwd,setNewPwd] = useState('');
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [isLoading,setLoading] = useState(false);

 
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
           <TouchableOpacity style={{flexDirection:"row",padding:10,backgroundColor:Colors.white,borderRadius:10,alignItems:"center",justifyContent:"space-between",marginBottom:10}} onPress={() => setChangePwdModal(!changePwdModal)}>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={changePwdModal}
            onRequestClose={() => {
              setChangePwdModal(!changePwdModal);
            }}>
            <Pressable style={styles.centeredView} onPress={() => setChangePwdModal(false)}>
              <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Change Password</Text>
                <Text style={{fontFamily:"Poppins_400Regular"}}>New Password :</Text>
                <TextInput style={{marginTop:10,marginBottom:0,borderColor:Colors.grey,borderWidth:1,padding:10,paddingLeft:15,borderRadius:10,color:Colors.primary,backgroundColor:Colors.white,elevation:3, shadowColor: '#000',shadowOffset: { width: 0, height: 2,},shadowOpacity: 0.25,shadowRadius: 2,}} cursorColor={Colors.primary} onChangeText={setNewPwd} placeholder='Enter New Password' placeholderTextColor="#9DAABC"/>
                {newPwd.trim() === '' && confirmPassword !== '' && (
                  <Text style={{color:Colors.danger,top:5,left:10}}>Please Enter New Password</Text>
                )}
                <Text style={{fontFamily:"Poppins_400Regular",marginTop:15}}>Confirm Password :</Text>
                <View style={{marginTop:10,borderColor:Colors.grey,borderRadius:10,backgroundColor:Colors.white,elevation:3,borderWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between", shadowColor: '#000',shadowOffset: { width: 0, height: 2,},shadowOpacity: 0.25,shadowRadius: 2,marginBottom:30}}>
                  <TextInput style={{padding:10,color:Colors.primary,width:"80%",}} secureTextEntry={showConfirmPassword ? false:true}  cursorColor={Colors.primary} onChangeText={setConfirmPassword} placeholder='Enter Confirm Password' placeholderTextColor="#9DAABC">
                  </TextInput>
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} >
                    <Ionicons name={showConfirmPassword ?"eye" :"eye-off"} size={24} color="#9DAABC" style={{paddingRight:15}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonStyle} >
                  {isLoading ? 
                    <ActivityIndicator size={'large'} color={Colors.white}/>
                  :(
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 5,
    width:width*.9,
    paddingBottom:30,
    paddingTop:25,
    padding:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  modalHeading:{
  color:Colors.black,
  fontFamily:"Poppins_600SemiBold",
  textTransform:"uppercase",
  marginBottom:10
  // fontSize:16
  },
  buttonStyle:{
    backgroundColor:Colors.purple,
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    margin:20,
    marginLeft:30,
    marginRight:30,
    borderRadius:5,
    flexDirection:"row",
    gap:5,
    width:width>height?height*.6:width*.6,
    alignSelf:"center"
  },
  buttonText:{
    fontFamily:"Poppins_600SemiBold",
    color:Colors.white
  }
})