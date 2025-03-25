import React from "react";
import PassGenerator from "./PassGenerator";
import UserPasses from "./UserPasses";

const App: React.FC = () => {
  return (
    <div>
      <center><h1>QR Pass Generator</h1></center>
      <PassGenerator />
      <UserPasses />
    </div>
  );
};

export default App;
