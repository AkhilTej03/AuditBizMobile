import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
// import { uploadImageToSupabase } from "../utils/supabase";
import { uploadImageToS3 } from "../utils/s3Upload";
import Slider from "@react-native-community/slider";


export default function AuditQuestion({
  question,
  answer,
  setAnswer,
  questionNumber,
}) {
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);

  console.log(question, "question");

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const handleCameraCapture = async () => {
    // Ask for camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Camera permission is required to take pictures.");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      setUploading(true);
      let imageUrl;

      // Try Supabase first, fallback to S3 if it fails
      try {
        imageUrl = await uploadImageToS3(
          imageUri,
          `question_${question.id}_${Date.now()}.jpg`,
        );
        console.log("S3 fallback upload successful");
        // imageUrl = await uploadImageToSupabase(
        //   imageUri,
        //   `question_${question.id}_${Date.now()}.jpg`,
        // );
        // console.log("Supabase upload successful");
      } catch (supabaseError) {
        console.log(
          "Supabase upload failed, trying S3 failed:",
          supabaseError.message,
        );
        // imageUrl = await uploadImageToS3(
        //   imageUri,
        //   `question_${question.id}_${Date.now()}.jpg`,
        // );
        // console.log("S3 fallback upload successful");
      }

      console.log("question.image_capture", question.imageRequired);

      if (question.imageRequired) {
        setAnswer({
          ...answer,
          imageUrl: imageUrl,
          uri: imageUri, // Keep local URI for preview
        });
        setUploaded(true);
        console.log("Answer updated:", imageUrl);
      } else {
        setAnswer(imageUrl);
      }
    } catch (error) {
      Alert.alert("Upload Error", "Failed to upload image. Please try again.");
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const isAnswered =
    answer !== undefined &&
    answer !== null &&
    answer !== "" &&
    (typeof answer === "object"
      ? answer.value || answer.uri || answer.imageUrl
      : true);

  const getValue = () => {
    if (typeof answer === "object") {
      return answer.value || answer.uri || answer.imageUrl || "";
    }
    return answer || "";
  };

  const setValue = (value) => {
    if (question.imageRequired) {
      setAnswer({ ...answer, value: value });
    } else {
      setAnswer(value);
    }
  };

  switch (question.type) {
    case "multiple-choice":
      return (
        <View
          style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <View
              style={tw`rounded-full w-8 h-8 items-center justify-center mr-3`}
              style={{}}
            >
              {console.log("questionNumber", questionNumber)}
              <Text style={tw`font-bold text-sm`} style={{ color: "#ff5200" }}>
                {questionNumber + " ) "}
              </Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>
              {question.text}
            </Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>

          <View style={tw`flex-row flex-wrap gap-2 mb-3`}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={tw`rounded-xl p-3 border-2 ${getValue() === option ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-200"}`}
                onPress={() => setValue(option)}
              >
                <Text
                  style={tw`font-medium ${getValue() === option ? "text-blue-700" : "text-gray-700"}`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {question.imageRequired && (
            <>
              <View style={tw`flex-row gap-4 my-4`}>
                {/* Camera Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#ff520020",
                      borderWidth: 1.5,
                      borderColor: "#ff5200",
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleCameraCapture}
                  disabled={uploading}
                >
                  <Text style={[tw`font-semibold text-base`, { color: "#ff5200" }]}>
                    {uploading ? "⏳ Uploading..." : "Camera"}
                  </Text>
                </TouchableOpacity>

                {/* Gallery Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#f9fafb",
                      borderWidth: 1.5,
                      borderColor: "#e5e7eb",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleImagePick}
                  disabled={uploading}
                >
                  <Text style={tw`font-semibold text-base text-gray-700`}>
                    {uploading ? "⏳ Uploading..." : "Gallery"}
                  </Text>
                </TouchableOpacity>

              </View>



              {answer?.uri && (
                <View style={tw`items-center`}>
                  <Image
                    source={{ uri: answer.uri }}
                    style={tw`w-32 h-32 rounded-xl border border-gray-200`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-green-600 text-sm mt-2 font-medium`}>
                    {answer.imageUrl ? "Image uploaded ✓" : "Image captured ✓"}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      );

    case "rating":
      const fromValue = question?.range?.from || 1;
      const toValue = question?.range?.to || 5;
      const ratingOptions = [];
      for (let i = fromValue; i <= toValue; i++) {
        ratingOptions.push(i);
      }

      return (
        <View
          style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <View
              style={tw`rounded-full w-8 h-8 items-center justify-center mr-3`}
              style={{ backgroundColor: "#ff520020" }}
            >
              <Text style={tw`font-bold text-sm`} style={{ color: "#ff5200" }}>
                {questionNumber}
              </Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>
              {question.text}
            </Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-semibold text-gray-700`}>
              Rating: {getValue()}
            </Text>

            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={fromValue}
              maximumValue={toValue}
              step={1} // makes it snap to whole numbers
              value={getValue()}
              onValueChange={(val) => setValue(val)}
              minimumTrackTintColor="#facc15"   // yellow-400
              maximumTrackTintColor="#e5e7eb"   // gray-200
              thumbTintColor="#f59e0b"          // yellow-500
            />
          </View>
          <Text style={tw`text-center text-gray-500 text-xs mt-2`}>
            Tap to rate ({fromValue} = Poor, {toValue} = Excellent)
          </Text>

          {question.imageRequired && (
            <>
              <View style={tw`flex-row gap-4 my-4`}>
                {/* Camera Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#ff520020",
                      borderWidth: 1.5,
                      borderColor: "#ff5200",
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleCameraCapture}
                  disabled={uploading}
                >
                  <Text style={[tw`font-semibold text-base`, { color: "#ff5200" }]}>
                    {uploading ? "⏳ Uploading..." : "Camera"}
                  </Text>
                </TouchableOpacity>

                {/* Gallery Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#f9fafb",
                      borderWidth: 1.5,
                      borderColor: "#e5e7eb",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleImagePick}
                  disabled={uploading}
                >
                  <Text style={tw`font-semibold text-base text-gray-700`}>
                    {uploading ? "⏳ Uploading..." : "Gallery"}
                  </Text>
                </TouchableOpacity>


              </View>


              {answer?.uri && (
                <View style={tw`items-center`}>
                  <Image
                    source={{ uri: answer.uri }}
                    style={tw`w-32 h-32 rounded-xl border border-gray-200`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-green-600 text-sm mt-2 font-medium`}>
                    {answer.imageUrl ? "Image uploaded ✓" : "Image captured ✓"}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      );

    case "text":
      return (
        <View
          style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <View
              style={tw`rounded-full w-8 h-8 items-center justify-center mr-3`}
              style={{ backgroundColor: "#ff520020" }}
            >
              <Text style={tw`font-bold text-sm`} style={{ color: "#ff5200" }}>
                {questionNumber}
              </Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>
              {question.text}
            </Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>

          <TextInput
            style={tw`border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-800 mb-3`}
            placeholder="Enter your response..."
            placeholderTextColor="#6B7280"
            value={getValue()}
            onChangeText={setValue}
            multiline={true}
            numberOfLines={3}
          />

          {question.imageRequired && (
            <>
              <View style={tw`flex-row gap-4 my-4`}>
                {/* Camera Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#ff520020",
                      borderWidth: 1.5,
                      borderColor: "#ff5200",
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleCameraCapture}
                  disabled={uploading}
                >
                  <Text style={[tw`font-semibold text-base`, { color: "#ff5200" }]}>
                    {uploading ? "⏳ Uploading..." : "Camera"}
                  </Text>
                </TouchableOpacity>

                {/* Gallery Button */}
                <TouchableOpacity
                  style={[
                    tw`flex-1 rounded-xl py-4 px-3 items-center justify-center`,
                    {
                      backgroundColor: "#f9fafb",
                      borderWidth: 1.5,
                      borderColor: "#e5e7eb",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      opacity: uploading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleImagePick}
                  disabled={uploading}
                >
                  <Text style={tw`font-semibold text-base text-gray-700`}>
                    {uploading ? "⏳ Uploading..." : "Gallery"}
                  </Text>
                </TouchableOpacity>


              </View>

              {answer?.uri && (
                <View style={tw`items-center`}>
                  <Image
                    source={{ uri: answer.uri }}
                    style={tw`w-32 h-32 rounded-xl border border-gray-200`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-green-600 text-sm mt-2 font-medium`}>
                    {answer.imageUrl ? "Image uploaded ✓" : "Image captured ✓"}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      );

    case "image":
      return (
        <View
          style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <View
              style={tw`rounded-full w-8 h-8 items-center justify-center mr-3`}
              style={{ backgroundColor: "#ff520020" }}
            >
              <Text style={tw`font-bold text-sm`} style={{ color: "#ff5200" }}>
                {questionNumber}
              </Text>
            </View>
            <Text style={tw`text-gray-800 font-medium flex-1`}>
              {question.text}
            </Text>
            {isAnswered && <Text style={tw`text-green-500 text-lg`}>✓</Text>}
          </View>

          <View style={tw`flex-row gap-3 mb-3`}>
            <TouchableOpacity
              style={tw`flex-1 rounded-xl p-3 border ${uploading ? "opacity-50" : ""}`}
              style={{ backgroundColor: "#ff520020", borderColor: "#ff5200" }}
              onPress={handleCameraCapture}
              disabled={uploading}
            >
              <Text
                style={tw`text-center font-medium rounded-xl`}
                style={{ color: "#ff5200" }}
              >
                {uploading ? "⏳ Uploading..." : "📷 Camera"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-purple-100 rounded-xl p-3 border border-purple-200 ${uploading ? "opacity-50" : ""}`}
              onPress={handleImagePick}
              disabled={uploading}
            >
              <Text style={tw`text-purple-700 text-center font-medium`}>
                {uploading ? "⏳ Uploading..." : "🖼️ Gallery"}
              </Text>
            </TouchableOpacity>
          </View>

          {(answer?.uri || answer) && (
            <View style={tw`items-center`}>
              <Image
                source={{ uri: answer?.uri || answer }}
                style={tw`w-32 h-32 rounded-xl border border-gray-200`}
                resizeMode="cover"
              />
              <Text style={tw`text-green-600 text-sm mt-2 font-medium`}>
                {(typeof answer === "object" && answer?.imageUrl) ||
                  (typeof answer === "string" && answer.startsWith("http"))
                  ? "Image uploaded ✓"
                  : "Image captured ✓"}
              </Text>
            </View>
          )}
        </View>
      );

    default:
      return null;
  }
}
