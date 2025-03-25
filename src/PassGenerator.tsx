import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { db, collection, addDoc } from "./firebase";
import { motion } from "framer-motion";
import "./App.css";

const PassGenerator: React.FC = () => {
  const passRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [passDetails, setPassDetails] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleDownload = async () => {
    if (!passRef.current) return;
    const canvas = await html2canvas(passRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${userId}-pass.png`;
    link.click();
  };

  const saveToDB = async () => {
    if (!userId || !passDetails) return;
    try {
      await addDoc(collection(db, "passes"), { userId, passDetails });
      setSaved(true);
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="pass-container">
      <div className="input-fields">
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <br />
        <label>Pass Details:</label>
        <input
          type="text"
          value={passDetails}
          onChange={(e) => setPassDetails(e.target.value)}
          placeholder="Enter Pass Details"
        />
        <br />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowPass(true)}
          disabled={!userId || !passDetails}
        >
          Generate Pass
        </motion.button>
      </div>

      {showPass && userId && passDetails && (
        <>
          <motion.div
            ref={passRef}
            className="pass-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="pass-content">
              <div className="pass-text">
                <h3>Pass for Knowvation Learnings</h3>
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Details:</strong> {passDetails}</p>
              </div>
              <div className="dashed-divider"></div>
              <div className="qr-container">
                <QRCodeCanvas value={userId} className="qr-code" />
              </div>
            </div>
          </motion.div>

          <div className="button-container">
            <motion.button whileHover={{ scale: 1.1 }} onClick={handleDownload}>
              Download Pass
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={saveToDB}>
              {saved ? "Saved ✅" : "Save Pass"}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default PassGenerator;
