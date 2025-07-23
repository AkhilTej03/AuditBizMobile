import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function AuditList({ audits, onSelectAudit, onNavigate }) {
  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold text-blue-800 mb-4`}>
        Pending Audits
      </Text>
      <FlatList
        data={audits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white rounded-lg p-4 mb-3 shadow-md`}
            onPress={() => onSelectAudit(item)}
          >
            <Text style={tw`text-lg font-semibold text-blue-700`}>
              {item.type} Audit
            </Text>
            <Text style={tw`text-gray-600`}>Location: {item.location}</Text>
            <Text style={tw`text-gray-600`}>
              Expected Payout: ${item.expectedPayout}
            </Text>
            <Text style={tw`text-green-600 font-medium`}>
              Status: {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg p-3 flex-1 mr-2`}
          onPress={() => onNavigate("completed")}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Completed Audits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg p-3 flex-1 ml-2`}
          onPress={() => onNavigate("payouts")}
        >
          <Text style={tw`text-white text-center font-semibold`}>Payouts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
