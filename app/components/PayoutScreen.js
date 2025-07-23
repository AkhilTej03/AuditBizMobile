
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Completed": return "bg-green-100 text-green-800 border-green-200";
    case "Failed": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending": return "⏳";
    case "Processing": return "🔄";
    case "Completed": return "✅";
    case "Failed": return "❌";
    default: return "📋";
  }
};

export default function PayoutScreen({ payouts, onNavigate }) {
  const totalEarnings = payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const pendingAmount = payouts
    .filter(p => p.status === "Pending")
    .reduce((sum, payout) => sum + payout.amount, 0);
  const completedAmount = payouts
    .filter(p => p.status === "Completed")
    .reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-gradient-to-r from-green-600 to-emerald-600 pt-12 pb-6 px-4`}>
        <Text style={tw`text-white text-2xl font-bold mb-4`}>
          Payouts & Earnings
        </Text>
        
        {/* Earnings Summary */}
        <View style={tw`bg-white bg-opacity-20 rounded-2xl p-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-white text-sm opacity-90`}>Total Earnings</Text>
            <Text style={tw`text-white text-2xl font-bold`}>₹{totalEarnings}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-lg font-bold`}>₹{completedAmount}</Text>
              <Text style={tw`text-white text-xs opacity-75`}>Received</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-lg font-bold`}>₹{pendingAmount}</Text>
              <Text style={tw`text-white text-xs opacity-75`}>Pending</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={tw`bg-white p-4 shadow-sm`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity style={tw`bg-blue-100 rounded-xl p-3 flex-1 mr-2`}>
            <Text style={tw`text-blue-600 text-center font-medium text-sm`}>
              💳 Withdraw
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-purple-100 rounded-xl p-3 flex-1 mx-1`}>
            <Text style={tw`text-purple-600 text-center font-medium text-sm`}>
              📊 Analytics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-orange-100 rounded-xl p-3 flex-1 ml-2`}>
            <Text style={tw`text-orange-600 text-center font-medium text-sm`}>
              📧 Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payout List */}
      <FlatList
        data={payouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}>
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <View style={tw`flex-row items-center flex-1`}>
                <View style={tw`bg-gray-100 rounded-full p-3 mr-4`}>
                  <Text style={tw`text-xl`}>{getStatusIcon(item.status)}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-800 font-bold text-lg`}>
                    Audit #{item.auditId}
                  </Text>
                  <Text style={tw`text-gray-600 text-sm`}>
                    Payment for completed audit
                  </Text>
                </View>
              </View>
              <Text style={tw`text-green-600 font-bold text-xl`}>
                ₹{item.amount}
              </Text>
            </View>
            
            <View style={tw`flex-row justify-between items-center pt-3 border-t border-gray-100`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                  <Text style={tw`text-xs font-medium`}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-gray-500 text-sm`}>
                {item.status === "Completed" ? "Received" : "Expected"} on {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={tw`items-center py-12`}>
            <Text style={tw`text-6xl mb-4`}>💳</Text>
            <Text style={tw`text-gray-800 text-lg font-medium mb-2`}>
              No Payouts Yet
            </Text>
            <Text style={tw`text-gray-600 text-center`}>
              Complete audits to start earning
            </Text>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={tw`bg-white border-t border-gray-200 px-4 py-3 shadow-lg`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-blue-600 rounded-xl p-4 flex-1 mr-2`}
            onPress={() => onNavigate("audits")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              📋 Pending Audits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-purple-600 rounded-xl p-4 flex-1 ml-2`}
            onPress={() => onNavigate("completed")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              ✅ Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
