import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function PayoutScreen({ payouts, onNavigate }) {
  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold text-blue-800 mb-4`}>Payouts</Text>
      <FlatList
        data={payouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}>
            <Text style={tw`text-gray-800`}>Audit ID: {item.auditId}</Text>
            <Text style={tw`text-gray-800`}>Amount: ${item.amount}</Text>
            <Text style={tw`text-gray-800`}>Status: {item.status}</Text>
          </View>
        )}
      />
      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg p-3 flex-1 mr-2`}
          onPress={() => onNavigate("audits")}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Pending Audits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg p-3 flex-1 ml-2`}
          onPress={() => onNavigate("completed")}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Completed Audits
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
