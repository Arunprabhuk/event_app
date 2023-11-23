import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { bg2, createProfile, createProfileBg, user } from "../constant/images";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import Video from "react-native-video";
import AntDesign from "react-native-vector-icons/AntDesign";

const CreateProfile = () => {
  const { height, width } = Dimensions.get("screen");
  const { userProfileList } = useSelector((state) => state.eventAuth);
  console.log(userProfileList);
  return (
    <View>
      <View
        source={createProfileBg}
        style={{
          width,
          height,
          justifyContent: "center",
        }}
      >
        <Video
          source={bg2}
          paused={false}
          style={{ width: "100%", height, position: "relative" }}
          repeat={true}
          fullscreen={true}
          //   resizeMode={"cover"}
        />

        <View
          style={{
            position: "absolute",
            bottom: 30,
            backgroundColor: "white",
            alignItems: "center",
            height: 490,
            width,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            elevation: 93,
            shadowColor: "red",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "black",
              marginVertical: 20,
            }}
          >
            How Many{" "}
            <Text
              style={{
                color: "#ef8906",
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              Profiles?
            </Text>
          </Text>
          <View
            style={{
              height: height - 200,
              width: 300,
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Pressable>
              <View
                style={{
                  elevation: 5,
                  shadowColor: "#ef8906",
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}
              >
                <Avatar.Image size={70} source={user} />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: "salmon",
              width,
              height: 70,
              position: "absolute",
              bottom: 5,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({});
