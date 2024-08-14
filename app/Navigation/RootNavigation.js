import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import TaskScreen from '../Screens/Task/TaskScreen';
import Colors from '../Constants/Colors';
import ProjectDetails from '../Screens/ProjectDetails';
import TaskDetails from '../Screens/Task/TaskDetails';
import AddTask from '../Screens/Task/AddTask';
import LoginScreen from '../Screens/LoginScreen';
import Notification from '../Screens/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeamMembers from '../Screens/TeamMembers';
import Clients from '../Screens/Clients';
import MemberDetails from '../Screens/Task/MemberDetails';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const checkUserType = async () => {
      try {
        setIsLoading(true)
        const username = await AsyncStorage.getItem('username');
        console.log(username,"username in rrot navigation");
        setUserType(username)
       console.log(userType,"UseerType in root");
      } catch (error) {
        console.log("Error fetching username from AsyncStorage", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(() =>{
      checkUserType();
    },[])

    useEffect(() => {
      console.log(userType, "UserType in root after update");
    }, [userType]);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName={userType === null ? "LoginScreen" : "HomeScreen"}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='TaskScreen' component={TaskScreen} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='ProjectDetails' component={ProjectDetails} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}} />
        <Stack.Screen name='TaskDetails' component={TaskDetails} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='AddTask' component={AddTask} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='Notification' component={Notification} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='TeamMembers' component={TeamMembers} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='Clients' component={Clients} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='MemberDetails' component={MemberDetails} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})