import { StyleSheet, Text, View,SafeAreaView ,StatusBar,ScrollView} from 'react-native'
import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../Constants/Colors';

const CalendarScreen = () => {
    const [markedDates, setMarkedDates] = useState({
        'Project Management': { marked: true, dotColor: 'blue', activeOpacity: 0, status: 'Pending' },
        'Leap': { marked: true, dotColor: 'green', status: 'Completed' },
        // '2024-08-17': { marked: true, dotColor: 'red', status: 'Missed' },
      });

      const renderTaskList = () => {
        return Object.keys(markedDates).map(date => (
          <View key={date} style={styles.taskContainer}>
            <Text style={styles.taskDate}>{date}</Text>
            <Text style={[styles.taskStatus,{color:getPriorityColor(markedDates[date].status)}]}>{markedDates[date].status}</Text>
          </View>
        ));
      };
      const getPriorityColor = (priority) =>{
        switch(priority){
          case "Pending":
            return Colors.danger;
          default:
            return Colors.info;
        }
      }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backGround }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>My Schedule</Text>
          <Calendar
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: Colors.primary,
              todayTextColor: Colors.primary,
              dayTextColor: Colors.black,
              arrowColor: Colors.primary,
            }}
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
          />
          <View style={styles.taskListContainer}>
            {renderTaskList()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginVertical: 10,
  },
  taskListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.grey,
    backgroundColor:Colors.white,
    marginBottom:10,borderRadius:5,
    elevation:2
  },
  taskDate: {
    // fontSize: 16,
    fontFamily:"Poppins_500Medium"
  },
  taskStatus: {
    fontSize: 12,
    fontFamily:"Poppins_500Medium"
  },
})