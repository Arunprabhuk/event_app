import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import { updateSplash } from "../Redux/slices/EventAuthReducer";

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let show = setTimeout(() => {
      dispatch(updateSplash(false));
    }, 3000);

    return () => {
      clearTimeout(show);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View>
        <AnimatedLottieView
          source={require("../Assets/json/splash.json")}
          autoPlay
          loop
          style={{ width: "80%" }}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
