
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import tw from "twrnc";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('hostname/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        Alert.alert("Success", data.message);
        onLogin(data.user, data.token);
      } else {
        // Handle different error cases
        let errorMessage = data.error || 'Login failed';
        if (response.status === 404) {
          errorMessage = 'User not found';
        } else if (response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (response.status === 403) {
          errorMessage = 'Account not approved yet. Please contact administrator.';
        }
        Alert.alert("Login Failed", errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error", "Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-blue-900`}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
        style={tw`flex-1 justify-center items-center`}
        imageStyle={tw`opacity-20`}
      >
        <View style={tw`bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-2xl`}>
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
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mb-4 bg-white text-gray-800`}
            placeholder="Email Address"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mb-6 bg-white text-gray-800`}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={tw`w-full bg-blue-600 rounded-xl p-4 shadow-lg ${isLoading ? 'opacity-70' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>
              {isLoading ? "Signing In..." : "Sign In"}
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
