import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { logout } from "../Redux/slices/EventAuthReducer";
import { useDispatch } from "react-redux";

export const HeaderLeft = ({ type, route }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        marginLeft: 10,
        height: 50,
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate(route)}
    >
      {type === "dashboard" && (
        <MaterialCommunityIcons
          name="view-dashboard-variant"
          color={"white"}
          size={30}
        />
      )}
      {type === "back" && (
        <MaterialCommunityIcons
          name="arrow-left-top"
          color={"white"}
          size={25}
        />
      )}
    </Pressable>
  );
};
export const HeaderRight = ({ type, set }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogOut = async () => {
    await AsyncStorage.removeItem("token");
    set(false);
    dispatch(logout());
  };
  return (
    <View style={{ marginRight: 30 }}>
      {type === "dashboard" && (
        <MaterialCommunityIcons
          onPress={onLogOut}
          name="power"
          color={"white"}
          size={25}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
