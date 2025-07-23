import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

export default function AuditQuestion({ question, answer, setAnswer }) {
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setAnswer(result.assets[0].uri);
    }
  };

  switch (question.type) {
    case "yesno":
      return (
        <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}>
          <Text style={tw`text-gray-800 mb-2`}>{question.text}</Text>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-lg p-2 flex-1 mr-2 ${answer === "Yes" ? "bg-blue-700" : ""}`}
              onPress={() => setAnswer("Yes")}
            >
              <Text style={tw`text-white text-center`}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-lg p-2 flex-1 ml-2 ${answer === "No" ? "bg-blue-700" : ""}`}
              onPress={() => setAnswer("No")}
            >
              <Text style={tw`text-white text-center`}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case "rating":
      return (
        <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}>
          <Text style={tw`text-gray-800 mb-2`}>{question.text}</Text>
          <Picker
            selectedValue={answer || 0}
            onValueChange={setAnswer}
            style={tw`h-12`}
          >
            {[...Array(question.max + 1).keys()].map((i) => (
              <Picker.Item key={i} label={`${i}`} value={i} />
            ))}
          </Picker>
        </View>
      );
    case "image":
      return (
        <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}>
          <Text style={tw`text-gray-800 mb-2`}>{question.text}</Text>
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-lg p-2`}
            onPress={handleImagePick}
          >
            <Text style={tw`text-white text-center`}>Pick Image</Text>
          </TouchableOpacity>
          {answer && (
            <Image
              source={{ uri: answer }}
              style={tw`w-24 h-24 mt-2 rounded-lg`}
            />
          )}
        </View>
      );
    case "dropdown":
      return (
        <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}>
          <Text style={tw`text-gray-800 mb-2`}>{question.text}</Text>
          <Picker
            selectedValue={answer || ""}
            onValueChange={setAnswer}
            style={tw`h-12`}
          >
            <Picker.Item label="Select..." value="" />
            {question.options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      );
    default:
      return null;
  }
}
