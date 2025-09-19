import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import tw from "twrnc";
import AuditQuestion from "./AuditQuestion";
import ConfirmModal from "./ConfirmModal";

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

export default function AuditDetail({
  audit,
  answers,
  setAnswers,
  onBack,
  onSubmit,
}) {
  const [auditStarted, setAuditStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStartAudit = () => {
    setAuditStarted(true);
    setModalVisible(false);
  };

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = audit.questions.length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const estimatedTime = Math.ceil(audit.questions.length * 2);

  const handleSubmitAudit = () => {
    if (answeredQuestions < totalQuestions) {
      Alert.alert(
        "Incomplete Audit",
        `Please answer all questions. ${totalQuestions - answeredQuestions} questions remaining.`,
        [{ text: "OK" }]
      );
      return;
    }
    
    Alert.alert(
      "Submit Audit",
      "Are you sure you want to submit this audit? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Submit", onPress: onSubmit }
      ]
    );
  };

  console.log(audit.status," Audit Status");

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
                onPress={onBack}
                activeOpacity={0.8}
              >
                <Text style={tw`text-black text-lg font-bold`}>←</Text>
              </TouchableOpacity>
              <View style={tw`flex-1`}>
                <Text style={tw`text-black text-2xl font-black tracking-tight`}>
                  {audit.type}
                </Text>
                <Text style={tw`text-orange-600 text-sm font-medium mt-1`}>
                  {audit.businessName}
                </Text>
              </View>
            </View>
          </View>

          {auditStarted && (
            <View style={tw`bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20`}>
              <View style={tw`flex-row justify-between items-center mb-3`}>
                <Text style={tw`text-orange-600 text-sm font-medium`}>
                  Audit Progress
                </Text>
                <Text style={tw`text-black text-sm font-bold`}>
                  {answeredQuestions}/{totalQuestions}
                </Text>
              </View>
              <View style={tw`bg-white bg-opacity-20 rounded-full h-3 mb-2`}>
                <View 
                  style={[
                    tw`bg-white rounded-full h-3 transition-all duration-300`,
                    { width: `${progress}%` }
                  ]}
                />
              </View>
              <Text style={tw`text-orange-600 text-xs font-medium`}>
                {progress.toFixed(0)}% Complete
              </Text>
            </View>
          )}
        </View>
      </View>

      {auditStarted ? (
        <ScrollView style={tw`flex-1 px-6 -mt-4`} showsVerticalScrollIndicator={false}>
          {/* Progress Summary Card */}
          <View style={tw`bg-white rounded-3xl p-6 mb-6 shadow-xl shadow-black shadow-opacity-5 border border-gray-50`}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>
                  Audit Checklist
                </Text>
                <Text style={tw`text-gray-500 text-sm`}>
                  Answer all questions to complete
                </Text>
              </View>
              <View 
                style={[
                  tw`rounded-2xl px-4 py-2`,
                  { backgroundColor: getTypeGradient(audit.type) + '15' }
                ]}
              >
                <Text 
                  style={[
                    tw`font-bold text-sm`,
                    { color: getTypeGradient(audit.type) }
                  ]}
                >
                  ₹{audit.expectedPayout.toLocaleString()}
                </Text>
              </View>
            </View>
            
            {/* Mini Progress Indicators */}
            <View style={tw`flex-row gap-1`}>
              {Array.from({ length: totalQuestions }, (_, i) => (
                <View
                  key={i}
                  style={[
                    tw`flex-1 h-1 rounded-full`,
                    { 
                      backgroundColor: answers[audit.questions[i]?.id] 
                        ? getTypeGradient(audit.type) 
                        : '#f3f4f6' 
                    }
                  ]}
                />
              ))}
            </View>
          </View>
          {console.log(audit.id)}

          {/* Questions */}
          {audit.questions.map((question, index) => {
            
            return(
            <AuditQuestion
              key={question.id}
              question={question}
              answer={answers[question.id]}
              setAnswer={(value) =>
                setAnswers({ ...answers, [question.id]: value })
              }
              questionNumber={index + 1}
            />
          )})}
          
          {/* Submit Button */}
          <View style={tw`mt-6 mb-32`}>
            <TouchableOpacity
              style={[
                tw`rounded-3xl p-6 shadow-lg ${answeredQuestions < totalQuestions ? 'opacity-50' : ''}`,
                { backgroundColor: answeredQuestions < totalQuestions ? '#d1d5db' : '#10b981' }
              ]}
              onPress={handleSubmitAudit}
              activeOpacity={0.9}
              disabled={answeredQuestions < totalQuestions}
            >
              <View style={tw`items-center`}>
                <Text style={tw`text-white font-black text-xl mb-2`}>
                  {answeredQuestions < totalQuestions ? '🔒 Complete All Questions' : ' Submit Audit'}
                </Text>
                <Text style={tw`text-white font-medium text-sm`}>
                  {answeredQuestions < totalQuestions 
                    ? `${totalQuestions - answeredQuestions} questions remaining`
                    : `Earn ₹${audit.expectedPayout.toLocaleString()}`
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={tw`flex-1 px-6 -mt-4`} showsVerticalScrollIndicator={false}>
          {/* Main Audit Card */}
          <View style={tw`bg-white rounded-3xl shadow-xl shadow-black shadow-opacity-5 border border-gray-50 overflow-hidden mb-6`}>
            {/* Card Header */}
            <View 
              style={[
                tw`p-8 pb-6`,
                { backgroundColor: getTypeGradient(audit.type) + '08' }
              ]}
            >
              <View style={tw`items-center`}>
                <View 
                  style={[
                    tw`w-20 h-20 rounded-3xl items-center justify-center mb-4`,
                    { backgroundColor: getTypeGradient(audit.type) + '15' }
                  ]}
                >
                  <Text style={tw`text-4xl`}>{getAuditIcon(audit.type)}</Text>
                </View>
                <Text style={tw`text-2xl font-black text-gray-900 text-center mb-2`}>
                  {audit.type} 
                </Text>
                <Text style={tw`text-lg font-semibold text-gray-700 text-center mb-1`}>
                  {audit.businessName}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-1.5 h-1.5 bg-gray-400 rounded-full mr-2`} />
                  <Text style={tw`text-gray-500 text-sm font-medium`}>
                    {audit.location}
                  </Text>
                </View>
              </View>
            </View>

            {/* Audit Details */}
            <View style={tw`p-8 pt-6`}>
              <View style={tw`space-y-4`}>
                <View style={tw`flex-row justify-between items-center py-4 border-b border-gray-100`}>
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center mr-3`}>
                      <Text style={tw`text-lg`}>💰</Text>
                    </View>
                    <Text style={tw`text-gray-700 font-semibold`}>Expected Payout</Text>
                  </View>
                  <Text style={tw`text-2xl font-black text-emerald-600`}>
                    ₹{audit.expectedPayout.toLocaleString()}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between items-center py-4 border-b border-gray-100`}>
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`w-10 h-10 bg-blue-50 rounded-2xl items-center justify-center mr-3`}>
                      <Text style={tw`text-lg`}>❓</Text>
                    </View>
                    <Text style={tw`text-gray-700 font-semibold`}>Total Questions</Text>
                  </View>
                  <Text style={tw`text-xl font-bold text-gray-900`}>
                    {audit.questions.length}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between items-center py-4`}>
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`w-10 h-10 bg-purple-50 rounded-2xl items-center justify-center mr-3`}>
                      <Text style={tw`text-lg`}>⏱️</Text>
                    </View>
                    <Text style={tw`text-gray-700 font-semibold`}>Estimated Time</Text>
                  </View>
                  <Text style={tw`text-xl font-bold text-gray-900`}>
                    ~{estimatedTime} mins
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Instructions Card */}
          {audit.status!='completed' && <View style={tw`bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 mb-8 border border-orange-100`}>
            <View style={tw`flex-row items-center mb-4`}>
              <View style={tw`w-12 h-12 bg-orange-600 rounded-2xl items-center justify-center mr-4`}>
                <Text style={tw`text-black text-xl font-bold`}>!</Text>
              </View>
              <Text style={tw`text-orange-900 text-lg font-bold flex-1`}>
                Before You Start
              </Text>
            </View>
            <View style={tw`space-y-3`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 bg-orange-600 rounded-full mr-3`} />
                <Text style={tw`text-orange-800 font-medium flex-1`}>
                  Ensure you're at the audit location
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 bg-orange-600 rounded-full mr-3`} />
                <Text style={tw`text-orange-800 font-medium flex-1`}>
                  Answer all questions honestly and thoroughly
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 bg-orange-600 rounded-full mr-3`} />
                <Text style={tw`text-orange-800 font-medium flex-1`}>
                  Take photos if required for evidence
                </Text>
              </View>
            </View>
          </View>}

          {/* Start Audit Button */}
          {audit.status!='completed' ? <TouchableOpacity
            style={[
              tw`rounded-3xl p-6 shadow-xl mb-8`,
              {
                background: 'linear-gradient(135deg, #FF7A00 0%, #FF6600 100%)'
              }
            ]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
            <View style={tw`items-center`}>
              <Text style={tw`text-black font-black text-xl mb-2`}>
                🚀 Start Audit
              </Text>
              <Text style={tw`text-orange-600 font-medium text-sm`}>
                Tap when you're ready at the location
              </Text>
            </View>
          </TouchableOpacity>:
          <Text style={tw`text-center text-gray-500 font-medium mb-8`}>
            You have already completed this audit.
          </Text>
          }
        </ScrollView>
      )}

      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleStartAudit}
        onCancel={() => setModalVisible(false)}
        title={`Start ${audit.type} Audit?`}
        message="Make sure you are at the audit location before starting."
      />
    </View>
  );
}