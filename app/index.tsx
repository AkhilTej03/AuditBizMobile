import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import tw from "twrnc";
import LoginScreen from "./components/LoginScreen";
import AuditList from "./components/AuditList";
import AuditDetail from "./components/AuditDetail";
import PayoutScreen from "./components/PayoutScreen";
import CompletedAudits from "./components/CompletedAudits";

// Define HOSTNAME here, or import it from a config file
const HOSTNAME = "https://your-backend-hostname.com"; // Replace with your actual hostname

// Dummy data - will be replaced by API calls
const dummyAudits = [
  {
    id: "1",
    type: "Restaurant",
    location: "Green Leaf Restaurant, MG Road, Bengaluru",
    status: "Pending",
    expectedPayout: 250,
    questions: [
      {
        id: "q1",
        text: "Is the kitchen area clean and well-maintained?",
        type: "yesno",
      },
      {
        id: "q2",
        text: "Rate the overall food safety measures",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload a photo of the kitchen area", type: "image" },
      {
        id: "q4",
        text: "Are staff wearing proper protective equipment?",
        type: "yesno",
      },
      {
        id: "q5",
        text: "Select the hygiene level of food storage",
        type: "dropdown",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
      {
        id: "q6",
        text: "Rate the cleanliness of dining area",
        type: "rating",
        max: 5,
      },
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
      {
        id: "q1",
        text: "Are medical instruments properly sterilized?",
        type: "yesno",
      },
      {
        id: "q2",
        text: "Rate the patient safety protocols",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload photo of sterilization area", type: "image" },
      {
        id: "q4",
        text: "Is hand sanitization available at all entry points?",
        type: "yesno",
      },
      {
        id: "q5",
        text: "Select the waste disposal method",
        type: "dropdown",
        options: ["Proper Segregation", "Improper Handling", "Not Observed"],
      },
      {
        id: "q6",
        text: "Rate the cleanliness of patient wards",
        type: "rating",
        max: 5,
      },
      { id: "q7", text: "Upload photo of patient ward", type: "image" },
      {
        id: "q8",
        text: "Are isolation protocols being followed?",
        type: "yesno",
      },
      {
        id: "q9",
        text: "Rate the emergency preparedness",
        type: "rating",
        max: 5,
      },
    ],
  },
  {
    id: "3",
    type: "Hotel",
    location: "Comfort Inn, Electronic City, Bengaluru",
    status: "Pending",
    expectedPayout: 300,
    questions: [
      {
        id: "q1",
        text: "Are rooms cleaned and sanitized daily?",
        type: "yesno",
      },
      {
        id: "q2",
        text: "Rate the guest safety measures",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload photo of guest room", type: "image" },
      {
        id: "q4",
        text: "Is fire safety equipment properly maintained?",
        type: "yesno",
      },
      {
        id: "q5",
        text: "Select the fire safety compliance level",
        type: "dropdown",
        options: ["Fully Compliant", "Partially Compliant", "Non-Compliant"],
      },
      {
        id: "q6",
        text: "Rate the housekeeping standards",
        type: "rating",
        max: 5,
      },
      { id: "q7", text: "Upload photo of common areas", type: "image" },
      {
        id: "q8",
        text: "Are emergency exits clearly marked and accessible?",
        type: "yesno",
      },
    ],
  },
  {
    id: "4",
    type: "Restaurant",
    location: "Spice Garden, Koramangala, Bengaluru",
    status: "Completed",
    expectedPayout: 275,
    questions: [
      {
        id: "q1",
        text: "Is the kitchen area clean and well-maintained?",
        type: "yesno",
      },
      {
        id: "q2",
        text: "Rate the overall food safety measures",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload a photo of the kitchen area", type: "image" },
      {
        id: "q4",
        text: "Are staff wearing proper protective equipment?",
        type: "yesno",
      },
      {
        id: "q5",
        text: "Select the hygiene level of food storage",
        type: "dropdown",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
    ],
  },
  {
    id: "5",
    type: "Hospital",
    location: "Fortis Hospital, Bannerghatta Road, Bengaluru",
    status: "Completed",
    expectedPayout: 450,
    questions: [
      {
        id: "q1",
        text: "Are medical instruments properly sterilized?",
        type: "yesno",
      },
      {
        id: "q2",
        text: "Rate the patient safety protocols",
        type: "rating",
        max: 5,
      },
      { id: "q3", text: "Upload photo of sterilization area", type: "image" },
    ],
  },
];

const dummyPayouts = [
  { id: "1", auditId: "4", amount: 275, status: "Completed" },
  { id: "2", auditId: "5", amount: 450, status: "Processing" },
  { id: "3", auditId: "3", amount: 300, status: "Pending" },
  { id: "4", auditId: "1", amount: 250, status: "Pending" },
  { id: "5", auditId: "2", amount: 400, status: "Pending" },
];

// Helper function to transform API data to the expected format
const transformAuditData = (apiAudits) => {
  return apiAudits.map((audit) => ({
    id: audit.auditId, // Assuming 'auditId' from API maps to 'id'
    type: audit.businessType, // Assuming 'businessType' from API
    location: `${audit.businessName}, ${audit.address}`, // Combining fields for location
    status: audit.status, // Assuming 'status' field exists
    expectedPayout: audit.estimatedPayout, // Assuming 'estimatedPayout' from API
    questions: audit.checklist_items.map((item) => ({
      id: item.id, // Assuming 'id' for question
      text: item.question, // Assuming 'question' is the question text
      type: item.question_type.toLowerCase(), // Map API type to local type
      options: item.options || [], // Handle cases where options might be missing
      max: item.question_type === "Rating" ? 10 : undefined, // Assuming rating questions have a max of 10 from the example
    })),
  }));
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("audits");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [answers, setAnswers] = useState({});
  const [audits, setAudits] = useState([]);
  const [userSamikshakId, setUserSamikshakId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAudits = async (samikshakId) => {
    try {
      setLoading(true);
      const response = await fetch(`${HOSTNAME}/api/audits/samikshak/${samikshakId}`);
      const data = await response.json();

      if (data.success && data.data) {
        const transformedAudits = transformAuditData(data.data);
        setAudits(transformedAudits);
      } else {
        Alert.alert("Error", "Failed to fetch audits or no audits found.");
        setAudits([]); // Ensure audits are cleared if fetch fails or returns empty
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch audits. Please check your network connection.");
      console.error("Fetch audits error:", error);
      setAudits([]); // Clear audits on network error
    } finally {
      setLoading(false);
    }
  };

  const submitAuditReport = async (auditId, responses) => {
    try {
      setLoading(true);
      const formattedResponses = responses.map(response => ({
        checklist_item: response.checklist_item,
        checklist_type: response.checklist_type,
        to: response.to,
        from: response.from,
        response: response.response,
        comments: response.comments,
        photo_url: response.photo_url
      }));

      const response = await fetch(`${HOSTNAME}/api/audits/${auditId}/saveAuditReport1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Assuming token is needed for submission
        },
        body: JSON.stringify({ responses: formattedResponses })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Audit submitted successfully!");
        return true;
      } else {
        // Attempt to show a more specific error message from the backend
        const errorMessage = data.error || data.message || "Failed to submit audit";
        Alert.alert("Error", errorMessage);
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit audit. Please check your network connection.");
      console.error("Submit audit error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      let loginUrl = `${HOSTNAME}/api/auth/login`; // Assuming your login endpoint is /api/auth/login
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Success",
          data.message || "Login successful",
          [
            {
              text: "OK",
              onPress: () => {
                setCurrentUser(data.user);
                setAuthToken(data.token);
                // Assuming login response contains the samikshakId
                const samikshakId = data.user.samikshakId || "5cfff085-ab94-4044-b97b-808cc16491c3"; // Fallback to dummy if not in response
                setUserSamikshakId(samikshakId);
                setIsLoggedIn(true);
                // Fetch audits immediately after successful login and setting samikshakId
                fetchAudits(samikshakId);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        let errorMessage = data.error || data.message || "Login failed";
        if (response.status === 404) {
          errorMessage = "User not found";
        } else if (response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (response.status === 403) {
          errorMessage = "Account not approved yet. Please contact administrator.";
        }
        Alert.alert("Login Failed", errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        "Network error. Please check your connection and try again."
      );
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
    setSelectedAudit(null);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          onPress: () => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            setAuthToken(null);
            setUserSamikshakId(null);
            setAudits([]);
            setAnswers({});
            setSelectedAudit(null);
            setCurrentScreen("audits");
          }
        }
      ]
    );
  };

  const handleAuditSubmit = async () => {
    if (selectedAudit) {
      const auditId = selectedAudit.id;
      const formattedAnswers = Object.keys(answers).map((questionId) => {
        const question = selectedAudit.questions.find(q => q.id === questionId);
        const answerData = answers[questionId];
        return {
          checklist_item: question ? question.text : 'Unknown Question',
          checklist_type: question ? question.type : 'Unknown Type',
          response: answerData.response,
          comments: answerData.comments || '',
          photo_url: answerData.photo_url || []
        };
      });

      const success = await submitAuditReport(auditId, formattedAnswers);

      if (success) {
        // Update local state to reflect completed audit if submission was successful
        setAudits((prevAudits) =>
          prevAudits.map((audit) =>
            audit.id === auditId ? { ...audit, status: "Completed" } : audit
          )
        );
        setAnswers({});
        setSelectedAudit(null);
        setCurrentScreen("completed");
      }
    }
  };

  // Effect to fetch audits when the component mounts or when isLoggedIn/userSamikshakId changes
  useEffect(() => {
    if (isLoggedIn && userSamikshakId) {
      fetchAudits(userSamikshakId);
    }
  }, [isLoggedIn, userSamikshakId]);

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
        loading={loading}
      />
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {loading && (
        <View style={tw`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
          <Text style={tw`text-white text-lg`}>Loading...</Text>
        </View>
      )}
      {currentScreen === "audits" && (
        <AuditList
          audits={audits.filter((audit) => audit.status === "Pending")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "completed" && (
        <CompletedAudits
          audits={audits.filter((audit) => audit.status === "Completed")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "payouts" && (
        <PayoutScreen payouts={dummyPayouts} onNavigate={handleScreenChange} onLogout={handleLogout} />
      )}
    </View>
  );
}