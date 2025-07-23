import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed": return "bg-green-100 text-green-800";
    case "Processing": return "bg-blue-100 text-blue-800";
    case "Pending": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Completed": return "✅";
    case "Processing": return "⏳";
    case "Pending": return "⏸️";
    default: return "❓";
  }
};

export default function PayoutScreen({ payouts, onNavigate }) {
  const totalCompleted = payouts.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0);
  const totalProcessing = payouts.filter(p => p.status === "Processing").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payouts.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-green-600 pt-12 pb-6 px-4`}>
        <Text style={tw`text-white text-2xl font-bold mb-4`}>
          Payouts Overview
        </Text>

        {/* Summary Cards */}
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`bg-green-700 rounded-lg p-3 flex-1 mr-2`}>
            <Text style={tw`text-white text-xs`}>Completed</Text>
            <Text style={tw`text-white text-lg font-bold`}>₹{totalCompleted}</Text>
          </View>
          <View style={tw`bg-green-700 rounded-lg p-3 flex-1 mx-1`}>
            <Text style={tw`text-white text-xs`}>Processing</Text>
            <Text style={tw`text-white text-lg font-bold`}>₹{totalProcessing}</Text>
          </View>
          <View style={tw`bg-green-700 rounded-lg p-3 flex-1 ml-2`}>
            <Text style={tw`text-white text-xs`}>Pending</Text>
            <Text style={tw`text-white text-lg font-bold`}>₹{totalPending}</Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={tw`flex-row justify-between px-4 py-3 bg-white shadow-sm`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-green-600`}>{payouts.length}</Text>
          <Text style={tw`text-gray-600 text-xs`}>Total Audits</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-blue-600`}>
            {payouts.filter(p => p.status === "Processing").length}
          </Text>
          <Text style={tw`text-gray-600 text-xs`}>Processing</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-orange-600`}>
            {payouts.filter(p => p.status === "Pending").length}
          </Text>
          <Text style={tw`text-gray-600 text-xs`}>Pending</Text>
        </View>
      </View>

      {/* Payouts List */}
      <FlatList
        data={payouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`bg-gray-100 rounded-full p-2 mr-3`}>
                  <Text style={tw`text-lg`}>{getStatusIcon(item.status)}</Text>
                </View>
                <View>
                  <Text style={tw`text-lg font-bold text-gray-800`}>
                    Audit #{item.auditId}
                  </Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <View style={tw`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      <Text style={tw`text-xs font-medium`}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={tw`text-2xl font-bold text-green-600`}>
                ₹{item.amount}
              </Text>
            </View>

            <View style={tw`border-t border-gray-100 pt-3`}>
              <Text style={tw`text-gray-600 text-sm`}>
                {item.status === "Completed" && "Payment processed successfully"}
                {item.status === "Processing" && "Payment being processed"}
                {item.status === "Pending" && "Audit completed, payment pending"}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={tw`bg-white border-t border-gray-200 px-4 py-3 shadow-lg`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-blue-600 rounded-xl p-4 flex-1 mr-2`}
            onPress={() => onNavigate("audits")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              🏠 Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-purple-600 rounded-xl p-4 flex-1 ml-2`}
            onPress={() => onNavigate("completed")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              📋 Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}