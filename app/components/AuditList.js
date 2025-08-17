
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
    case "Pending": return "bg-orange-100 text-orange-800";
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "Completed": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function AuditList({ audits, onSelectAudit, onNavigate, onLogout, onRefresh, refreshing }) {
  const totalEarnings = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Enhanced Header with Gradient */}
      <View style={[tw`pt-12 pb-8 px-6`, {
        background: 'linear-gradient(135deg, #ff5200 0%, #ff8c00 100%)',
        shadowColor: '#ff5200',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
      }]}>
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-white text-3xl font-bold mb-1`}>
              Available Audits
            </Text>
            <Text style={tw`text-white text-sm opacity-90`}>
              Ready to earn • {audits.length} opportunities
            </Text>
          </View>
          <View style={tw`flex-row gap-3`}>
            <TouchableOpacity
              style={[tw`rounded-xl px-4 py-2.5 shadow-lg`, {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }]}
              onPress={onRefresh}
            >
              <Text style={tw`text-white font-bold text-sm`}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[tw`rounded-xl px-4 py-2.5 shadow-lg`, {
                backgroundColor: 'rgba(220, 38, 38, 0.9)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }]}
              onPress={onLogout}
            >
              <Text style={tw`text-white font-bold text-sm`}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Earnings Card */}
        <View style={[tw`rounded-2xl p-5 shadow-lg`, {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }]}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-white text-sm opacity-90 mb-1`}>
                Total Potential Earnings
              </Text>
              <Text style={tw`text-white text-2xl font-bold`}>
                ₹{totalEarnings.toLocaleString()}
              </Text>
            </View>
            <View style={[tw`rounded-full p-3`, {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }]}>
              <Text style={tw`text-white text-xl`}>💰</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Enhanced Quick Stats */}
      <View style={[tw`flex-row justify-between px-6 py-4 bg-white shadow-lg`, {
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6'
      }]}>
        <View style={tw`items-center flex-1`}>
          <View style={[tw`rounded-full p-3 mb-2`, { backgroundColor: '#dbeafe' }]}>
            <Text style={tw`text-blue-600 text-lg`}>📋</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-blue-600 mb-1`}>{audits.length}</Text>
          <Text style={tw`text-gray-600 text-xs font-medium`}>Available</Text>
        </View>
        <View style={tw`items-center flex-1`}>
          <View style={[tw`rounded-full p-3 mb-2`, { backgroundColor: '#dcfce7' }]}>
            <Text style={tw`text-green-600 text-lg`}>⏳</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-green-600 mb-1`}>0</Text>
          <Text style={tw`text-gray-600 text-xs font-medium`}>In Progress</Text>
        </View>
        <View style={tw`items-center flex-1`}>
          <View style={[tw`rounded-full p-3 mb-2`, { backgroundColor: '#f3e8ff' }]}>
            <Text style={tw`text-purple-600 text-lg`}>✅</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-purple-600 mb-1`}>0</Text>
          <Text style={tw`text-gray-600 text-xs font-medium`}>Today</Text>
        </View>
      </View>
      
      {/* Audit List */}
      <FlatList
        data={audits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || false}
            onRefresh={onRefresh}
            tintColor="#ff5200"
            colors={["#ff5200"]}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[tw`bg-white rounded-3xl p-6 mb-5 shadow-lg`, {
              borderWidth: 1,
              borderColor: '#f1f5f9',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4
            }]}
            onPress={() => onSelectAudit(item)}
            activeOpacity={0.7}
          >
            {/* Header Section */}
            <View style={tw`flex-row items-start mb-4`}>
              <View style={[tw`rounded-2xl p-4 mr-4 shadow-sm`, {
                backgroundColor: '#fff5f0',
                borderWidth: 1,
                borderColor: '#fed7aa'
              }]}>
                <Text style={tw`text-3xl`}>{getAuditIcon(item.type)}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>
                  {item.type} Audit
                </Text>
                <View style={[tw`px-3 py-1.5 rounded-full self-start`, {
                  backgroundColor: '#dcfce7',
                  borderWidth: 1,
                  borderColor: '#bbf7d0'
                }]}>
                  <Text style={tw`text-green-700 text-xs font-semibold`}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Location */}
            <View style={tw`flex-row items-center mb-4`}>
              <View style={[tw`rounded-lg p-2 mr-3`, { backgroundColor: '#f1f5f9' }]}>
                <Text style={tw`text-gray-600`}>📍</Text>
              </View>
              <Text style={tw`text-gray-700 flex-1 leading-5`} numberOfLines={2}>
                {item.location}
              </Text>
            </View>
            
            {/* Bottom Section */}
            <View style={[tw`flex-row justify-between items-center pt-4`, {
              borderTopWidth: 1,
              borderTopColor: '#f1f5f9'
            }]}>
              <View style={tw`flex-row items-center`}>
                <View style={[tw`rounded-lg p-2 mr-3`, { backgroundColor: '#f0fdf4' }]}>
                  <Text style={tw`text-green-600`}>💰</Text>
                </View>
                <View>
                  <Text style={tw`text-xs text-gray-500 mb-1`}>Earning</Text>
                  <Text style={tw`text-green-600 font-bold text-xl`}>
                    ₹{item.expectedPayout.toLocaleString()}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[tw`rounded-2xl px-6 py-3 shadow-lg`, {
                  background: 'linear-gradient(135deg, #ff5200 0%, #ff8c00 100%)',
                  backgroundColor: '#ff5200'
                }]}
                onPress={() => onSelectAudit(item)}
              >
                <Text style={tw`text-white font-bold text-sm`}>
                  Start Audit →
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      
      {/* Enhanced Bottom Navigation */}
      <View style={[tw`bg-white px-6 py-4 shadow-lg`, {
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8
      }]}>
        <View style={tw`flex-row justify-between gap-3`}>
          <TouchableOpacity
            style={[tw`rounded-2xl p-4 flex-1 shadow-sm`, {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
              backgroundColor: '#8b5cf6'
            }]}
            onPress={() => onNavigate("completed")}
            activeOpacity={0.8}
          >
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-lg mb-1`}>📋</Text>
              <Text style={tw`text-white font-bold text-sm`}>
                Completed
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`rounded-2xl p-4 flex-1 shadow-sm`, {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              backgroundColor: '#10b981'
            }]}
            onPress={() => onNavigate("payouts")}
            activeOpacity={0.8}
          >
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-lg mb-1`}>💳</Text>
              <Text style={tw`text-white font-bold text-sm`}>
                Payouts
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
