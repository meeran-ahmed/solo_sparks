import React, { useEffect, useState } from "react";
import API from "../Api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [sparkPoints, setSparkPoints] = useState(0);
  const [quests, setQuests] = useState([]);
  const [reflectionText, setReflectionText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchSparkPoints(user.id);
      fetchQuests(user.id);
    }
  }, [user]);

  const fetchSparkPoints = async (userId) => {
    try {
      const res = await API.get(`/auth/user/${userId}`);
      setSparkPoints(res.data.sparkPoints);
    } catch (err) {
      console.error("Error fetching spark points:", err);
    }
  };

  const fetchQuests = async (userId) => {
    try {
      const res = await API.get(`/quests/user/${userId}`);
      setQuests(res.data);
    } catch (err) {
      console.error("Error fetching quests:", err);
    }
  };

  const handleComplete = async (questId) => {
    try {
      const readFileAsDataURL = (file) =>
        new Promise((resolve, reject) => {
          if (!file) return resolve("");
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const [imageBase64, audioBase64] = await Promise.all([
        readFileAsDataURL(imageFile),
        readFileAsDataURL(audioFile),
      ]);

      const reflectionData = {
        text: reflectionText,
        image: imageBase64,
        audio: audioBase64,
      };

      await API.put(`/quests/${questId}/complete`, reflectionData);
      alert("Quest completed!");
      fetchSparkPoints(user.id);
      fetchQuests(user.id);
      setReflectionText("");
      setImageFile(null);
      setAudioFile(null);
    } catch (err) {
      console.error("Error completing quest:", err);
      alert("Failed to complete quest");
    }
  };

  const handleGenerateQuest = async () => {
    if (!user?.id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      await API.post("/quests/generate", { userId: user.id });
      fetchQuests(user.id);
    } catch (err) {
      console.error("Error generating quest:", err);
      alert("Failed to generate quest");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <>
      <Header />

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #f7f9fc;
        }

        .dashboard {
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }

        .quest-card {
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          background: #fff;
        }

        .progress-bar {
          background: #eee;
          border-radius: 10px;
          height: 20px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }

        .progress-fill {
          background: #4caf50;
          height: 100%;
          transition: width 0.5s ease;
        }

        @media (max-width: 600px) {
          .dashboard {
            padding: 15px;
          }

          .quest-card {
            padding: 12px;
          }
        }
      `}</style>

      <div className="dashboard">
        <h2>Welcome, {user?.name || "Guest"}!</h2>
        <h3>🌟 Spark Points: {sparkPoints}</h3>

        <button onClick={() => navigate("/reflections")} style={{ float: "right", marginBottom: "10px" }}>
          🧠 View Reflections
        </button>

        <div style={{ margin: "20px 0" }}>
          <strong>📈 Progress:</strong>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  quests.length
                    ? (quests.filter((q) => q.status === "completed").length / quests.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
          <small>
            {quests.filter((q) => q.status === "completed").length} of {quests.length} quests completed
          </small>
        </div>

        <h4>Your Quests:</h4>
        {quests.length === 0 ? (
          <>
            <p>No quests yet.</p>
            <button onClick={handleGenerateQuest}>Generate Today's Quest</button>
          </>
        ) : (
          quests.map((quest) => (
            <div key={quest._id} className="quest-card">
              <strong>{quest.title}</strong>
              <p>{quest.description}</p>
              <p>Status: {quest.status}</p>

              {quest.status === "pending" ? (
                <div>
                  <textarea
                    placeholder="Write your reflection..."
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginBottom: "8px", borderRadius: "8px", padding: "8px" }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  /><br /><br />

                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files[0])}
                  /><br /><br />

                  <button onClick={() => handleComplete(quest._id)}>✅ Submit Reflection</button>
                </div>
              ) : (
                <div>
                  <h5>Reflection:</h5>
                  {quest.reflection?.text && <p>📝 {quest.reflection.text}</p>}
                  {quest.reflection?.image && (
                    <img
                      src={quest.reflection.image}
                      alt="Reflection"
                      style={{ maxWidth: "200px", marginTop: "5px" }}
                    />
                  )}
                  {quest.reflection?.audio && (
                    <audio controls style={{ marginTop: "5px" }}>
                      <source src={quest.reflection.audio} type="audio/mp3" />
                      Your browser does not support audio.
                    </audio>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
