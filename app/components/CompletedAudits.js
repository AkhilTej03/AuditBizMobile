
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";

const getAuditIcon = (type) => {
  switch (type) {
    case "Restaurant": return "🍽️";
    case "Hospital": return "🏥";
    case "Hotel": return "🏨";
    default: return "📋";
  }
};

export default function CompletedAudits({ audits, onSelectAudit, onNavigate }) {
  const totalEarnings = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-gradient-to-r from-green-600 to-emerald-600 pt-12 pb-6 px-4`}>
        <Text style={tw`text-white text-2xl font-bold mb-2`}>
          Completed Audits
        </Text>
        <View style={tw`bg-white bg-opacity-20 rounded-lg p-3`}>
          <Text style={tw`text-white text-sm opacity-90`}>
            Total Earnings
          </Text>
          <Text style={tw`text-white text-xl font-bold`}>
            ₹{totalEarnings}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={tw`bg-white p-4 shadow-sm`}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-green-600`}>{audits.length}</Text>
            <Text style={tw`text-gray-600 text-xs`}>Completed</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-blue-600`}>
              {audits.length > 0 ? Math.round(totalEarnings / audits.length) : 0}
            </Text>
            <Text style={tw`text-gray-600 text-xs`}>Avg. Earning</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-purple-600`}>100%</Text>
            <Text style={tw`text-gray-600 text-xs`}>Success Rate</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={audits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
            onPress={() => onSelectAudit(item)}
          >
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`bg-green-100 rounded-full p-3 mr-4`}>
                <Text style={tw`text-2xl`}>{getAuditIcon(item.type)}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>
                  {item.type} Audit
                </Text>
                <View style={tw`bg-green-100 rounded-full px-2 py-1 self-start mt-1`}>
                  <Text style={tw`text-green-800 text-xs font-medium`}>
                    ✓ {item.status}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-green-600 font-bold text-lg`}>
                ₹{item.expectedPayout}
              </Text>
            </View>
            
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-500 mr-2`}>📍</Text>
              <Text style={tw`text-gray-700 flex-1`}>{item.location}</Text>
            </View>
            
            <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100`}>
              <Text style={tw`text-gray-500 text-sm`}>
                Completed on {new Date().toLocaleDateString()}
              </Text>
              <TouchableOpacity style={tw`bg-blue-100 rounded-full px-3 py-1`}>
                <Text style={tw`text-blue-600 font-medium text-sm`}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={tw`items-center py-12`}>
            <Text style={tw`text-6xl mb-4`}>📋</Text>
            <Text style={tw`text-gray-800 text-lg font-medium mb-2`}>
              No Completed Audits
            </Text>
            <Text style={tw`text-gray-600 text-center`}>
              Complete your first audit to see it here
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
