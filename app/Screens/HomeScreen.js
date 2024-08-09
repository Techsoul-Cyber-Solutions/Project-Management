import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../TabNavigation/Home';
import Project from '../TabNavigation/Project';
import Profile from '../TabNavigation/Profile';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../Constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AddWork from '../TabNavigation/AddWork';
import Calendar from '../TabNavigation/CalendarScreen';
import CalendarScreen from '../TabNavigation/CalendarScreen';
const {width,height} = Dimensions.get("screen");

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
   <TabNavigation.Navigator screenOptions={{ tabBarShowLabel:false,}}>
     <TabNavigation.Screen name='Home' component={Home} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="home" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,},headerShown:false,tabBarShowLabel:false}}/>
     <TabNavigation.Screen name='Project' component={Project} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="profile" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}, headerLeft: () => <BackButton />,headerTintColor:Colors.white,tabBarShowLabel:false}}/>
     <TabNavigation.Screen name='Add Work' component={AddWork} 
       options={{
        tabBarIcon:({focused}) =>(
          <View style={{ backgroundColor:Colors.purple,elevation:2,width:55,borderRadius:30,height:55,alignItems:"center",justifyContent:"center",bottom:15}}>
            <AntDesign name="plus" size={20} color={Colors.white} style={{alignSelf:"center", }}  />
          </View>
        ),tabBarShowLabel:false,headerLeft: () => <BackButton />,headerTintColor:Colors.white
        // tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="plus" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}, headerLeft: () => <BackButton />,headerTintColor:Colors.white
      }}/>
     <TabNavigation.Screen name='CalendarScreen' component={CalendarScreen} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="calendar" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,},tabBarShowLabel:false,headerLeft: () => <BackButton />,headerTintColor:Colors.white,tabBarShowLabel:false}}  />
     
     <TabNavigation.Screen name='Profile' component={Profile} options={{tabBarActiveBackgroundColor:Colors.white,tabBarActiveTintColor:Colors.purple, tabBarInactiveTintColor:Colors.grey,tabBarIcon: (tabInfo) => { return( <AntDesign name="user" size={20} color={tabInfo.focused ? Colors.purple : Colors.tab} /> ) },tabBarLabelStyle: { marginBottom: 3, },tabBarIconStyle:{marginTop:2,}, headerLeft: () => <BackButton />,headerTintColor:Colors.white,tabBarShowLabel:false}}/>
    </TabNavigation.Navigator>
  )
}


export default HomeScreen

const styles = StyleSheet.create({})