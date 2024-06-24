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
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import React, { useRef, useState } from "react";
import { hero, TaskPhoto, Google, hamburger } from "./assets";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/colors";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { TaskData } from "../Backend";
import { Store } from "../MobX/store";
import DatePicker from "react-native-date-picker";
import { observer } from "mobx-react";
interface typeForCategoriesTags {
  name: string;
  id: string;
  userId: string;
}
const AddTask = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [isFocussed, setIsFocussed] = useState(false);
  const [date, setDate] = useState(new Date());
  const textInputRef = useRef<TextInput | undefined | null>(null);
  const [category, setCategory] = useState<typeForCategoriesTags[]>([]);
  const [tagsSuggestion, setTagsSuggestion] = useState<typeForCategoriesTags[]>(
    []
  );
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
    console.log(Store.categoryData);
    if (name === "dueDate") {
      console.log("value ", value);
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-indexed
      const year = date.getFullYear().toString();

      value = `${day}-${month}-${year}`;
      console.log("value: ", value);
    } else if (name === "category") {
      const filteredCategory = Store.categoryData.filter((data) => {
        return data.name.toLowerCase().includes(value.toLowerCase());
      });
      if (value === "") setCategory([]);
      else setCategory(filteredCategory);
    } else if (name === "tags") {
      const filteredCategory = Store.tagsData.filter((data) => {
        return data.name.toLowerCase().includes(value.toLowerCase());
      });
      if (value === "") setTagsSuggestion([]);
      else setTagsSuggestion(filteredCategory);
      return;
    }
    setTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    // console.log("task", task);
  };

  const handleTagsInput = (
    props?: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    name?: string
  ) => {
    const text = props?.nativeEvent?.text || name;
    // setTags((prevState) => {
    //   if(text==='') return prevState
    //   return [...prevState, text];
    // });
    if (text !== undefined) task.tags.push(text);
    setTask((prevState) => {
      return {
        ...prevState,
      };
    });
    // textInputRef.current?.hideResults = true;
    textInputRef.current?.clear();
    setTagsSuggestion([]);
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
    console.log("Task at Addtask component", task);
    Store.addTask(task);
    textInputRef.current?.clear();
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
            onFocus={() => setIsFocussed(!false)}
            onBlur={() => setIsFocussed(false)}
            value={task.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <Text style={styles.label}>Category</Text>
          <Autocomplete
            editable={true}
            autoCorrect={false}
            data={category}
            value={task.category}
            onChangeText={(text) => handleChange("category", text)}
            placeholder={"Category"}
            containerStyle={{ zIndex: 3 }}
            inputContainerStyle={styles.inputForCategoryTags}
            
            flatListProps={{
              style: {maxHeight: 200},
              keyExtractor: (item) => item.id,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionList}
                  onPress={() => {
                    handleChange("category", item.name), setCategory([]);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  {item.userId === Store.UserId && (
                    <Text
                      style={{
                        backgroundColor: "rgba(61, 213, 152, 0.2)",
                        color: "rgba(61, 213, 152, 1)",
                        textAlignVertical: "center",
                        padding: 5,
                      }}
                    >
                      Your Category
                    </Text>
                  )}
                </TouchableOpacity>
              ),
            }}
          />
          <Text style={styles.label}>Tags</Text>
          <Autocomplete
            editable={true}
            autoCorrect={false}
            data={tagsSuggestion}
            // value={task.category}
            onChangeText={(text) => handleChange("tags", text)}
            onSubmitEditing={handleTagsInput}
            placeholder={"Tags"}
            ref={textInputRef}
            containerStyle={{ zIndex: 2 }}
            inputContainerStyle={styles.inputForTags}
            // hideResults={true}
            flatListProps={{
              keyExtractor: (item) => item.id,
              style: {maxHeight: 200},
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionList}
                  onPress={() => {
                    handleTagsInput(undefined, item.name);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  {item.userId === Store.UserId && (
                    <Text
                      style={{
                        backgroundColor: "rgba(61, 213, 152, 0.2)",
                        color: "rgba(61, 213, 152, 1)",
                        textAlignVertical: "center",
                        padding: 5,
                      }}
                    >
                      Your Tags
                    </Text>
                  )}
                </TouchableOpacity>
              ),
            }}
          />
          {task.tags.length !== 0 && (
            <ScrollView
              style={styles.tagsContainer}
              contentContainerStyle={styles.tagsContainer}
              horizontal={true}
            >
              {task.tags?.map((tag, index) => (
                <Text
                  key={index}
                  style={styles.tagsItem}
                  onPress={() => deleteItem(tag)}
                >
                  #{tag},
                </Text>
              ))}
            </ScrollView>
          )}

          <Text style={styles.label}>Due Date</Text>
          <DatePicker
            date={date}
            onDateChange={(date) =>
              handleChange("dueDate", date.toDateString())
            }
            mode="date"
            style={{ height: 100 }}
            minimumDate={new Date()}
          />

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

export default observer(AddTask);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 41,
    backgroundColor: "#fff",
    gap:3,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
    fontFamily: "Poppins_600SemiBold",
    color: colors.dashboardFont,
  },
  suggestionList: {
    borderBottomWidth: 2,
    borderColor: "rgba(226, 226, 234, 1)",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 23,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    height: 22,
    marginLeft: 9,
  },
  tagsItem: {
    color: "green",
    fontSize: 16,
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
    marginTop:-29,
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
    top: -10,
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
    zIndex: 1,
  },
  inputForCategoryTags: {
    margin: 10,
    padding: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: "transparent",
    zIndex: 43,
    position: "relative",
  },
  inputForTags: {
    margin: 10,
    padding: 1,
    zIndex: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  label: {
    textTransform: "uppercase",
    color: colors.dashboardFont,
    fontFamily: "Roboto_400Regular",
    zIndex: 1,
  },
});
