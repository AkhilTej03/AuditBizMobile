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

export default function CompletedAudits({ audits, onSelectAudit, onNavigate, onLogout }) {
  const totalEarned = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`pt-12 pb-6 px-4`} style={{backgroundColor: '#ff5200'}}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              style={tw`bg-purple-700 rounded-full p-2 mr-3`}
              onPress={() => onNavigate("audits")}
            >
              <Text style={tw`text-white text-lg`}>←</Text>
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold`}>
              Completed Audits
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-red-500 rounded-lg px-3 py-2`}
            onPress={onLogout}
          >
            <Text style={tw`text-white font-bold text-sm`}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`bg-purple-700 rounded-lg p-3`}>
          <Text style={tw`text-white text-sm`}>
            Total Earned
          </Text>
          <Text style={tw`text-white text-xl font-bold`}>
            ₹{totalEarned}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={tw`flex-row justify-between px-4 py-3 bg-white shadow-sm`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-purple-600`}>{audits.length}</Text>
          <Text style={tw`text-gray-600 text-xs`}>Completed</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-green-600`}>
            {audits.filter(a => a.type === "Restaurant").length}
          </Text>
          <Text style={tw`text-gray-600 text-xs`}>Restaurants</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-blue-600`}>
            {audits.filter(a => a.type === "Hospital").length}
          </Text>
          <Text style={tw`text-gray-600 text-xs`}>Hospitals</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-orange-600`}>
            {audits.filter(a => a.type === "Hotel").length}
          </Text>
          <Text style={tw`text-gray-600 text-xs`}>Hotels</Text>
        </View>
      </View>

      {/* Completed Audits List */}
      {audits.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center px-4`}>
          <View style={tw`bg-white rounded-2xl p-8 items-center shadow-sm`}>
            <Text style={tw`text-6xl mb-4`}>📋</Text>
            <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>
              No Completed Audits
            </Text>
            <Text style={tw`text-gray-600 text-center mb-6`}>
              Complete your first audit to see it here
            </Text>
            <TouchableOpacity
              style={tw`bg-blue-600 rounded-xl px-6 py-3`}
              onPress={() => onNavigate("audits")}
            >
              <Text style={tw`text-white font-bold`}>
                Start First Audit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
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
                <View style={tw`bg-purple-100 rounded-full p-3 mr-4`}>
                  <Text style={tw`text-2xl`}>{getAuditIcon(item.type)}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-800`}>
                    {item.type} Audit
                  </Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <View style={tw`px-2 py-1 rounded-full bg-green-100`}>
                      <Text style={tw`text-xs font-medium text-green-800`}>
                        Completed
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
                <View style={tw`bg-green-100 rounded-full px-4 py-2`}>
                  <Text style={tw`text-green-800 font-medium text-sm`}>
                    ✅ Earned
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

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