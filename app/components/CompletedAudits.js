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

const getTypeGradient = (type) => {
  switch (type) {
    case "Restaurant": return "#FF7A00";
    case "Hospital": return "#FF6600";
    case "Hotel": return "#FF8C42";
    default: return "#FF7A00";
  }
};

export default function CompletedAudits({ audits, onSelectAudit, onNavigate, onLogout }) {
  const totalEarned = audits.reduce((sum, audit) => sum + audit.expectedPayout, 0);
  const restaurantCount = audits.filter(a => a.type === "Restaurant").length;
  const hospitalCount = audits.filter(a => a.type === "Hospital").length;
  const hotelCount = audits.filter(a => a.type === "Hotel").length;

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
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View style={tw`flex-row items-center flex-1`}>
              <TouchableOpacity
                style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-3 mr-4 border border-white border-opacity-20`}
                onPress={() => onNavigate("audits")}
                activeOpacity={0.8}
              >
                <Text style={tw`text-black text-lg font-bold`}>←</Text>
              </TouchableOpacity>
              <View>
                <Text style={tw`text-black text-3xl font-black tracking-tight`}>
                  History
                </Text>
                <Text style={tw`text-orange-600 text-sm font-medium mt-1`}>
                  {audits.length} completed audits
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`bg-red-500 bg-opacity-90 rounded-2xl px-4 py-3`}
              onPress={onLogout}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-semibold text-sm`}>Logout</Text>
            </TouchableOpacity>
          </View>
          
          {/* Earnings Card */}
          <View style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text style={tw`text-orange-600 text-sm font-medium mb-2`}>
                  Total Earned
                </Text>
                <Text style={tw`text-black text-3xl font-black`}>
                  ₹{totalEarned.toLocaleString()}
                </Text>
              </View>
              <View style={tw`w-16 h-16 bg-emerald-500 bg-opacity-20 rounded-2xl items-center justify-center`}>
                <Text style={tw`text-2xl`}>💎</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center mt-4`}>
              <View style={tw`w-2 h-2 bg-emerald-400 rounded-full mr-2`} />
              <Text style={tw`text-orange-600 text-xs font-medium`}>
                Successfully completed
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      {/* <View style={tw`px-6 -mt-4 mb-6 relative z-20`}>
        <View style={tw`bg-white rounded-3xl p-6 shadow-xl shadow-black shadow-opacity-5`}>
          <Text style={tw`text-gray-900 text-lg font-bold mb-4`}>
            Audit Breakdown
          </Text>
          <View style={tw`flex-row flex-wrap gap-4`}>
            <View style={tw`flex-1 min-w-20 items-center`}>
              <View style={tw`w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>🍽️</Text>
              </View>
              <Text style={tw`text-2xl font-black text-orange-600 mb-1`}>{restaurantCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium text-center`}>Restaurants</Text>
            </View>
            <View style={tw`flex-1 min-w-20 items-center`}>
              <View style={tw`w-12 h-12 bg-red-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>🏥</Text>
              </View>
              <Text style={tw`text-2xl font-black text-red-600 mb-1`}>{hospitalCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium text-center`}>Hospitals</Text>
            </View>
            <View style={tw`flex-1 min-w-20 items-center`}>
              <View style={tw`w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>🏨</Text>
              </View>
              <Text style={tw`text-2xl font-black text-blue-600 mb-1`}>{hotelCount}</Text>
              <Text style={tw`text-gray-500 text-xs font-medium text-center`}>Hotels</Text>
            </View>
          </View>
        </View>
      </View> */}

      {/* Completed Audits List */}
      {audits.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View style={tw`bg-white rounded-3xl p-12 items-center shadow-lg shadow-black shadow-opacity-5 border border-gray-50`}>
            <View style={tw`w-24 h-24 bg-orange-50 rounded-full items-center justify-center mb-6`}>
              <Text style={tw`text-5xl`}>🎯</Text>
            </View>
            <Text style={tw`text-2xl font-black text-gray-900 mb-3 text-center`}>
              No Completed Audits
            </Text>
            <Text style={tw`text-gray-500 text-center mb-8 leading-relaxed`}>
              Your completed audits and earnings will appear here once you finish your first audit
            </Text>
            <TouchableOpacity
              style={[
                tw`rounded-2xl px-8 py-4 shadow-sm`,
                { backgroundColor: '#FF7A00' }
              ]}
              onPress={() => onNavigate("audits")}
              activeOpacity={0.9}
            >
              <Text style={tw`text-black font-bold text-base`}>
                Start Your First Audit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={audits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`px-6 pb-32`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-white rounded-3xl mb-4 shadow-lg shadow-black shadow-opacity-5 border border-gray-50 overflow-hidden`}
              onPress={() => onSelectAudit(item)}
              activeOpacity={0.95}
            >
              {/* Success Badge */}
              <View style={tw`absolute top-4 right-4 z-10`}>
                <View style={tw`bg-emerald-500 rounded-full p-2`}>
                  <Text style={tw`text-white text-xs font-bold`}>✓</Text>
                </View>
              </View>

              {/* Card Header */}
              <View 
                style={[
                  tw`p-6 pb-4`,
                  { backgroundColor: getTypeGradient(item.type) + '08' }
                ]}
              >
                <View style={tw`flex-row items-center mb-3`}>
                  <View 
                    style={[
                      tw`w-16 h-16 rounded-2xl items-center justify-center mr-4`,
                      { backgroundColor: getTypeGradient(item.type) + '15' }
                    ]}
                  >
                    <Text style={tw`text-3xl`}>{getAuditIcon(item.type)}</Text>
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xl font-bold text-gray-900 mb-2`}>
                      {item.type}
                    </Text>
                    <View style={tw`px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 self-start`}>
                      <Text style={tw`text-xs font-semibold text-emerald-700 uppercase tracking-wide`}>
                        ✓ Completed
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Card Body */}
              <View style={tw`px-6 pb-6`}>
                <View style={tw`flex-row items-center mb-5`}>
                  <View style={tw`w-1.5 h-1.5 bg-gray-400 rounded-full mr-3`} />
                  <Text style={tw`text-gray-600 flex-1 font-medium`}>
                    {item.location}
                  </Text>
                </View>
                
                {/* Earnings and Date */}
                <View style={tw`flex-row justify-between items-center`}>
                  <View>
                    <Text style={tw`text-gray-500 text-xs font-medium mb-1`}>
                      Earned Amount
                    </Text>
                    <Text style={tw`text-2xl font-black text-gray-900`}>
                      ₹{item.expectedPayout.toLocaleString()}
                    </Text>
                  </View>
                  <View style={tw`items-end`}>
                    {/* <Text style={tw`text-gray-500 text-xs font-medium mb-1`}>
                      Completed
                    </Text> */}
                    {/* <Text style={tw`text-gray-700 font-semibold`}>
                      {item.completedDate || "N/A"}
                    </Text> */}
                  </View>
                </View>

                {/* View Details Button */}
                <TouchableOpacity
                  style={[
                    tw`rounded-2xl px-6 py-3 mt-4`,
                    { backgroundColor: getTypeGradient(item.type) + '15' }
                  ]}
                  onPress={() => onSelectAudit(item)}
                  activeOpacity={0.8}
                >
                  <Text 
                    style={[
                      tw`font-bold text-sm text-center`,
                      { color: getTypeGradient(item.type) }
                    ]}
                  >
                    View Details →
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      
      {/* Floating Bottom Navigation */}
      <View style={tw`absolute bottom-8 left-6 right-6`}>
        <View style={tw`bg-white rounded-3xl p-2 shadow-2xl shadow-black shadow-opacity-10 border border-gray-100`}>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              style={tw`bg-orange-600 rounded-2xl p-4 flex-1 items-center`}
              onPress={() => onNavigate("audits")}
              activeOpacity={0.8}
            >
              <Text style={tw`text-black font-bold text-base mb-1`}>🏠</Text>
              <Text style={tw`text-white font-semibold text-sm`}>
                Home
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