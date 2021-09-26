import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { Alert } from "react-native";

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    };
  }
  submitStory = () => {
    db.collection("stories").add({
      title: this.state.title,
      author: this.state.author,
      story: this.state.story,
    });
    this.setState({
      title: "",
      author: "",
      story: "",
    });
    Alert.alert("Submitted!");
  };
  render() {
    return (
      <KeyboardAvoidingView>
        <Header
          backgroundColor={"pink"}
          centerComponent={{
            text: "Write Story",
            style: {
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              justifyContent: "center",
            },
          }}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            placeholder={"title"}
            onChangeText={(text) => {
              this.setState({ title: text });
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"author"}
            onChangeText={(text) => {
              this.setState({ author: text });
            }}
          />
          <TextInput
            placeholder={"Write your story"}
            multiline
            style={[styles.inputBox, { height: 200 }]}
            onChangeText={(text) => {
              this.setState({ story: text });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.submitStory();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F3337",
    alignItems: "center",

    height: "100%",
  },
  inputBox: {
    marginTop: 20,
    width: "80%",
    height: 50,
    textAlign: "center",
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    width: "50%",
    height: 50,
    textAlign: "center",
    borderWidth: 0.5,
    backgroundColor: "grey",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
