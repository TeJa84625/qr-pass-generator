import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "./firebase";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import "./App.css";

const UserPasses: React.FC = () => {
  const [passes, setPasses] = useState<{ userId: string; passDetails: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "passes"));
        const passData = querySnapshot.docs.map((doc) => doc.data() as { userId: string; passDetails: string });
        setPasses(passData);
      } catch (error) {
        console.error("Error fetching passes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPasses();
  }, []);

  return (
    <div className="pass-list">
      <h2>Stored Passes</h2>

      {loading ? (
        <p>Loading...</p>
      ) : passes.length === 0 ? (
        <p>No passes available.</p>
      ) : (
        passes.map((pass, index) => (
          <motion.div
            key={index}
            className="pass-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="pass-content">
              <div className="pass-text">
                <h3>Pass for Knowvation Learnings</h3>
                <p><strong>User ID:</strong> {pass.userId}</p>
                <p><strong>Details:</strong> {pass.passDetails}</p>
              </div>
              <div className="dashed-divider"></div>
              <div className="qr-container">
                <QRCodeCanvas value={pass.userId} className="qr-code" />
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default UserPasses;
