import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Video from "react-native-video";
import { bgVideo } from "../constant/images";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const { height, width } = Dimensions.get("screen");
  const navigation = useNavigation();
  const onHanldeCreateProfile = () => {
    navigation.navigate("CreateProfile");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1cd6ff",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Video
        source={bgVideo}
        paused={false}
        style={{ width, height }}
        repeat={true}
        fullscreen={true}
      />
      <View style={{ position: "absolute", top: 0, left: 0, padding: 15 }}>
        <AntDesign
          style={{ fontSize: 30, fontWeight: 800 }}
          name="back"
          color={"#ef8906"}
          onPress={() => navigation.navigate("Welcome")}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width,
          height: 450,
          backgroundColor: "white",
          alignItems: "center",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name={"login"} size={25} color={"#ef8906"} />
          <Text
            style={{
              color: "#ef8906",
              fontSize: 25,
              fontWeight: 800,
              marginVertical: 15,
              marginLeft: 5,
            }}
          >
            Login
          </Text>
        </View>

        <View
          style={{ width: width - 50, height: "100%", alignItems: "center" }}
        >
          <Input
            leftIcon={<AntDesign name="mail" size={24} color="#ef8906" />}
            label={"Mail"}
            placeholder="abc@gmail.com"
          />
          <Input
            leftIcon={<Icon name="lock" size={24} color="#ef8906" />}
            label={"password"}
            placeholder="Ainfd$875"
          />
          <Button
            onPress={onHanldeCreateProfile}
            style={{ backgroundColor: "#ef8906", width: width - 100 }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: "100%",
    position: "relative",
  },
});
