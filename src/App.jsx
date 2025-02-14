import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, VStack } from "@chakra-ui/react";



import TicketSelection from "./components/TicketSelection";
import UserForm from "./components/UserForm";
import GeneratedTicket from "./components/GeneratedTicket";

const App = () => {
  const [ticketData, setTicketData] = useState(null); // Store ticket selection data
  const [userData, setUserData] = useState(null); // Store user details
  


  return (
    <Router>
    <Routes> {/* Just the Routes are needed */}
      <Route path="/" element={<TicketSelection setTicketData={setTicketData} />} />
      <Route path="/form" element={<UserForm ticketData={ticketData} onSubmit={setUserData} />} />
      <Route path="/generated-ticket" element={<GeneratedTicket ticketData={ticketData} userData={userData} />} />
    </Routes>
  </Router>
  );
};

export default App;
