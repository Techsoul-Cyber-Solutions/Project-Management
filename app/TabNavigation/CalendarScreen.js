import { StyleSheet, Text, View,SafeAreaView ,StatusBar,ScrollView} from 'react-native'
import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../Constants/Colors';
import moment from 'moment';

const CalendarScreen = () => {
  const currentDate = moment().format('YYYY-MM-DD');
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [markedDates, setMarkedDates] = useState({
    [currentDate]: { color: "#E6E6FA", status: 'Today', projectName: 'Current Day',},
    '2024-09-17': { color: Colors.danger, status: 'Pending', projectName: 'Project Management',},
    '2024-07-30': { color: Colors.info, status: 'Completed', projectName: 'Leap',},
  });

  const renderTaskList = () => {
    return Object.keys(markedDates).filter(date => date !== currentDate).map(date => (
      <View key={date} style={styles.taskContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
          <Text style={styles.taskDate}>{markedDates[date].projectName}</Text>
          <Text style={[styles.taskStatus, { color: getPriorityColor(markedDates[date].status) }]}>{markedDates[date].status}</Text> 
        </View> 
        <Text style={{fontSize:12,color:Colors.grey}}>{date}</Text>
       </View>
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Pending":
        return Colors.danger;
      default:
        return Colors.info;
    }
  };

  const renderCustomDay = ({ date, state }) => {
    const dayString = date.dateString;
    const isMarked = markedDates[dayString];
    const isCurrentDate = dayString === currentDate;
    const backgroundColor = isMarked ? markedDates[dayString].color : 'transparent';
    const textColor = isCurrentDate ? Colors.purple : isMarked  ? 'white' : state === 'disabled' ? Colors.grey : Colors.black; 
    return (
      <View style={[styles.customDayContainer, { backgroundColor }]}>
        <Text style={[styles.customDayText, { color: textColor }]}>
          {date.day}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backGround }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1,padding:15 }}>
          <Calendar
            dayComponent={renderCustomDay}
            markedDates={markedDates}
            markingType={'dot'}
            current={currentMonth}
            theme={{
              todayTextColor: Colors.purple,
              arrowColor: Colors.purple,
              selectedDayBackgroundColor: Colors.purple,
              selectedDayTextColor: Colors.purple,
              dayTextColor: Colors.black,
              monthTextColor: Colors.purple,
              todayBackgroundColor:Colors.purple
            }}
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
          />
          {Object.keys(markedDates).filter(date => date!== currentDate) .length > 0 && (
            <Text style={styles.header}>My Schedule</Text>
          )}
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
    // fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    // textAlign: 'center',
    marginVertical: 10,
    marginTop:20

  },
  taskListContainer: {
    // marginTop: 20,
    // paddingHorizontal: 20,
  },
  taskContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  taskDate: {
    fontFamily: "Poppins_500Medium",
  },
  taskStatus: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  customDayContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  customDayText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
})