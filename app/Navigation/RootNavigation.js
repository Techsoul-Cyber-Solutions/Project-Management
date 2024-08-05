import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
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

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='TaskScreen' component={TaskScreen} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='ProjectDetails' component={ProjectDetails} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}} />
        <Stack.Screen name='TaskDetails' component={TaskDetails} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='AddTask' component={AddTask} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
        <Stack.Screen name='Notification' component={Notification} options={{headerTitle:"",headerStyle: {backgroundColor: Colors.primary,},headerBackTitle:"Back",headerTintColor:Colors.purple,headerTitleStyle:{fontFamily:"Poppins_600SemiBold"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})