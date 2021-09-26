import * as React from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { Header, SearchBar } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      search: "",
      allSearchStories: [],
    };
  }
  //search is glitchy, can be improved
  searchFilter = (text) => {
    var search = text.toLowerCase();

    this.state.stories.map((item) => {
      var itemLower = item.title.toLowerCase();
      if (itemLower.includes(search)) {
        if (!this.state.allSearchStories.includes(item)) {
          this.setState({
            allSearchStories: [...this.state.allSearchStories, item],
          });
        }
      }
    });
  };
  retrieveStories = async () => {
    var stories = await db.collection("stories").get();
    stories.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      this.setState({
        stories: [...this.state.stories, doc.data()],
      });
    });
  };

  componentDidMount() {
    this.retrieveStories();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="pink"
          centerComponent={{
            text: "Read Story",
            style: {
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              justifyContent: "center",
            },
          }}
        />
        <SearchBar
          style={{ width: "100%" }}
          placeholder="type to search"
          value={this.state.search}
          onChangeText={(text) => {
            this.setState({
              allSearchStories: [],
              search: text,
            });
            this.searchFilter(text);
          }}
        />

        {this.state.stories.length !== 0 ? (
          this.state.search.length !== 0 ? (
            <FlatList
              data={this.state.allSearchStories}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 2,
                      display: "flex",
                      flexDirection: "row",
                      margin: 10,
                    }}
                  >
                    <Ionicons name="book" size={32} color="white" />
                    <View style={{}}>
                      <Text style={styles.displayText}>
                        Title : {item.title}
                      </Text>

                      <Text style={styles.displayText}>
                        Author : {item.author}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <FlatList
              data={this.state.stories}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 2,
                      display: "flex",
                      flexDirection: "row",
                      margin: 10,
                    }}
                  >
                    <Ionicons name="book" size={32} color="white" />
                    <View style={{}}>
                      <Text style={styles.displayText}>
                        Title : {item.title}
                      </Text>

                      <Text style={styles.displayText}>
                        Author : {item.author}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        ) : (
          <View>
            <Text>wait....</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F3337",
    justifyContent: "center",
    height: "100%",
  },
  displayText: {
    fontSize: 20,
    color: "white",
    marginLeft: 20,
    marginBottom: 10,
  },
});
