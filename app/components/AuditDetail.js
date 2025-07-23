
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import tw from "twrnc";
import AuditQuestion from "./AuditQuestion";
import ConfirmModal from "./ConfirmModal";

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

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-6 px-4`}>
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity
            style={tw`bg-white bg-opacity-20 rounded-full p-2 mr-3`}
            onPress={onBack}
          >
            <Text style={tw`text-white text-lg`}>←</Text>
          </TouchableOpacity>
          <View style={tw`flex-1`}>
            <Text style={tw`text-white text-xl font-bold`}>
              {audit.type} Audit
            </Text>
            <Text style={tw`text-white text-sm opacity-90`}>
              {audit.location}
            </Text>
          </View>
        </View>

        {auditStarted && (
          <View style={tw`bg-white bg-opacity-20 rounded-lg p-3`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-white text-sm`}>Progress</Text>
              <Text style={tw`text-white text-sm font-bold`}>
                {answeredQuestions}/{totalQuestions}
              </Text>
            </View>
            <View style={tw`bg-white bg-opacity-30 rounded-full h-2`}>
              <View 
                style={[
                  tw`bg-white rounded-full h-2`,
                  { width: `${progress}%` }
                ]}
              />
            </View>
          </View>
        )}
      </View>

      {auditStarted ? (
        <ScrollView style={tw`flex-1 px-4 py-4`} showsVerticalScrollIndicator={false}>
          <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>
                Audit Checklist
              </Text>
              <View style={tw`bg-green-100 rounded-full px-3 py-1`}>
                <Text style={tw`text-green-800 text-sm font-medium`}>
                  ₹{audit.expectedPayout}
                </Text>
              </View>
            </View>
            <Text style={tw`text-gray-600 text-sm`}>
              Complete all questions to submit your audit
            </Text>
          </View>

          {audit.questions.map((question, index) => (
            <AuditQuestion
              key={question.id}
              question={question}
              answer={answers[question.id]}
              setAnswer={(value) =>
                setAnswers({ ...answers, [question.id]: value })
              }
              questionNumber={index + 1}
            />
          ))}
          
          <TouchableOpacity
            style={tw`bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-4 mt-4 mb-8 shadow-lg ${answeredQuestions < totalQuestions ? 'opacity-50' : ''}`}
            onPress={handleSubmitAudit}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>
              Submit Audit ✓
            </Text>
            <Text style={tw`text-white text-center text-sm opacity-90 mt-1`}>
              Earn ₹{audit.expectedPayout}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={tw`flex-1 px-4 py-6`}>
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
            <View style={tw`items-center mb-6`}>
              <View style={tw`bg-blue-100 rounded-full p-4 mb-4`}>
                <Text style={tw`text-4xl`}>
                  {audit.type === "Restaurant" ? "🍽️" : 
                   audit.type === "Hospital" ? "🏥" : "🏨"}
                </Text>
              </View>
              <Text style={tw`text-2xl font-bold text-gray-800 text-center`}>
                {audit.type} Audit
              </Text>
              <Text style={tw`text-gray-600 text-center mt-2`}>
                {audit.location}
              </Text>
            </View>

            <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-700 font-medium`}>Expected Payout</Text>
                <Text style={tw`text-2xl font-bold text-green-600`}>
                  ₹{audit.expectedPayout}
                </Text>
              </View>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-700 font-medium`}>Questions</Text>
                <Text style={tw`text-gray-800 font-bold`}>
                  {audit.questions.length}
                </Text>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-700 font-medium`}>Estimated Time</Text>
                <Text style={tw`text-gray-800 font-bold`}>
                  {Math.ceil(audit.questions.length * 2)} mins
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={tw`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-lg`}
              onPress={() => setModalVisible(true)}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                Ready for Audit
              </Text>
              <Text style={tw`text-white text-center text-sm opacity-90 mt-1`}>
                Click when you arrive at location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
