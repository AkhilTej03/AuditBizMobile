import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
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
    case "Pending": return "bg-amber-50 border-amber-200 text-amber-700";
    case "In Progress": return "bg-blue-50 border-blue-200 text-blue-700";
    case "Completed": return "bg-emerald-50 border-emerald-200 text-emerald-700";
    default: return "bg-gray-50 border-gray-200 text-gray-700";
  }
};

const getTypeGradient = (type) => {
  switch (type) {
    case "Restaurant": return "#FF7A00";
    case "Hospital": return "#FF6600";
    case "Hotel": return "#FF8C42";
    default: return "#FF7A00";
  }
};

export default function AuditList({ audits, onSelectAudit, onNavigate, onLogout, onRefresh, refreshing }) {
  const totalEarnings = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);
  const pendingCount = audits.filter(a => a.status === "Scheduled").length;
  const inProgressCount = audits.filter(a => a.status === "In Progress").length;
  const completedTodayCount = audits.filter(a => a.status === "completed").length;

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header with Gradient */}
      <View style={tw`pt-14 pb-8 px-6 relative overflow-hidden`}>
        {/* Gradient Background */}
        <View 
          style={[
            tw`absolute inset-0`,
            {
              background: 'linear-gradient(135deg, #FF7A00 0%, #FF6600 50%, #FF8C42 100%)'
            }
          ]} 
        />
        
        {/* Header Content */}
        <View style={tw`relative z-10`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-black text-3xl font-black tracking-tight`}>
                Audit Tasks
              </Text>
              <Text style={tw`text-orange-600 text-sm font-medium mt-1`}>
                {audits.length} available tasks
              </Text>
            </View>
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl px-4 py-3 border border-white border-opacity-20`}
                onPress={onRefresh}
              >
                <Text style={tw`text-white font-semibold text-sm`}>↻</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-red-500 bg-opacity-90 rounded-2xl px-4 py-3`}
                onPress={onLogout}
              >
                <Text style={tw`text-white font-semibold text-sm`}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Earnings Card */}
          <View style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20`}>
            <Text style={tw`text-orange-600 text-sm font-medium mb-2`}>
              Total Potential Earnings
            </Text>
            <Text style={tw`text-black text-3xl font-black`}>
              ₹{totalEarnings.toLocaleString()}
            </Text>
            <View style={tw`flex-row items-center mt-2`}>
              <View style={tw`w-2 h-2 bg-green-400 rounded-full mr-2`} />
              <Text style={tw`text-orange-600 text-xs`}>
                Ready to claim
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={tw`px-6 -mt-4 mb-6 relative z-20`}>
        <View style={tw`bg-white rounded-3xl p-1 shadow-xl shadow-black shadow-opacity-5`}>
          <View style={tw`flex-row`}>
            <View style={tw`flex-1 items-center py-6`}>
              <Text style={tw`text-3xl font-black text-orange-600 mb-1`}>{pendingCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Available</Text>
            </View>
            <View style={tw`w-px bg-gray-100`} />
            <View style={tw`flex-1 items-center py-6`}>
              <Text style={tw`text-3xl font-black text-blue-600 mb-1`}>{inProgressCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Active</Text>
            </View>
            <View style={tw`w-px bg-gray-100`} />
            <View style={tw`flex-1 items-center py-6`}>
              <Text style={tw`text-3xl font-black text-emerald-600 mb-1`}>{completedTodayCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Today</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Audit Cards */}
      <FlatList
        data={audits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-6 pb-32`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || false}
            onRefresh={onRefresh}
            tintColor="#FF7A00"
            colors={["#FF7A00"]}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white rounded-3xl mb-4 shadow-lg shadow-black shadow-opacity-5 border border-gray-50 overflow-hidden`}
            onPress={() => onSelectAudit(item)}
            activeOpacity={0.95}
          >
            {/* Card Header with Gradient */}
            <View 
              style={[
                tw`p-6 pb-4`,
                { backgroundColor: getTypeGradient(item.type) + '08' }
              ]}
            >
              <View style={tw`flex-row items-center justify-between mb-3`}>
                <View style={tw`flex-row items-center`}>
                  <View 
                    style={[
                      tw`w-14 h-14 rounded-2xl items-center justify-center mr-4`,
                      { backgroundColor: getTypeGradient(item.type) + '15' }
                    ]}
                  >
                    <Text style={tw`text-2xl`}>{getAuditIcon(item.type)}</Text>
                  </View>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>
                      {item.type}
                    </Text>
                    <View style={tw`px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                      <Text style={tw`text-xs font-semibold uppercase tracking-wide`}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Card Body */}
            <View style={tw`px-6 pb-6`}>
              <View style={tw`flex-row items-center mb-4`}>
                <View style={tw`w-1 h-1 bg-gray-400 rounded-full mr-3`} />
                <Text style={tw`text-gray-600 flex-1 font-medium`}>
                  {item.location}
                </Text>
              </View>
              
              {/* Action Row */}
              <View style={tw`flex-row justify-between items-center`}>
                <View>
                  <Text style={tw`text-gray-500 text-xs font-medium mb-1`}>
                    Expected Payout
                  </Text>
                  <Text style={tw`text-2xl font-black text-gray-900`}>
                    ₹{item.expectedPayout.toLocaleString()}
                  </Text>
                </View>
                <View 
                  style={[
                    tw`rounded-2xl px-6 py-4 shadow-sm`,
                    { backgroundColor: getTypeGradient(item.type) }
                  ]}
                >
                  <Text style={tw`text-white font-bold text-sm`}>
                    Start →
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={tw`items-center justify-center py-20`}>
            <View style={tw`w-24 h-24 rounded-full bg-gray-50 items-center justify-center mb-4`}>
              <Text style={tw`text-4xl`}>📋</Text>
            </View>
            <Text style={tw`text-gray-900 text-xl font-bold mb-2`}>
              No Audits Available
            </Text>
            <Text style={tw`text-gray-500 text-center px-8`}>
              Check back later for new audit opportunities
            </Text>
          </View>
        )}
      />
      
      {/* Floating Bottom Navigation */}
      <View style={tw`absolute bottom-8 left-6 right-6`}>
        <View style={tw`bg-white rounded-3xl p-2 shadow-2xl shadow-black shadow-opacity-10 border border-gray-100`}>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              style={tw`bg-purple-600 rounded-2xl p-4 flex-1 items-center`}
              onPress={() => onNavigate("completed")}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-bold text-base mb-1`}>📊</Text>
              <Text style={tw`text-white font-semibold text-sm`}>
                History
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={tw`bg-emerald-600 rounded-2xl p-4 flex-1 items-center`}
              onPress={() => onNavigate("payouts")}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-bold text-base mb-1`}>💎</Text>
              <Text style={tw`text-white font-semibold text-sm`}>
                Earnings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}