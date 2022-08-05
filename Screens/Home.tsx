import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { TextInput, View,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
// import { style } from '../Style/styles';
import { routesType } from "../types/types";

const Home: FC = () => {
  const [lots, setLots] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<routesType>>();

  const handlePress = () => {
    navigation.navigate("Go Back", { lots: lots });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter number of parking slots..."
        placeholderTextColor="grey"
        keyboardType="numeric"
        onChangeText={(text) => setLots(Number(text))}
        style={styles.input}
      />
      <Button style={styles.button}
       disabled={lots == 0} 
       onPress={handlePress} 
       theme={{ colors: { primary: '#FFFFFF'}}}
       >Submit</Button>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        padding: 5,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 30,
        height: 50,
        width: "80%",
      },
      button:{
        height : 40,
        width : 100,
        justifyContent : "center",
        borderRadius : 20,
        backgroundColor :'#0000ff',
        marginTop: 30
       
      }
})