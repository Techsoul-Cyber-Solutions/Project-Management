import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react';
import Toast,{BaseToast,ErrorToast,InfoToast} from 'react-native-toast-message';
import Colors from './Colors';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

const toastConfig =  {
    success: (props) => (
     <BaseToast
       {...props}
       style={styles.successStyle}
         text1Style={{
           fontSize: width>height ? height*.038:16,
           fontWeight: '500',
           color:Colors.success
         }}
         text2Style={{
           // fontSize:  width>height ? height*.032:width*.032,
           fontWeight: '400',
           color:Colors.grey
         }}
        //  renderLeadingIcon={() => (
        //    <AntDesign name="checkcircle" size={width>height ? height*.045:width*.045} color={Colors.successGreen} style={{}}/>
        //  )}
     />
    ),
    error: (props) => (
     <ErrorToast
       {...props}
       style={styles.errorStyle}
       text1Style={{
         fontSize: width>height ? height*.038:16,
         fontWeight: '500',
         color:Colors.danger
       }}
       text2Style={{
         // fontSize:  width>height ? height*.032:width*.032,
         fontWeight: '400',
         color:Colors.grey
       }}
    //    renderLeadingIcon={() => (
    //      <AntDesign name="infocirlce" size={width>height ? height*.045:width*.045} color={ Colors.red }style={{}}/>
    //    )}
     />
    ),
       
     
}

export default toastConfig

const styles = StyleSheet.create({
    successStyle:{
        borderLeftColor: Colors.success,
        backgroundColor:Colors.white,
        borderColor:Colors.success,
        borderWidth:0.5,
        width:width >height ? height*.8:width*.85 ,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    errorStyle:{
        borderLeftColor:Colors.danger,
        backgroundColor:Colors.white,
        borderColor:Colors.danger,
        borderWidth:0.5,
        width:width >height ? height*.8:width*.85 ,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    }
})