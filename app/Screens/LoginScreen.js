import { StyleSheet, Text, View,StatusBar,ScrollView,Keyboard,Platform,ActivityIndicator, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
import React ,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../Constants/Colors'
import {  useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,} from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import toastConfig from '../Constants/toastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("screen");

const LoginScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,});
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const [username,setUsername] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.purple}/>;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backGround, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size='large' color={Colors.purple} />
      </View>
    )
  }
  const handleLogin = async () =>{
    // console.log(username,password);
    if(username=== '' || password === ''){
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill the required fields.'
      });
      return;
    }
    try{
     if(username === 'emp' && password === 'password'){
      await AsyncStorage.setItem('username',username);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged In Successfully.'
      });
      console.log(username,"emp");
      navigation.navigate("HomeScreen",{username:username});
    } else if (username === 'admin' && password === 'password'){
      await AsyncStorage.setItem('username',username);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged In Successfully.'
      });
      console.log(username,"admin");
      navigation.navigate("HomeScreen",{username});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Data',
        text2: 'Please enter Correct Data.'
      });
    }
  } catch(error){
    console.log("Error storing username",error);
  }}
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.white}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'handled'}>
        <View style={{flex:1,padding:15,paddingTop:65}}>
          <Text style={styles.title}>Sign In</Text>
          <View style={{gap:5}}>
            <Text style={{fontFamily:"Poppins_500Medium"}}>Username</Text>
            <TextInput style={{backgroundColor:Colors.white,padding:10,elevation:2,borderRadius:10}} cursorColor={Colors.purple} placeholder='Enter Username' onChangeText={setUsername}/>
            <Text style={{fontFamily:"Poppins_500Medium",marginTop:10}}>password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={{width:"80%"}} cursorColor={Colors.purple} placeholder='Enter Password'  onChangeText={setPassword} secureTextEntry={showPassword ?false:true}/>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{width:"20%",alignItems:"flex-end"}}>
                <Ionicons name={showPassword ?"eye" :"eye-off"} size={24} color="#9DAABC" style={{paddingRight:15}} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Toast position='bottom' bottomOffset={20} config={toastConfig} />
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