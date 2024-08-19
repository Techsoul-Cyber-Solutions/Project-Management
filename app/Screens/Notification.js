import { SafeAreaView, StyleSheet, Text, View ,StatusBar,ScrollView,Image,TouchableOpacity, Dimensions, FlatList, Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import Colors from '../Constants/Colors';
const {width,height} = Dimensions.get("screen");
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

 const notificationData = [{id:1,title:"Urgent work",content:"Complete Leap application within 5 days",time:'15:05 pm'},
  {id:2,title:"Urgent work",content:"Complete Leap application within 5 days",time:'15:05 pm'}
 ]
const Notification = ({navigation}) => {
  const [showNetInfo, setNetInfo] = useState(true);
// useEffect(() => {
  
// })
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backGround}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {notificationData.length === 0 ? (
            <>
             <Image source={require("../../assets/Images/notification1.png")} style={styles.image}/>
             <Text style={styles.title}>No Notifications Here</Text>
             <Text style={styles.subTitle}>You have no notifications right now.</Text>
             <Text style={styles.subTitle}>Come back later</Text>
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
              <Text style={styles.buttonText}>Back</Text>
             </TouchableOpacity> 
            </>
          ):(
            <>
              <Text style={styles.heading}>Notification</Text>
              <FlatList
                data={notificationData}
                keyExtractor={(item,index) =>index.toString()}
                showsVerticalScrollIndicator={false}
                style={{width:"100%",}}
                renderItem={({item}) => (
                  <View style={styles.notificationContainer}>
                    <Pressable style={styles.iconContainer}>
                      <MaterialIcons name="notifications-none" size={24} color={Colors.purple} />
                    </Pressable>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.subTitle}>{item.content}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  image:{
    width:80,
    height:80,
    marginBottom:10
  },
  title:{
    fontFamily:"Poppins_500Medium"
  },
  subTitle:{
    color:Colors.grey,
    fontSize:12,
    fontFamily:"Poppins_400Regular"
  },
  button:{
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
    width:width>height? height*.6:width*.6,
    marginTop:30
  },
  buttonText:{
    fontFamily:"Poppins_600SemiBold",
    color:Colors.white
  },
  time: {
    fontSize: 10,
    color: '#aaa',
    textAlign:"right",
    fontFamily:"Poppins_400Regular"
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderBottomColor: Colors.grey,
    gap:10,
    // margin:5,
    paddingTop:10,
    paddingLeft:5,
    paddingRight:10,
    paddingBottom:5
  },
  textContainer: {
    flex: 1,
    justifyContent:"center"
  },
  heading:{
    fontFamily:"Poppins_600SemiBold",
    alignSelf:"flex-start",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15
  },
  iconContainer:{
    backgroundColor:"#E1DEED",
     width: 48,
     height: 48,
     borderRadius: 24,
     alignItems: "center",
     justifyContent: "center"
  }
})