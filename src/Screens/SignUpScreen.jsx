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
import { updateUserProfileList } from "../Redux/slices/EventAuthReducer";
import { useDispatch, useSelector } from "react-redux";
const SignUpScreen = () => {
  const { height, width } = Dimensions.get("screen");
  const dispatch = useDispatch();
  const { userProfileList } = useSelector((state) => state.eventAuth);
  const navigation = useNavigation();
  const onHandleSelectProfile = () => {
    navigation.navigate("Login");
    dispatch(
      updateUserProfileList([
        ...userProfileList,
        {
          id: 1,
        },
      ])
    );
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
        style={{ width, height: 400 }}
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
          height: 550,
          backgroundColor: "white",
          alignItems: "center",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"account-edit"}
            size={25}
            color={"#ef8906"}
          />
          <Text
            style={{
              color: "#ef8906",
              fontSize: 25,
              fontWeight: 800,
              marginVertical: 15,
              marginLeft: 5,
            }}
          >
            Sign Up
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
            leftIcon={<Icon name="mobile" size={24} color="+91-1298545457" />}
            label={"mobile"}
            placeholder="abc@gmail.com"
          />
          <Input
            leftIcon={<Icon name="lock" size={24} color="#ef8906" />}
            label={"password"}
            placeholder="Ainfd$875"
          />
          <Input
            leftIcon={<Icon name="lock" size={24} color="#ef8906" />}
            label={"Confirm password"}
            placeholder="Ainfd$875"
          />
          <Button
            onPress={onHandleSelectProfile}
            style={{ backgroundColor: "#ef8906", width: width - 100 }}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: "100%",
    position: "relative",
  },
});
