import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import axios from "axios";

function Section({ children, title }) {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(props) {
  const isDarkMode = useColorScheme() === "dark";

  const [obj, setObj] = useState(null);
  const [list, setList] = useState([]);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getAxiosAction = () => {
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      console.log("response", response.data.info);
      if (response.status === 200) {
        setObj(response.data.info);
        setList(response.data.results);
      }


    }).catch(e => {
      console.error("error", e);
    });
  };
  useEffect(() => {
    getAxiosAction();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{ flex: 1, width: "100%" }}>
          {
            list.length > 0 ?
              list.map((item, index) => {
                return (
                  <Section key={index} title={"Nombre: "+item.name}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                      <View style={{flex:0,marginRight:10}}>
                        <Image style={{width:100,height:100}}
                               source={{uri:item.image}}/>
                      </View>

                      <View style={{flex:1,width:'100%'}}>
                        <Text style={styles.highlight}>Origen: {item.origin.name}</Text>
                        <Text style={styles.highlight}>Tipo:{item.type ?item.type : "--"}</Text>
                      </View>

                    </View>
                  </Section>
                );
              })
              :
              <Text>no ay </Text>
          }
        </View>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text>
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
