
import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import LoginScreen from "./components/LoginScreen";
import AuditList from "./components/AuditList";
import AuditDetail from "./components/AuditDetail";
import PayoutScreen from "./components/PayoutScreen";
import CompletedAudits from "./components/CompletedAudits";

// Comprehensive audit data with different types and questions
const dummyAudits = [
  {
    id: "1",
    type: "Restaurant",
    location: "Green Leaf Restaurant, MG Road, Bengaluru",
    status: "Pending",
    expectedPayout: 250,
    questions: [
      { id: "q1", text: "Is the kitchen area clean and well-maintained?", type: "yesno" },
      { id: "q2", text: "Rate the overall food safety measures", type: "rating", max: 5 },
      { id: "q3", text: "Upload a photo of the kitchen area", type: "image" },
      { id: "q4", text: "Are staff wearing proper protective equipment?", type: "yesno" },
      { id: "q5", text: "Select the hygiene level of food storage", type: "dropdown", options: ["Excellent", "Good", "Average", "Poor"] },
      { id: "q6", text: "Rate the cleanliness of dining area", type: "rating", max: 5 },
      { id: "q7", text: "Upload photo of dining area", type: "image" },
      { id: "q8", text: "Is there proper waste segregation?", type: "yesno" },
    ],
  },
  {
    id: "2",
    type: "Hospital",
    location: "Apollo Health Center, Whitefield, Bengaluru",
    status: "Pending",
    expectedPayout: 400,
    questions: [
      { id: "q1", text: "Are medical instruments properly sterilized?", type: "yesno" },
      { id: "q2", text: "Rate the patient safety protocols", type: "rating", max: 5 },
      { id: "q3", text: "Upload photo of sterilization area", type: "image" },
      { id: "q4", text: "Is hand sanitization available at all entry points?", type: "yesno" },
      { id: "q5", text: "Select the waste disposal method", type: "dropdown", options: ["Proper Segregation", "Improper Handling", "Not Observed"] },
      { id: "q6", text: "Rate the cleanliness of patient wards", type: "rating", max: 5 },
      { id: "q7", text: "Upload photo of patient ward", type: "image" },
      { id: "q8", text: "Are isolation protocols being followed?", type: "yesno" },
      { id: "q9", text: "Rate the emergency preparedness", type: "rating", max: 5 },
    ],
  },
  {
    id: "3",
    type: "Hotel",
    location: "Comfort Inn, Electronic City, Bengaluru",
    status: "Pending",
    expectedPayout: 300,
    questions: [
      { id: "q1", text: "Are rooms cleaned and sanitized daily?", type: "yesno" },
      { id: "q2", text: "Rate the guest safety measures", type: "rating", max: 5 },
      { id: "q3", text: "Upload photo of guest room", type: "image" },
      { id: "q4", text: "Is fire safety equipment properly maintained?", type: "yesno" },
      { id: "q5", text: "Select the fire safety compliance level", type: "dropdown", options: ["Fully Compliant", "Partially Compliant", "Non-Compliant"] },
      { id: "q6", text: "Rate the housekeeping standards", type: "rating", max: 5 },
      { id: "q7", text: "Upload photo of common areas", type: "image" },
      { id: "q8", text: "Are emergency exits clearly marked and accessible?", type: "yesno" },
    ],
  },
  {
    id: "4",
    type: "Restaurant",
    location: "Spice Garden, Koramangala, Bengaluru",
    status: "Completed",
    expectedPayout: 275,
    questions: [
      { id: "q1", text: "Is the kitchen area clean and well-maintained?", type: "yesno" },
      { id: "q2", text: "Rate the overall food safety measures", type: "rating", max: 5 },
      { id: "q3", text: "Upload a photo of the kitchen area", type: "image" },
      { id: "q4", text: "Are staff wearing proper protective equipment?", type: "yesno" },
      { id: "q5", text: "Select the hygiene level of food storage", type: "dropdown", options: ["Excellent", "Good", "Average", "Poor"] },
    ],
  },
  {
    id: "5",
    type: "Hospital",
    location: "Fortis Hospital, Bannerghatta Road, Bengaluru",
    status: "Completed",
    expectedPayout: 450,
    questions: [
      { id: "q1", text: "Are medical instruments properly sterilized?", type: "yesno" },
      { id: "q2", text: "Rate the patient safety protocols", type: "rating", max: 5 },
      { id: "q3", text: "Upload photo of sterilization area", type: "image" },
    ],
  },
];

// Enhanced payout data with different statuses
const dummyPayouts = [
  { id: "1", auditId: "4", amount: 275, status: "Completed" },
  { id: "2", auditId: "5", amount: 450, status: "Processing" },
  { id: "3", auditId: "3", amount: 300, status: "Pending" },
  { id: "4", auditId: "1", amount: 250, status: "Pending" },
  { id: "5", auditId: "2", amount: 400, status: "Pending" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("audits");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [answers, setAnswers] = useState({});
  const [audits, setAudits] = useState(dummyAudits);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
    setSelectedAudit(null);
  };

  const handleAuditSubmit = () => {
    if (selectedAudit) {
      // Update audit status to completed
      setAudits(prevAudits => 
        prevAudits.map(audit => 
          audit.id === selectedAudit.id 
            ? { ...audit, status: "Completed" }
            : audit
        )
      );
      
      // Clear answers and go back
      setAnswers({});
      setSelectedAudit(null);
      setCurrentScreen("completed");
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (selectedAudit) {
    return (
      <AuditDetail
        audit={selectedAudit}
        answers={answers}
        setAnswers={setAnswers}
        onBack={() => setSelectedAudit(null)}
        onSubmit={handleAuditSubmit}
      />
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {currentScreen === "audits" && (
        <AuditList
          audits={audits.filter((audit) => audit.status === "Pending")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
        />
      )}
      {currentScreen === "completed" && (
        <CompletedAudits
          audits={audits.filter((audit) => audit.status === "Completed")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
        />
      )}
      {currentScreen === "payouts" && (
        <PayoutScreen payouts={dummyPayouts} onNavigate={handleScreenChange} />
      )}
    </View>
  );
}
