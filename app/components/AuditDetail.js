import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
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

  const handleStartAudit = () => {
    setAuditStarted(true);
    setModalVisible(false);
  };

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold text-blue-800 mb-4`}>
        {audit.type} Audit
      </Text>
      <Text style={tw`text-gray-600 mb-4`}>Location: {audit.location}</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Expected Payout: ${audit.expectedPayout}
      </Text>

      {auditStarted ? (
        <ScrollView>
          {audit.questions.map((question) => (
            <AuditQuestion
              key={question.id}
              question={question}
              answer={answers[question.id]}
              setAnswer={(value) =>
                setAnswers({ ...answers, [question.id]: value })
              }
            />
          ))}
          <TouchableOpacity
            style={tw`bg-green-600 rounded-lg p-3 mt-4 shadow-md`}
            onPress={onSubmit}
          >
            <Text style={tw`text-white text-center font-semibold`}>
              Submit Audit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg p-3 shadow-md`}
          onPress={() => setModalVisible(true)}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Ready for Audit
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={tw`bg-gray-400 rounded-lg p-3 mt-2 shadow-md`}
        onPress={onBack}
      >
        <Text style={tw`text-white text-center font-semibold`}>Back</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleStartAudit}
        onCancel={() => setModalVisible(false)}
        title={`Start ${audit.type} Audit?`}
      />
    </View>
  );
}
