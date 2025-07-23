import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-50 p-6`}>
      <Text style={tw`text-3xl font-bold text-blue-800 mb-8`}>
        Swasti Parivartan Audits
      </Text>
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4 bg-white shadow-sm`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-6 bg-white shadow-sm`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={tw`w-full bg-blue-600 rounded-lg p-3 shadow-md`}
        onPress={onLogin}
      >
        <Text style={tw`text-white text-center font-semibold`}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
