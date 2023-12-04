import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Calendar } from "react-native-calendars";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Slider, Switch } from "react-native-elements";
import { TextInput } from "react-native-paper";
import Swiper from "react-native-deck-swiper";
import { profileData } from "../data/profileData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProfileAction,
  updateUserData,
  updateUserProfileList,
} from "../Redux/slices/EventAuthReducer";
import Toast from "react-native-toast-message";

const initialState = () => {
  return {
    Name: "",
    Grade: "",
    Age: "",
    Gender: "",
    "Date Of Birth": "",
    Nationality: "",
    "Building Name": "",
    "Room Number": "",
    "Parent/Gurdian Name": "",
    "Parent/Gurdian Number": "",
    Relationship: "",

    value: 1,
  };
};

const EditProfileScreen = () => {
  const [state, setState] = useState(initialState());
  const { UserData, userProfileList, loginData, userDetails } = useSelector(
    (state) => state.eventAuth
  );

  const useSwiper = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { value } = state;
  const { height, width } = Dimensions.get("screen");
  const onHandleChange = (text, name) => {
    setState((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const interpolate = (start, end) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 205);
    let b = interpolate(250, 255);
    return `rgb(${r},${g},${b})`;
  };
  const onSwiped = (type) => {};
  const onClickBack = () => {
    useSwiper.current.swipeBack();
    setState((prev) => ({
      ...prev,
      value: prev.value - 1,
    }));
  };
  const onClickNext = () => {
    useSwiper.current.swipeRight();
    setState((prev) => ({
      ...prev,
      value: prev.value + 1,
    }));
  };
  const OnSubmit = async () => {
    if (state.Name !== "") {
      const newData = {
        id: route.params.id,
        name: state.Name,
        age: state.Age,
        grade: state.Grade,
        DOB: state["Date Of Birth"],
        gender: state.Gender,
        nationality: state.Nationality,
        buildingName: state["Building Name"],
        roomNumber: state["Room Number"],
        emergencyContact: {
          name: state["Parent/Gurdian Name"],
          number: state["Parent/Gurdian Number"],
          relationShip: state.Relationship,
        },
        token: loginData.token,
      };
      const updatedArray = userProfileList.map((item) => {
        if (item.id === route.params.id) {
          return { ...item, ...newData };
        }
        return item;
      });

      dispatch(updateUserProfileList(updatedArray));
      dispatch(AddProfileAction(newData));
      navigation.navigate("CreateProfile");
    } else {
      Toast.show({
        type: "WarningToast",
        text1: "Name is Rquired",
      });
    }

    // navigation.navigate("UserDashBoard");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ width: width - 40 }}>
        <Slider
          value={value}
          onValueChange={(value) => {
            setState((prev) => ({
              ...prev,
              value,
            }));
          }}
          allowTouchTrack={false}
          disabled={true}
          maximumValue={9}
          minimumValue={1}
          trackStyle={{ height: 10, backgroundColor: "transparent" }}
          thumbStyle={{ height: 40, width: 40, backgroundColor: color() }}
          thumbProps={{
            children: (
              <FontAwesome5
                name="smile"
                size={30}
                reverse
                color={"white"}
                style={{ top: 5, left: 5 }}
                disabled={true}
              />
            ),
          }}
        />
      </View>
      <View style={{ width: width - 10, height: 50 }}>
        <Swiper
          ref={useSwiper}
          stackScale={20}
          cards={profileData}
          renderCard={(card) => {
            return (
              <View
                style={{
                  borderRadius: 40,
                  borderWidth: 2,
                  borderColor: "#E8E8E8",
                  marginTop: 10,
                  height: 450,
                  borderColor: color(),
                  borderWidth: 1,
                  backgroundColor: "white",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    backgroundColor: color(),
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    color: "white",
                  }}
                >
                  {card.label}
                </Text>

                {card.type === "input" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: 300,
                    }}
                  >
                    {card.label === "Emergency Contact" ? (
                      <View>
                        <TextInput
                          style={{
                            width: width - 100,
                            color: "black",
                            fontSize: 18,
                            fontWeight: "700",
                            textTransform: "uppercase",
                            backgroundColor: "white",
                            marginBottom: 20,
                          }}
                          onChangeText={(text) =>
                            onHandleChange(text, "Parent/Gurdian Name")
                          }
                          placeholderTextColor={"grey"}
                          placeholder={"Parent/Gurdian Name"}
                          value={state[card.label]}
                        />
                        <TextInput
                          style={{
                            width: width - 100,
                            color: "black",
                            fontSize: 18,
                            fontWeight: "700",
                            textTransform: "uppercase",
                            backgroundColor: "white",
                            marginBottom: 20,
                          }}
                          name={card.label}
                          onChangeText={(text) =>
                            onHandleChange(text, "Relationship")
                          }
                          value={state[card.label]}
                          placeholderTextColor={"grey"}
                          placeholder={"Relationship"}
                        />
                        <TextInput
                          style={{
                            width: width - 100,
                            color: "black",
                            fontSize: 18,
                            fontWeight: "700",
                            textTransform: "uppercase",
                            backgroundColor: "white",
                            marginBottom: 20,
                          }}
                          name={card.label}
                          onChangeText={(text) =>
                            onHandleChange(text, "Parent/Gurdian Number")
                          }
                          value={state[card.label]}
                          placeholderTextColor={"grey"}
                          placeholder={"Parent/Gurdian Number"}
                        />
                      </View>
                    ) : (
                      <TextInput
                        style={{
                          width: width - 100,
                          color: "black",
                          fontSize: 18,
                          fontWeight: "700",
                          textTransform: "uppercase",
                          backgroundColor: "white",
                        }}
                        name={card.label}
                        onChangeText={(text) =>
                          onHandleChange(text, card.label)
                        }
                        value={
                          state[card.label] === "" ? null : state[card.label]
                        }
                        placeholder={card.label}
                        placeholderTextColor={"grey"}
                      />
                    )}
                  </View>
                )}
                {card.label === "Date Of Birth" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: 300,
                    }}
                  >
                    <TextInput
                      style={{
                        width: width - 100,
                        color: "black",
                        fontSize: 18,
                        fontWeight: "700",
                        textTransform: "uppercase",
                        backgroundColor: "white",
                      }}
                      onChangeText={(text) => onHandleChange(text, card.label)}
                      placeholder={"31/12/1999"}
                      placeholderTextColor={"grey"}
                    />
                  </View>
                )}
                {card.label === "Done" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: 300,
                    }}
                  >
                    <Text style={{ fontSize: 19, color: color() }}>
                      Click to upload details.
                    </Text>
                    <FontAwesome5
                      size={20}
                      color={color()}
                      name="long-arrow-alt-down"
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 60,
                    borderBottomLeftRadius: 40,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: value === 1 ? "grey" : color(),
                  }}
                  disabled={value === 1}
                  onPress={onClickBack}
                >
                  <FontAwesome5
                    color={"white"}
                    style={{ fontSize: 24 }}
                    name="hand-point-left"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 60,
                    borderBottomRightRadius: 40,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: value === 10 ? "grey" : color(),
                  }}
                  disabled={value === 10}
                  onPress={onClickNext}
                >
                  <FontAwesome5
                    style={{ fontSize: 24 }}
                    name="hand-point-right"
                    color={"white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 150,
                    height: 60,
                    position: "absolute",
                    bottom: 0,
                    right: 120,
                    backgroundColor: "white",
                  }}
                  onPress={OnSubmit}
                  disabled={value !== 10}
                >
                  <MaterialIcons
                    style={{ fontSize: 34 }}
                    name="done"
                    color={value === 10 ? "green" : "grey"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {}}
          onSwipedAll={() => {}}
          cardIndex={0}
          backgroundColor={"transparent"}
          stackSize={3}
          onSwipedLeft={() => onSwiped("left")}
          onSwipedRight={() => onSwiped("right")}
          onSwipedTop={() => onSwiped("top")}
          onSwipedBottom={() => onSwiped("bottom")}
        ></Swiper>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    width: 0,
    height: 60,
  },
});
