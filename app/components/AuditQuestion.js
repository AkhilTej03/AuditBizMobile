
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

export default function AuditQuestion({ question, answer, setAnswer, questionNumber }) {
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setAnswer(result.assets[0].uri);
    }
  };

  const handleCameraCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setAnswer(result.assets[0].uri);
    }
  };

  const isAnswered = answer !== undefined && answer !== null && answer !== "";

  switch (question.type) {
    case "yesno":
      return (
        <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3`}>
              <Text style={tw`text-blue-600 font-bold text-sm`}>{questionNumber}</Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>{question.text}</Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>
          <View style={tw`flex-row justify-between gap-3`}>
            <TouchableOpacity
              style={tw`flex-1 rounded-xl p-3 border-2 ${answer === "Yes" ? "bg-green-100 border-green-500" : "bg-gray-50 border-gray-200"}`}
              onPress={() => setAnswer("Yes")}
            >
              <Text style={tw`text-center font-medium ${answer === "Yes" ? "text-green-700" : "text-gray-700"}`}>
                ✅ Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 rounded-xl p-3 border-2 ${answer === "No" ? "bg-red-100 border-red-500" : "bg-gray-50 border-gray-200"}`}
              onPress={() => setAnswer("No")}
            >
              <Text style={tw`text-center font-medium ${answer === "No" ? "text-red-700" : "text-gray-700"}`}>
                ❌ No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    case "rating":
      return (
        <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3`}>
              <Text style={tw`text-blue-600 font-bold text-sm`}>{questionNumber}</Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>{question.text}</Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            {[...Array(question.max).keys()].map((i) => (
              <TouchableOpacity
                key={i + 1}
                style={tw`rounded-full w-12 h-12 items-center justify-center border-2 ${answer === i + 1 ? "bg-yellow-100 border-yellow-500" : "bg-gray-50 border-gray-200"}`}
                onPress={() => setAnswer(i + 1)}
              >
                <Text style={tw`font-bold ${answer === i + 1 ? "text-yellow-700" : "text-gray-700"}`}>
                  {i + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={tw`text-center text-gray-500 text-xs mt-2`}>
            Tap to rate (1 = Poor, {question.max} = Excellent)
          </Text>
        </View>
      );

    case "image":
      return (
        <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3`}>
              <Text style={tw`text-blue-600 font-bold text-sm`}>{questionNumber}</Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>{question.text}</Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>
          
          <View style={tw`flex-row gap-3 mb-3`}>
            <TouchableOpacity
              style={tw`flex-1 bg-blue-100 rounded-xl p-3 border border-blue-200`}
              onPress={handleCameraCapture}
            >
              <Text style={tw`text-blue-700 text-center font-medium`}>
                📷 Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-purple-100 rounded-xl p-3 border border-purple-200`}
              onPress={handleImagePick}
            >
              <Text style={tw`text-purple-700 text-center font-medium`}>
                🖼️ Gallery
              </Text>
            </TouchableOpacity>
          </View>
          
          {answer && (
            <View style={tw`items-center`}>
              <Image
                source={{ uri: answer }}
                style={tw`w-32 h-32 rounded-xl border border-gray-200`}
                resizeMode="cover"
              />
              <Text style={tw`text-green-600 text-sm mt-2 font-medium`}>
                Image captured ✓
              </Text>
            </View>
          )}
        </View>
      );

    case "dropdown":
      return (
        <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3`}>
              <Text style={tw`text-blue-600 font-bold text-sm`}>{questionNumber}</Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>{question.text}</Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>
          <View style={tw`border border-gray-200 rounded-xl bg-gray-50`}>
            <Picker
              selectedValue={answer || ""}
              onValueChange={setAnswer}
              style={tw`h-12`}
            >
              <Picker.Item label="Select an option..." value="" />
              {question.options.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>
      );

    default:
      return null;
  }
}
