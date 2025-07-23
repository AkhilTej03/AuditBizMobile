import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import tw from "twrnc";

export default function ConfirmModal({ visible, onConfirm, onCancel, title }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white rounded-lg p-6 w-3/4 shadow-md`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>
            {title}
          </Text>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={tw`bg-blue-600 rounded-lg p-2 flex-1 mr-2`}
              onPress={onConfirm}
            >
              <Text style={tw`text-white text-center`}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-gray-400 rounded-lg p-2 flex-1 ml-2`}
              onPress={onCancel}
            >
              <Text style={tw`text-white text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
