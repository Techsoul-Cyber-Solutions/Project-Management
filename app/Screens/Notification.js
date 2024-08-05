import { SafeAreaView, StyleSheet, Text, View ,StatusBar,ScrollView} from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1}}>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})