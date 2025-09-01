import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed": return "bg-emerald-50 border-emerald-200 text-emerald-700";
    case "Processing": return "bg-blue-50 border-blue-200 text-blue-700";
    case "Pending": return "bg-amber-50 border-amber-200 text-amber-700";
    default: return "bg-gray-50 border-gray-200 text-gray-700";
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

const getStatusGradient = (status) => {
  switch (status) {
    case "Completed": return "#10b981";
    case "Processing": return "#3b82f6";
    case "Pending": return "#f59e0b";
    default: return "#6b7280";
  }
};

export default function PayoutScreen({ payouts, onNavigate, onLogout }) {
  const totalCompleted = payouts.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0);
  const totalProcessing = payouts.filter(p => p.status === "Processing").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payouts.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const grandTotal = totalCompleted + totalProcessing + totalPending;

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header with Gradient */}
      <View style={tw`pt-14 pb-8 px-6 relative overflow-hidden`}>
        {/* Gradient Background */}
        <View 
          style={[
            tw`absolute inset-0`,
            {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
            }
          ]} 
        />
        
        {/* Header Content */}
        <View style={tw`relative z-10`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View>
              <Text style={tw`text-black text-3xl font-black tracking-tight`}>
                Earnings
              </Text>
              <Text style={tw`text-emerald-600 text-sm font-medium mt-1`}>
                {payouts.length} total transactions
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-red-500 bg-opacity-90 rounded-2xl px-4 py-3`}
              onPress={onLogout}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-semibold text-sm`}>Logout</Text>
            </TouchableOpacity>
          </View>
          
          {/* Total Earnings Card */}
          <View style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20`}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text style={tw`text-emerald-600 text-sm font-medium mb-2`}>
                  Total Earnings
                </Text>
                <Text style={tw`text-black text-3xl font-black`}>
                  ₹{grandTotal.toLocaleString()}
                </Text>
              </View>
              <View style={tw`w-16 h-16 bg-white bg-opacity-20 rounded-2xl items-center justify-center`}>
                <Text style={tw`text-3xl`}>💎</Text>
              </View>
            </View>
            
            {/* Mini Stats Row */}
            <View style={tw`flex-row gap-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-emerald-600 text-xs font-medium`}>Received</Text>
                <Text style={tw`text-black text-lg font-bold`}>₹{totalCompleted.toLocaleString()}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-emerald-600 text-xs font-medium`}>Processing</Text>
                <Text style={tw`text-black text-lg font-bold`}>₹{totalProcessing.toLocaleString()}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-emerald-600 text-xs font-medium`}>Pending</Text>
                <Text style={tw`text-black text-lg font-bold`}>₹{totalPending.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Status Breakdown Cards */}
      <View style={tw`px-6 -mt-4 mb-6 relative z-20`}>
        <View style={tw`bg-white rounded-3xl p-1 shadow-xl shadow-black shadow-opacity-5`}>
          <View style={tw`flex-row`}>
            <View style={tw`flex-1 items-center py-6`}>
              <View style={tw`w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>✅</Text>
              </View>
              <Text style={tw`text-2xl font-black text-emerald-600 mb-1`}>
                {payouts.filter(p => p.status === "Completed").length}
              </Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Paid</Text>
            </View>
            <View style={tw`w-px bg-gray-100`} />
            <View style={tw`flex-1 items-center py-6`}>
              <View style={tw`w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>⏳</Text>
              </View>
              <Text style={tw`text-2xl font-black text-blue-600 mb-1`}>
                {payouts.filter(p => p.status === "Processing").length}
              </Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Processing</Text>
            </View>
            <View style={tw`w-px bg-gray-100`} />
            <View style={tw`flex-1 items-center py-6`}>
              <View style={tw`w-12 h-12 bg-amber-50 rounded-2xl items-center justify-center mb-2`}>
                <Text style={tw`text-lg`}>⏸️</Text>
              </View>
              <Text style={tw`text-2xl font-black text-amber-600 mb-1`}>
                {payouts.filter(p => p.status === "Pending").length}
              </Text>
              <Text style={tw`text-gray-500 text-xs font-medium uppercase tracking-wide`}>Pending</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payouts List */}
      {payouts.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View style={tw`bg-white rounded-3xl p-12 items-center shadow-lg shadow-black shadow-opacity-5 border border-gray-50`}>
            <View style={tw`w-24 h-24 bg-emerald-50 rounded-full items-center justify-center mb-6`}>
              <Text style={tw`text-5xl`}>💳</Text>
            </View>
            <Text style={tw`text-2xl font-black text-gray-900 mb-3 text-center`}>
              No Payouts Yet
            </Text>
            <Text style={tw`text-gray-500 text-center mb-8 leading-relaxed`}>
              Complete audits to start earning and see your payouts here
            </Text>
            <TouchableOpacity
              style={tw`bg-orange-600 rounded-2xl px-8 py-4 shadow-sm`}
              onPress={() => onNavigate("audits")}
              activeOpacity={0.9}
            >
              <Text style={tw`text-black font-bold text-base`}>
                Start Earning
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={payouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`px-6 pb-32`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={tw`bg-white rounded-3xl p-6 mb-4 shadow-lg shadow-black shadow-opacity-5 border border-gray-50 overflow-hidden`}>
              {/* Status Badge */}
              <View style={tw`absolute top-4 right-4`}>
                <View 
                  style={[
                    tw`rounded-full p-2`,
                    { backgroundColor: getStatusGradient(item.status) + '15' }
                  ]}
                >
                  <Text style={tw`text-sm`}>{getStatusIcon(item.status)}</Text>
                </View>
              </View>

              {/* Main Content */}
              <View style={tw`flex-row items-center mb-4`}>
                <View 
                  style={[
                    tw`w-16 h-16 rounded-2xl items-center justify-center mr-4`,
                    { backgroundColor: getStatusGradient(item.status) + '15' }
                  ]}
                >
                  <Text style={tw`text-2xl`}>💰</Text>
                </View>
                <View style={tw`flex-1 pr-8`}>
                  <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>
                    Audit #{item.auditId}
                  </Text>
                  <View style={tw`px-3 py-1 rounded-full border ${getStatusColor(item.status)} self-start`}>
                    <Text style={tw`text-xs font-semibold uppercase tracking-wide`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Amount and Details */}
              <View style={tw`bg-gray-50 rounded-2xl p-4 mb-4`}>
                <View style={tw`flex-row justify-between items-center mb-3`}>
                  <Text style={tw`text-gray-600 font-medium`}>
                    Payout Amount
                  </Text>
                  <Text style={tw`text-3xl font-black text-gray-900`}>
                    ₹{item.amount.toLocaleString()}
                  </Text>
                </View>
                
                {item.completedDate && (
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-gray-500 text-sm`}>Completed</Text>
                    <Text style={tw`text-gray-700 font-medium text-sm`}>{item.completedDate}</Text>
                  </View>
                )}
                
                {item.paymentDate && (
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-gray-500 text-sm`}>Paid On</Text>
                    <Text style={tw`text-gray-700 font-medium text-sm`}>{item.paymentDate}</Text>
                  </View>
                )}
              </View>

              {/* Status Message */}
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 rounded-full mr-3`} style={{ backgroundColor: getStatusGradient(item.status) }} />
                <Text style={tw`text-gray-600 text-sm font-medium flex-1`}>
                  {item.status === "Completed" && "Payment processed successfully"}
                  {item.status === "Processing" && "Payment being processed, expect within 24-48 hours"}
                  {item.status === "Pending" && "Audit completed, payment will be processed soon"}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={tw`items-center justify-center py-20`}>
              <View style={tw`w-24 h-24 rounded-full bg-gray-50 items-center justify-center mb-4`}>
                <Text style={tw`text-4xl`}>💳</Text>
              </View>
              <Text style={tw`text-gray-900 text-xl font-bold mb-2`}>
                No Payouts Yet
              </Text>
              <Text style={tw`text-gray-500 text-center px-8`}>
                Complete audits to start earning
              </Text>
            </View>
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
              <Text style={tw`text-white font-bold text-base mb-1`}>🏠</Text>
              <Text style={tw`text-white font-semibold text-sm`}>
                Home
              </Text>
            </TouchableOpacity>
            
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
          </View>
        </View>
      </View>
    </View>
  );
}