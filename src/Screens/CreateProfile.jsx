import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  bg2,
  bg3,
  createProfile,
  createProfileBg,
  user,
} from "../constant/images";
import { Avatar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getUserDetailsAction,
  updateUserProfileList,
} from "../Redux/slices/EventAuthReducer";
import Toast from "react-native-toast-message";
import { Input } from "react-native-elements";
import EditProfileScreen from "./EditProfileScreen";
import { useNavigation } from "@react-navigation/native";

const CreateProfile = () => {
  const { height, width } = Dimensions.get("screen");
  const dispatch = useDispatch();
  const { userProfileList, loginData, showSplash, isLoading } = useSelector(
    (state) => state.eventAuth
  );
  const navigation = useNavigation();
  const onCreateProfile = () => {
    if (userProfileList.length > 3) {
      Toast.show({
        type: "WarningToast",
        text1: "Only four profiles per account",
      });
      return;
    }

    dispatch(
      updateUserProfileList([
        ...userProfileList,
        {
          id: userProfileList.length + 1,
        },
      ])
    );
  };
  const onHandleRemove = (id) => {
    const filterId = userProfileList.filter((item, index) => {
      return item.id !== id;
    });
    dispatch(updateUserProfileList([...filterId]));
  };
  const onEditProfile = (id) => {
    navigation.navigate("EditProfile", {
      id,
    });
  };
  useEffect(() => {
    dispatch(getUserDetailsAction(loginData.userId));
  }, []);

  return (
    <View>
      <View
        source={createProfileBg}
        style={{
          width,
          height,

          backgroundColor: "#1188E4",
          position: "relative",
        }}
      >
        <ImageBackground source={bg3} style={{ width, height: 450 }} />

        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            alignItems: "center",
            height: 500,
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
            How many{"   "}
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              Profiles ?
            </Text>
          </Text>
          <View
            style={{
              height: "100%",
              width: 300,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {userProfileList.length > 0 &&
              userProfileList.map((item, index) => {
                return (
                  <Pressable style={{ position: "relative" }} key={index}>
                    <View
                      style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        alignItems: "center",
                      }}
                    >
                      <Pressable
                        onPress={() =>
                          navigation.navigate("UserDashBoard", {
                            id: item.id,
                          })
                        }
                      >
                        <Avatar.Image
                          style={{ elevation: 10, shadowColor: "green" }}
                          size={70}
                          source={user}
                        />
                      </Pressable>
                      <Text
                        style={{
                          color: "grey",
                          fontWeight: 700,
                          textTransform: "capitalize",
                          marginVertical: 6,
                          color: "#A25C02",
                        }}
                      >
                        {item.name === undefined ? "user" : item.name}
                      </Text>
                    </View>
                    <Ionicons
                      onPress={() => onHandleRemove(item.id)}
                      name="close"
                      size={20}
                      color={"black"}
                      style={{ position: "absolute", right: 0 }}
                    />
                    <AntDesign
                      onPress={() => onEditProfile(index + 1)}
                      name="edit"
                      size={20}
                      color={"black"}
                      style={{ position: "absolute", right: 1, top: 55 }}
                    />
                  </Pressable>
                );
              })}
          </View>
          <Pressable
            style={{
              backgroundColor: "#eebf80",
              width,
              height: 50,
              bottom: 80,
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onCreateProfile}
          >
            <Ionicons
              style={{ marginHorizontal: 5 }}
              color={"white"}
              name="person-add"
              size={20}
            />
            <Text style={{ color: "white", fontWeight: 800, fontSize: 15 }}>
              Add Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({});
