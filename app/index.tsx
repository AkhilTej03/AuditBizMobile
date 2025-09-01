import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import tw from "twrnc";
import LoginScreen from "./components/LoginScreen";
import AuditList from "./components/AuditList";
import AuditDetail from "./components/AuditDetail";
import PayoutScreen from "./components/PayoutScreen";
import CompletedAudits from "./components/CompletedAudits";

// Define HOSTNAME here, or import it from a config file
// const HOSTNAME = "https://sanatanbackend-r-git-main-zbplus.vercel.app"; // Replace with your actual hostname
const HOSTNAME = "https://audut-x-backend-nnsm.vercel.app"; // Replace with your actual hostname
// const HOSTNAME = "https://musical-dollop-xv6pwqr94w9fvv6j-3001.app.github.dev"; // Replace with your actual hostname

const dummyPayouts = [
  { id: "1", auditId: "4", amount: 275, status: "Completed" },
  { id: "2", auditId: "5", amount: 450, status: "Processing" },
  { id: "3", auditId: "3", amount: 300, status: "Pending" },
  { id: "4", auditId: "1", amount: 250, status: "Pending" },
  { id: "5", auditId: "2", amount: 400, status: "Pending" },
];

// Helper function to transform API data to the expected format
const transformAuditData = (apiAudits) => {
  return apiAudits.map((audit) => {
    console.log(audit.audit.category.checklist_items, "Transforming Audit");
    return ({
      id: audit.audit_id, // Assuming 'auditId' from API maps to 'id'
      type: audit.businessType || "Audit", // Assuming 'businessType' from API
      location: `${audit.audit.vipana.user.full_name}, ${audit.audit.vipana.address}`, // Combining fields for location
      status: audit.audit.status, // Assuming 'status' field exists
      expectedPayout: audit.audit.category.auditor_payout.medium, // Assuming 'estimatedPayout' from API
      questions:
        audit.audit.category?.checklist_items?.flatMap((factor) =>
          (factor?.questions || []).map((q) => ({
            id: q.id,
            text: q.auditor_text || "Untitled Question",
            type: q.type?.toLowerCase?.() || "text",
            importance: q.importance ?? null,
            nonNegotiable: q.nonNegotiable ?? false,
            range: { from: q.from ?? null, to: q.to ?? null },
            options:
              (q.options || []).map((opt) => (opt.text || "")) || [],
            factorName: factor.name, // ✅ preserve factor reference if needed
          }))
        ) || [],
    })
  });
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
      const response = await fetch(
        `${HOSTNAME}/api/audits/samikshak/${samikshakId}`,
      );
      const data = await response.json();
      console.log("Fetched audits data:", data);
      if (data.success && data.data) {
        const transformedAudits = transformAuditData(data.data);
        setAudits(transformedAudits);
        console.log("successfully set Audits", transformedAudits);
      } else {
        Alert.alert("Error", "Failed to fetch audits or no audits found.");
        setAudits([]); // Ensure audits are cleared if fetch fails or returns empty
        console.log("set empty 0 Audits");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to fetch audits. Please check your network connection.",
      );
      console.error("Fetch audits error:", error);
      setAudits([]); // Clear audits on network error
    } finally {
      setLoading(false);
    }
  };

  const submitAuditReport = async (auditId, responses) => {
    try {
      setLoading(true);
      const formattedResponses = responses.map((response) => ({
        checklist_item: response.checklist_item,
        checklist_type: response.checklist_type,
        to: response.to || 5,
        from: response.from || 1,
        response: response.response,
        comments: response.comments,
        photo_url: response.photo_url,
      }));
      console.log("Formatted responses:", formattedResponses);
      const response = await fetch(
        `${HOSTNAME}/api/audits/${auditId}/saveAuditReport1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${authToken}`, // Assuming token is needed for submission
          },
          body: JSON.stringify({ responses: formattedResponses }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Audit submitted successfully!");
        return true;
      } else {
        // Attempt to show a more specific error message from the backend
        const errorMessage =
          data.error || data.message || "Failed to submit audit";
        Alert.alert("Error", errorMessage);
        return false;
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit audit. Please check your network connection.",
      );
      console.error("Submit audit error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      console.log(email, password, "Login Attempt");
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
        setCurrentUser(data.user);
        setAuthToken(data.token);
        // Assuming login response contains the samikshakId
        const samikshakId = data.user.id; //||"5cfff085-ab94-4044-b97b-808cc16491c3";
        setUserSamikshakId(samikshakId);
        setIsLoggedIn(true);
        // Fetch audits immediately after successful login and setting samikshakId
        fetchAudits(samikshakId);
      } else {
        let errorMessage = data.error || data.message || "Login failed";
        if (response.status === 404) {
          errorMessage = "User not found";
        } else if (response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (response.status === 403) {
          errorMessage =
            "Account not approved yet. Please contact administrator.";
        }
        Alert.alert("Login Failed", errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        "Network error. Please check your connection and try again.",
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
    Alert.alert("Logout", "Are you sure you want to logout?", [
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
        },
      },
    ]);
  };

  const handleAuditSubmit = async () => {
    if (selectedAudit) {
      try {
        const auditId = selectedAudit.id;
        const formattedAnswers = Object.keys(answers).map((questionId) => {
          const question = selectedAudit.questions.find(
            (q) => q.id === questionId,
          );
          const answerData = answers[questionId];
          console.log(answerData, "AnswerData");

          // Fix response format based on question type and answer structure
          let response;
          if (typeof answerData === "object" && answerData !== null) {
            response =
              answerData.value ||
              answerData.response ||
              answerData.uri ||
              answerData;
          } else {
            response = answerData;
          }

          return {
            checklist_item: question ? question.text : "Unknown Question",
            checklist_type: question ? question.type : "Unknown Type",
            response: response,
            comments:
              (typeof answerData === "object" && answerData?.comments) || "",
            photo_url:
              typeof answerData === "object" && answerData?.imageUrl
                ? [answerData.imageUrl]
                : typeof answerData === "string" &&
                  answerData.startsWith("http")
                  ? [answerData]
                  : [],
          };
        });
        console.log("Formatted answers:", formattedAnswers);
        const success = await submitAuditReport(auditId, formattedAnswers);

        if (success) {
          setAnswers({});
          setSelectedAudit(null);
          setCurrentScreen("audits");
          // Refresh audits after successful submission
          if (userSamikshakId) {
            await fetchAudits(userSamikshakId);
          }
        } else {
          console.log("Audit submission failed");
        }
      } catch (error) {
        console.error("Error submitting audit:", error);
      }
    } else {
      console.log("selectedAudit is null");
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
        <View
          style={tw`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
        >
          <Text style={tw`text-white text-lg`}>Loading...</Text>
        </View>
      )}
      {currentScreen === "audits" && (
        <AuditList
          audits={audits.filter((audit) => audit.status === "Scheduled")}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
          onLogout={handleLogout}
          onRefresh={() => userSamikshakId && fetchAudits(userSamikshakId)}
          refreshing={loading}
        />
      )}
      {currentScreen === "completed" && (
        <CompletedAudits
          audits={audits.filter(
            (audit) => audit.status?.toLowerCase() === "completed",
          )}
          onSelectAudit={setSelectedAudit}
          onNavigate={handleScreenChange}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "payouts" && (
        <PayoutScreen
          payouts={dummyPayouts}
          onNavigate={handleScreenChange}
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}
