import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import LoginScreen from "./components/LoginScreen";
import AuditList from "./components/AuditList";
import AuditDetail from "./components/AuditDetail";
import PayoutScreen from "./components/PayoutScreen";
import CompletedAudits from "./components/CompletedAudits";

// Dummy data for audits
const dummyAudits = [
  {
    id: "1",
    type: "Restaurant",
    location: "123 Main St, City",
    status: "Pending",
    expectedPayout: 50,
    questions: [
      { id: "q1", text: "Is the kitchen clean?", type: "yesno" },
      { id: "q2", text: "Rate food safety measures", type: "rating", max: 5 },
      { id: "q3", text: "Upload kitchen photo", type: "image" },
      {
        id: "q4",
        text: "Select hygiene level",
        type: "dropdown",
        options: ["Excellent", "Good", "Poor"],
      },
    ],
  },
  {
    id: "2",
    type: "Hospital",
    location: "456 Health Rd, City",
    status: "Pending",
    expectedPayout: 75,
    questions: [
      { id: "q1", text: "Are medical instruments sterilized?", type: "yesno" },
      {
        id: "q2",
        text: "Rate patient safety protocols",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload ward photo", type: "image" },
      {
        id: "q4",
        text: "Select waste disposal method",
        type: "dropdown",
        options: ["Proper", "Improper", "Not Observed"],
      },
    ],
  },
  {
    id: "3",
    type: "Hotel",
    location: "789 Lodge Ave, City",
    status: "Completed",
    expectedPayout: 60,
    questions: [
      { id: "q1", text: "Are rooms cleaned daily?", type: "yesno" },
      { id: "q2", text: "Rate guest safety measures", type: "rating", max: 5 },
      { id: "q3", text: "Upload room photo", type: "image" },
      {
        id: "q4",
        text: "Select fire safety compliance",
        type: "dropdown",
        options: ["Compliant", "Non-Compliant"],
      },
    ],
  },
];

// Dummy payout data
const dummyPayouts = [
  { id: "1", auditId: "1", amount: 50, status: "Pending" },
  { id: "2", auditId: "2", amount: 75, status: "Pending" },
  { id: "3", auditId: "3", amount: 60, status: "Completed" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("audits");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
    setSelectedAudit(null);
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
        onSubmit={() => {
          setAnswers({});
          setSelectedAudit(null);
        }}
      />
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {currentScreen === "audits" && (
        <AuditList
          audits={dummyAudits.filter((audit) => audit.status === "Pending")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
        />
      )}
      {currentScreen === "completed" && (
        <CompletedAudits
          audits={dummyAudits.filter((audit) => audit.status === "Completed")}
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
