import { View, StatusBar, Image, Text } from "react-native";
import React, { useEffect } from "react";
import Welcome from "../../assets/Welcome.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ringOnepadding = useSharedValue(0);
  const ringTwopadding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ringOnepadding.value = 0;
    ringTwopadding.value = 0;
    setTimeout(
      () => (ringOnepadding.value = withSpring(ringOnepadding.value + hp(5))),
      200
    );
    setTimeout(
      () => (ringTwopadding.value = withSpring(ringTwopadding.value + hp(5.5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-600">
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ringTwopadding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ringOnepadding }}
        >
          <Image source={Welcome} style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest text-6xl"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest text-lg"
        >
          Food is always right!
        </Text>
      </View>
    </View>
  );
}
