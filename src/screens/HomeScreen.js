import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "../../assets/Avatar.png";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Dessert");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  });

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (res?.data) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async (category = "Dessert") => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (res?.data) {
        setMeals(res.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-8"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={Avatar} style={{ height: hp(5), width: hp(5.5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Divyam
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400"> home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row item-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.8)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          <Recipes
            meals={meals.strMeals !== "Beef" && meals}
            categories={categories}
          />
        </View>
      </ScrollView>
    </View>
  );
}
