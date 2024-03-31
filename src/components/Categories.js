import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(1500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.name == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            cat.strCategory !== "Beef" && (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                className="flex items-center space-y-1"
                style={{ paddingHorizontal: 8 }}
              >
                <View
                  className={"rounded-full p-[6px] " + activeButtonClass}
                  style={{ height: hp(8), width: hp(11) }}
                >
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(12), height: hp(8) }}
                    className="rounded-full p-8"
                  />
                </View>
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: hp(2), textAlign: "center" }}
                >
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            )
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
