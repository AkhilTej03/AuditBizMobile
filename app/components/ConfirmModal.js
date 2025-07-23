
import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import tw from "twrnc";

export default function ConfirmModal({ visible, onConfirm, onCancel, title, message }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-4`}>
        <View style={tw`bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl`}>
          <View style={tw`items-center mb-6`}>
            <View style={tw`bg-blue-100 rounded-full p-4 mb-4`}>
              <Text style={tw`text-3xl`}>🚀</Text>
            </View>
            <Text style={tw`text-xl font-bold text-gray-800 text-center mb-2`}>
              {title}
            </Text>
            {message && (
              <Text style={tw`text-gray-600 text-center text-sm`}>
                {message}
              </Text>
            )}
          </View>
          
          <View style={tw`flex-row gap-3`}>
            <TouchableOpacity
              style={tw`bg-gray-200 rounded-2xl p-4 flex-1`}
              onPress={onCancel}
            >
              <Text style={tw`text-gray-700 text-center font-bold`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 flex-1`}
              onPress={onConfirm}
            >
              <Text style={tw`text-white text-center font-bold`}>
                Start Audit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
