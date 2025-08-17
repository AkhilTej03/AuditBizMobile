import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import tw from "twrnc";

const { width } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    onLogin(email, password).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <View style={tw`flex-1`}>
        {/* Gradient Background */}
        <View style={[tw`absolute inset-0`, {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }]} />
        
        {/* Background Pattern */}
        <View style={[tw`absolute inset-0 opacity-10`, {
          backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #fff 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }]} />

        <View style={tw`flex-1 justify-center items-center px-6`}>
          {/* Logo Section */}
          <View style={tw`items-center mb-12`}>
            <View style={[tw`rounded-full p-6 mb-6 shadow-2xl`, {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}>
              <Text style={tw`text-white text-4xl`}>🔍</Text>
            </View>
            <Text style={tw`text-white text-4xl font-bold text-center mb-2`}>
              Swasti Parivartan
            </Text>
            <Text style={tw`text-white text-xl font-medium text-center opacity-90 mb-1`}>
              Quality Audits
            </Text>
            <Text style={tw`text-white text-center opacity-75 text-sm`}>
              Professional inspection platform
            </Text>
          </View>

          {/* Login Form */}
          <View style={[tw`w-full max-w-sm rounded-3xl p-8 shadow-2xl`, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }]}>
            <Text style={tw`text-2xl font-bold text-gray-800 text-center mb-8`}>
              Welcome Back
            </Text>

            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-700 font-medium mb-2 ml-1`}>Email</Text>
              <TextInput
                style={[tw`w-full rounded-2xl p-4 bg-gray-50 text-gray-800 border-2`, 
                  focusedField === 'email' ? tw`border-blue-500 bg-white` : tw`border-gray-200`
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={tw`mb-8`}>
              <Text style={tw`text-gray-700 font-medium mb-2 ml-1`}>Password</Text>
              <TextInput
                style={[tw`w-full rounded-2xl p-4 bg-gray-50 text-gray-800 border-2`,
                  focusedField === 'password' ? tw`border-blue-500 bg-white` : tw`border-gray-200`
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[tw`w-full rounded-2xl p-4 shadow-lg mb-4`, 
                isLoading ? tw`opacity-70` : tw``,
                { backgroundColor: '#667eea' }
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`mt-2`}>
              <Text style={tw`text-blue-600 text-center font-medium`}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
