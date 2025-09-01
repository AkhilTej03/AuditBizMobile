import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import tw from "twrnc";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await onLogin(email, password);
    } catch (error) {
      setErrors({ general: "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-white`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow justify-center`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`px-6 py-8`}>
          {/* Header Section */}
          <View style={tw`items-center mb-12`}>
            {/* Logo Container */}
            <View style={tw`bg-orange-600 rounded-3xl p-6 mb-6 shadow-lg shadow-orange-600 shadow-opacity-20`}>
              <Text style={tw`text-white text-4xl`}>🏥</Text>
            </View>

            {/* Brand Text */}
            <Text style={tw`text-gray-900 text-4xl font-black tracking-tight text-center mb-2`}>
              Swasti Parivartan
            </Text>

            <Text style={tw`text-gray-500 text-center text-base font-medium`}>
              Quality Assurance Platform
            </Text>
          </View>

          {/* Welcome Message */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-gray-900 text-2xl font-black text-center mb-2`}>
              Welcome Back
            </Text>
            <Text style={tw`text-gray-500 text-center text-base`}>
              Sign in to continue your audits
            </Text>
          </View>

          {/* General Error Message */}
          {errors.general && (
            <View style={tw`bg-red-50 border border-red-200 rounded-2xl p-4 mb-6`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-6 h-6 bg-red-100 rounded-full items-center justify-center mr-3`}>
                  <Text style={tw`text-red-600 text-sm font-bold`}>!</Text>
                </View>
                <Text style={tw`text-red-700 font-medium flex-1`}>
                  {errors.general}
                </Text>
              </View>
            </View>
          )}

          {/* Email Input */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-3 ml-1`}>
              Email Address
            </Text>
            <View
              style={[
                tw`bg-gray-50 rounded-2xl border-2 overflow-hidden`,
                emailFocused
                  ? tw`border-orange-600 bg-orange-50`
                  : errors.email
                    ? tw`border-red-300 bg-red-50`
                    : tw`border-gray-200`
              ]}
            >
              <TextInput
                style={tw`p-4 text-gray-900 text-base font-medium`}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={handleEmailChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
                selectionColor="#ea580c"
              />
            </View>
            {errors.email && (
              <View style={tw`flex-row items-center mt-2 ml-1`}>
                <Text style={tw`text-red-600 text-sm font-medium`}>
                  {errors.email}
                </Text>
              </View>
            )}
          </View>

          {/* Password Input */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-3 ml-1`}>
              Password
            </Text>
            <View
              style={[
                tw`bg-gray-50 rounded-2xl border-2 overflow-hidden`,
                passwordFocused
                  ? tw`border-orange-600 bg-orange-50`
                  : errors.password
                    ? tw`border-red-300 bg-red-50`
                    : tw`border-gray-200`
              ]}
            >
              <TextInput
                style={tw`p-4 text-gray-900 text-base font-medium`}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={handlePasswordChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry
                selectionColor="#ea580c"
              />
            </View>
            {errors.password && (
              <View style={tw`flex-row items-center mt-2 ml-1`}>
                <Text style={tw`text-red-600 text-sm font-medium`}>
                  {errors.password}
                </Text>
              </View>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              tw`rounded-2xl p-5 shadow-lg mb-6 overflow-hidden relative`,
              isLoading
                ? tw`bg-orange-300`
                : tw`bg-orange-600 shadow-orange-600 shadow-opacity-25`
            ]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.9}
          >
            {/* Button Gradient Overlay */}
            {!isLoading && (
              <View
                style={[
                  tw`absolute inset-0`,
                  {
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)'
                  }
                ]}
              />
            )}

            <View style={tw`flex-row items-center justify-center relative z-10`}>

              <Text style={tw`text-white font-black text-lg tracking-wide`}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            style={tw`items-center py-3`}
            activeOpacity={0.7}
          >
            <Text style={tw`text-orange-600 font-semibold text-base`}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

        </View>

        {/* Footer */}
        <View style={tw`items-center pb-6`}>
          <Text style={tw`text-gray-400 text-sm font-medium`}>
            © 2025 Swasti Parivartan. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}