import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInputProps,
} from "react-native";
import React, { ChangeEvent, ReactEventHandler, useState } from "react";
import { hero, TaskPhoto, Google, hamburger } from "./assets";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/colors";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { TaskData } from "../Backend";
import { Store } from "../MobX/store";
import DatePicker from "react-native-date-picker";
const AddTask = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [isFocussed, setIsFocussed] = useState(false);
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState<TaskData>({
    name: "",
    tags: tags,
    category: "",
    dueDate: "",
    status: "pending",
    id: "",
    userId: "",
  });
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const handleChange = (name: string, value: string) => {
    setTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    // console.log("task", task);
  };

  const handleTagsInput = (props: TextInputProps) => {
    const text = props.nativeEvent?.text;
    // setTags((prevState) => {
    //   if(text==='') return prevState
    //   return [...prevState, text];
    // });
    task.tags.push(text);
    setTask((prevState) => {
      return {
        ...prevState,
      };
    });
    // // console.log("tags", tags);
    // console.log("task", task);
  };

  const deleteItem = (tag: string) => {
    const filteredTags = task.tags.filter((tagValue) => tagValue !== tag);
    setTask((prevState) => {
      return {
        ...prevState,
        tags: filteredTags,
      };
    });
  };

  const handleSubmit = () => {
    // Alert.alert("Success", "Task Added Successfully")
    console.log("Task at Addtask component", task);
    Store.addTask(task);
    setTask({
      name: "",
      tags: [],
      category: "",
      dueDate: "",
      status: "",
      id: "",
      userId: "",
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: "center" }}>
        <LinearGradient
          colors={[
            colors.formGradient,
            colors.formGradient2,
            colors.formGradient3,
          ]}
          style={styles.gradient}
        ></LinearGradient>
        <Image source={TaskPhoto} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Add New Task</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Task</Text>
          <TextInput
            placeholder="Task Name"
            style={styles.input}
            keyboardType="numeric"
            onFocus={() => setIsFocussed(!false)}
            onBlur={() => setIsFocussed(false)}
            value={task.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          {/* {isFocussed?(<Text>Hi I am isFocussed</Text>):<Text>I am not more</Text>} */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            placeholder="Category"
            style={styles.input}
            value={task.category}
            onChangeText={(text) => handleChange("category", text)}
          />
          <Text style={styles.label}>Tags</Text>
          <TextInput
            placeholder="Tags"
            style={styles.input}
            onSubmitEditing={handleTagsInput}
          />
          {task.tags.length !== 0 && (
            <ScrollView style={styles.tagsContainer} contentContainerStyle={styles.tagsContainer} horizontal={true}>
              {task.tags?.map((tag, index) => (
                <Text
                  key={index}
                  style={styles.tagsItem}
                  onPress={() => deleteItem(tag)}
                >
                  {tag},
                </Text>
              ))}
            </ScrollView>
          )}

          <Text style={styles.label}>Due Date</Text>
          <TextInput
            placeholder="Due Date"
            style={styles.input}
            value={task.dueDate}
            onChangeText={(text) => handleChange("dueDate", text)}
          />
          {/* <DatePicker date={date} onDateChange={setDate} /> */}

          <LinearGradient
            colors={[colors.taskBtn1, colors.taskBtn2]}
            style={{ borderRadius: 10, marginTop: 45 }}
          >
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.btnText}>Add Task</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 41,
    gap: 54,
    backgroundColor: colors.secondaryDashboard,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    height: 50,
    marginLeft: 9,
  },
  tagsItem: {
    color: "green",
  },
  heading: {
    fontFamily: "Roboto_500Medium",
    fontSize: 22,
    color: "#171725",
  },
  gradient: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.39,
    height: Dimensions.get("window").width * 0.39,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  button: {
    padding: 19,
    alignItems: "center",
    borderRadius: 45,
  },
  btnText: {
    color: "white",
    fontFamily: "Roboto_700Bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
  image: {
    width: 150,
    height: 150,
    top: 20,
    position: "absolute",
    zIndex: 2,
  },
  formContainer: {
    flex: 8,
    gap: 30,
  },
  form: {
    flex: 1,
    gap: 10,
    height: 100,
  },
  input: {
    height: 40,
    margin: 10,
    borderBottomWidth: 3,
    padding: 10,
    borderColor: "rgba(226, 226, 234, 1)",
  },
  label: {
    textTransform: "uppercase",
    color: colors.dashboardFont,
    fontFamily: "Roboto_400Regular",
  },
});
