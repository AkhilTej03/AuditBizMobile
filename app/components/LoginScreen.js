
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import tw from "twrnc";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={tw`flex-1 bg-gradient-to-br from-blue-600 to-purple-700`}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
        style={tw`flex-1 justify-center items-center`}
        imageStyle={tw`opacity-20`}
      >
        <View style={tw`bg-white bg-opacity-95 rounded-3xl p-8 w-11/12 max-w-md shadow-2xl`}>
          <View style={tw`items-center mb-8`}>
            <View style={tw`bg-blue-600 rounded-full p-4 mb-4`}>
              <Text style={tw`text-white text-3xl font-bold`}>🏥</Text>
            </View>
            <Text style={tw`text-3xl font-bold text-gray-800 text-center`}>
              Swasti Parivartan
            </Text>
            <Text style={tw`text-xl text-blue-600 font-semibold text-center`}>
              Audits
            </Text>
            <Text style={tw`text-gray-600 text-center mt-2`}>
              Quality Assurance Platform
            </Text>
          </View>
          
          <TextInput
            style={tw`w-full border-2 border-gray-200 rounded-xl p-4 mb-4 bg-gray-50 text-gray-800 focus:border-blue-500`}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={tw`w-full border-2 border-gray-200 rounded-xl p-4 mb-6 bg-gray-50 text-gray-800 focus:border-blue-500`}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={tw`w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 shadow-lg`}
            onPress={onLogin}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>
              Sign In
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={tw`mt-4`}>
            <Text style={tw`text-blue-600 text-center font-medium`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
