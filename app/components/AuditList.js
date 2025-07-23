
import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

const getAuditIcon = (type) => {
  switch (type) {
    case "Restaurant": return "🍽️";
    case "Hospital": return "🏥";
    case "Hotel": return "🏨";
    default: return "📋";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending": return "bg-orange-100 text-orange-800";
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "Completed": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function AuditList({ audits, onSelectAudit, onNavigate }) {
  const totalEarnings = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-blue-600 pt-12 pb-6 px-4`}>
        <Text style={tw`text-white text-2xl font-bold mb-2`}>
          Pending Audits
        </Text>
        <View style={tw`bg-blue-700 rounded-lg p-3`}>
          <Text style={tw`text-white text-sm`}>
            Total Potential Earnings
          </Text>
          <Text style={tw`text-white text-xl font-bold`}>
            ₹{totalEarnings}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={tw`flex-row justify-between px-4 py-3 bg-white shadow-sm`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-blue-600`}>{audits.length}</Text>
          <Text style={tw`text-gray-600 text-xs`}>Available</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-green-600`}>0</Text>
          <Text style={tw`text-gray-600 text-xs`}>In Progress</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-purple-600`}>0</Text>
          <Text style={tw`text-gray-600 text-xs`}>Completed Today</Text>
        </View>
      </View>
      
      {/* Audit List */}
      <FlatList
        data={audits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white rounded-2xl p-5 mb-4 shadow-lg border border-gray-100`}
            onPress={() => onSelectAudit(item)}
          >
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`bg-blue-100 rounded-full p-3 mr-4`}>
                <Text style={tw`text-2xl`}>{getAuditIcon(item.type)}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>
                  {item.type} Audit
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
            
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`text-gray-500 mr-2`}>📍</Text>
              <Text style={tw`text-gray-700 flex-1`}>{item.location}</Text>
            </View>
            
            <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-gray-500 mr-2`}>💰</Text>
                <Text style={tw`text-green-600 font-bold text-lg`}>
                  ₹{item.expectedPayout}
                </Text>
              </View>
              <View style={tw`bg-blue-600 rounded-full px-4 py-2`}>
                <Text style={tw`text-white font-medium text-sm`}>
                  Start Audit
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      
      {/* Bottom Navigation */}
      <View style={tw`bg-white border-t border-gray-200 px-4 py-3 shadow-lg`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-purple-600 rounded-xl p-4 flex-1 mr-2`}
            onPress={() => onNavigate("completed")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              📋 Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-green-600 rounded-xl p-4 flex-1 ml-2`}
            onPress={() => onNavigate("payouts")}
          >
            <Text style={tw`text-white text-center font-bold`}>
              💳 Payouts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
