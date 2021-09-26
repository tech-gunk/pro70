import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate("ReadStory");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert("user dosen't exists");
            console.log("doesn't exist");
            break;
          case "auth/invalid-email":
            Alert.alert("incorrect email or password");
            console.log("invaild");
            break;
        }
      }
    } else {
      Alert.alert("enter email and password");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          placeholder={"Username"}
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.login(this.state.emailId, this.state.password);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F3337",
    justifyContent: "center",
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
