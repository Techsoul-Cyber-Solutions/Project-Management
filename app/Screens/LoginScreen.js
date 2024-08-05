import { StyleSheet, Text, View,StatusBar,ScrollView,ActivityIndicator, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React ,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors'
import {  useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,} from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
const {width,height} = Dimensions.get("screen");

const LoginScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,});
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.purple}/>;
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.white}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,padding:15,paddingTop:65}}>
          {/* <View style={{width:100,height:100,borderRadius:50,borderWidth:1,borderColor:Colors.purple,alignItems:"center",justifyContent:"center",marginBottom:10,alignSelf:"center"}}>
            <View style={{width:80,height:80,borderRadius:40,alignSelf:"center",borderWidth:1,borderColor:Colors.purple,alignItems:"center",justifyContent:"center",}}>
              <Text style={{fontFamily:"Poppins_500Medium",fontSize:25,color:Colors.purple}}>B</Text>
            </View>
          </View> */}
          <Text style={styles.title}>Sign In</Text>
          <View style={{gap:5}}>
            <Text style={{fontFamily:"Poppins_500Medium"}}>Username</Text>
            <TextInput style={{backgroundColor:Colors.white,padding:10,elevation:2,borderRadius:10}} cursorColor={Colors.purple} placeholder='Enter Username'/>
            <Text style={{fontFamily:"Poppins_500Medium",marginTop:10}}>password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={{width:"80%"}} cursorColor={Colors.purple} placeholder='Enter Password'  onChangeText={setPassword} secureTextEntry={showPassword ?false:true}/>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{width:"20%",alignItems:"flex-end"}}>
                <Ionicons name={showPassword ?"eye" :"eye-off"} size={24} color="#9DAABC" style={{paddingRight:15}} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  button:{
    backgroundColor:Colors.purple,
    padding:10,
    borderRadius:10,
    marginTop:65,
    alignItems:"center",
    width:width>height? height * .6:width*.6,
    alignSelf:"center"
  },
  buttonText:{
    color:Colors.white,
    fontFamily:"Poppins_600SemiBold",
    fontSize:20
  },
  title:{
    color:Colors.purple,
    fontFamily:"Poppins_600SemiBold",
    fontSize:24,
    alignSelf:"center",
    paddingBottom:30,
    textTransform:"uppercase"
  },
  passwordContainer:{
    backgroundColor:Colors.white,
    padding:10,
    elevation:2,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"center"
  }
})