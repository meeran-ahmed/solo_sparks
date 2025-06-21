import React, { useEffect, useState } from "react";
import API from "../Api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Reflections = () => {
  const [reflections, setReflections] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    } else {
      fetchCompletedQuests(user.id);
    }
  }, []);

  const fetchCompletedQuests = async (userId) => {
    try {
      const res = await API.get(`/quests/user/${userId}`);
      const completed = res.data.filter((quest) => quest.status === "completed");
      setReflections(completed);
    } catch (err) {
      console.error("Failed to load reflections:", err);
    }
  };

  return (
    <>
      <Header />

      <style>{`
        .reflections-container {
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }

        .reflection-card {
          border: 1px solid #ccc;
          margin: 10px 0;
          padding: 16px;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0px 2px 8px rgba(0,0,0,0.05);
        }

        .reflection-card h4 {
          margin-top: 0;
        }

        .reflection-card img {
          max-width: 200px;
          margin-top: 10px;
          border-radius: 6px;
        }

        .reflection-card audio {
          margin-top: 10px;
          display: block;
        }

        .back-button {
          background: #007bff;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          margin-bottom: 20px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .reflections-container {
            padding: 15px;
          }

          .reflection-card {
            padding: 12px;
          }
        }
      `}</style>

      <div className="reflections-container">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h2>📝 Your Reflections</h2>
        {reflections.length === 0 ? (
          <p>No completed reflections yet.</p>
        ) : (
          reflections.map((quest) => (
            <div key={quest._id} className="reflection-card">
              <h4>{quest.title}</h4>
              <p>📝 {quest.reflection?.text || "No text submitted."}</p>

              {quest.reflection?.image && (
                <img
                  src={quest.reflection.image}
                  alt="Reflection"
                />
              )}

              {quest.reflection?.audio && (
                <audio controls>
                  <source src={quest.reflection.audio} type="audio/mp3" />
                  Your browser does not support audio.
                </audio>
              )}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Reflections;
