import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../TabNavigation/Home';
import Project from '../TabNavigation/Project';
import Chat from '../TabNavigation/Chat';
import Profile from '../TabNavigation/Profile';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../Constants/Colors';
import { useNavigation } from '@react-navigation/native';

const TabNavigation = createBottomTabNavigator();

const HomeScreen = () => {
  const BackButton = () => {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
        <AntDesign name="arrowleft" size={24} color={Colors.purple} />
      </TouchableOpacity>
    );
  };
  return (
   <TabNavigation.Navigator >
     <TabNavigation.Screen name='Home' component={Home} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="home" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,},headerShown:false}}/>
     <TabNavigation.Screen name='Project' component={Project} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="profile" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}, headerLeft: () => <BackButton />,headerTintColor:Colors.white}}/>
     <TabNavigation.Screen name='Chat' component={Chat} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="message1" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}}}/>
     <TabNavigation.Screen name='Profile' component={Profile} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="user" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}, headerLeft: () => <BackButton />,headerTintColor:Colors.white}}/>
    </TabNavigation.Navigator>
  )
}


export default HomeScreen

const styles = StyleSheet.create({})