import React from "react";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react"; // Chakra UI components
import TicketSelection from "../components/TicketSelection";
import UserForm from "../components/UserForm";
import GeneratedTicket from "../components/GeneratedTicket";

const Layout = ({ children }) => {
    return (
      <Box
        minHeight="100vh"
        w="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        bg="#041E23"
        color="#FAFAFA"
      >
        {/* Main Content */}
        <Box
          p={{ base: 2, sm: 4, md: 6 }}
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {children} {/* This allows App.jsx to control rendering */}
        </Box>
      </Box>
    );
  };
  
  export default Layout;
  
