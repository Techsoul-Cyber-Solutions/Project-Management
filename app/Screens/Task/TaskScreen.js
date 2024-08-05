import { ScrollView, StyleSheet, Text, View, TouchableOpacity,FlatList,StatusBar} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../Constants/Colors'

const TaskScreen = ({navigation}) => {
  const [filter, setFilter] = useState('All');

  const taskData = [
    { id: 1, taskTitle: "Fees management", projectTitle: "leap", priority: "Immediate", percentage: "80" },
    { id: 2, taskTitle: "Exam Management", projectTitle: "leap", priority: "Gradual", percentage: "100" },
    { id: 3, taskTitle: "Frontend Designing", projectTitle: "Project Management", priority: "Gradual", percentage: "100" }
  ];

  const filteredData = taskData.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Ongoing' && task.percentage !== "100") return true;
    if (filter === 'Completed' && task.percentage === "100") return true;
    return false;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Immediate":
        return Colors.danger;
      case "Gradual":
        return Colors.warning;
      default:
        return Colors.black;
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backGround }}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={[styles.filterButton, filter === 'All' && styles.activeFilter]} onPress={() => setFilter('All')}>
              <Text style={[styles.filterText,filter === 'All' && styles.activeText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, filter === 'Ongoing' && styles.activeFilter]} onPress={() => setFilter('Ongoing')}>
              <Text style={[styles.filterText,filter === 'Ongoing' && styles.activeText]}>Ongoing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, filter === 'Completed' && styles.activeFilter]} onPress={() => setFilter('Completed')}>
              <Text style={[styles.filterText,filter === 'Completed' && styles.activeText]}>Completed</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskContainer} onPress={() => navigation.navigate("TaskDetails",{item})}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.projectIcon}>
                    <Text style={styles.projectIconText}>{item.projectTitle.charAt(0)}</Text>
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.taskTitle}>{item.taskTitle}</Text>
                    <Text style={styles.projectTitle}>{item.projectTitle}</Text>
                  </View>
                </View>
                <Text style={[styles.priority, {color: getPriorityColor(item.priority)}]}>{item.priority}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    paddingLeft:20,
    paddingRight:20,
    // backgroundColor: Colors.white,
  },
  activeFilter: {
    backgroundColor: Colors.white,
  },
  filterText: {
    color: Colors.grey,
    fontFamily: "Poppins_500Medium",
  },
  activeText:{
    color: Colors.purple,
    fontFamily: "Poppins_600SemiBold",
  },
  taskContainer: {
    backgroundColor: Colors.white,
    marginBottom: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    margin: 2,
    paddingTop: 15,
    paddingBottom: 15,
  },
  projectIcon: {
    backgroundColor: Colors.purple,
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  projectIconText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 12,
  },
  priority: {
    paddingLeft: 15,
    textTransform: "uppercase",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
})