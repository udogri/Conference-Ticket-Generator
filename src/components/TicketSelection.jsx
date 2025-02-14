import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Stack, Button, Select, HStack, Divider, Text, useToast, Flex } from "@chakra-ui/react"; 
import Layout from "../Layout/Layout";

const TicketSelection = ({ setTicketData }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const storedTicketData = JSON.parse(localStorage.getItem("ticketData"));
    if (storedTicketData) {
      setSelectedTicket(storedTicketData.type);
      setTicketCount(storedTicketData.count);
    }
  }, []);

  const handleNext = () => {
    if (!selectedTicket) {
      toast({
        title: "Ticket Selection Error",
        description: "Please select a ticket!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const ticketData = {
      type: selectedTicket,
      price: selectedTicket === "VIP" ? "$100" : "$50",
      count: ticketCount,
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    setTicketData(ticketData);
    navigate("/form");
  };

  const handleCancel = () => {
    setSelectedTicket(null);
    setTicketCount(1);
    toast({
      title: "Selection Reset",
      description: "Ticket selection has been reset.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Layout >
      <Box mt="100px"  p={5} color="#FAFAFA" bg="#041E23" border="1px solid" borderRadius="md">
        
              <Flex  justify="space-between" alignItems="center" px={4} py={2} bg="#031E21" color="white"> {/* Navbar */}
            <Text fontSize="2xl" fontWeight="bold" mt={6} color="white">Ticket Selction</Text>
            <Text fontSize="md" fontWeight="bold" mt={6} color="white">Step 1/3</Text>
            </Flex>

            <Box w="100%" h="4px" bg="#0E464F" position="relative" mb="32px" >
              <Box w="30%" h="100%" bg="#24A0B5" position="absolute" left="0" />
            </Box>

        <Box border="1px solid" p={4} borderRadius="md" bg="#08252B">
          <Box mb={4}>
            <Box border="1px solid" m="24px" textAlign="center" p={4} borderRadius="md" backgroundImage="radial-gradient(circle, rgba(36, 160, 181, 2) 0%, rgba(36, 160, 181, 0) 80%, rgba(10, 12, 17, 0.01) 100%)">
              <Heading as="h3" size="lg">Techember Fest "25</Heading>
              <Text fontSize="16px" mb={2}>
                Join us for an unforgettable experience at <br />
                <strong>Techember Fest "25</strong>! Secure your spot now.
              </Text>
              <Box>📍 04 Rumens Road, Ikoyi, Lagos &nbsp; || &nbsp; March 15, 2025 | 7:00 PM</Box>
            </Box>
          </Box>

          <Divider borderColor="#07373F" borderWidth="2px" mt={4}/>

          <Box mb={4}>
            <Text mb="8px">Select Ticket Type:</Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} padding="16px" border="1px solid #07373F" borderRadius="md" bg="#052228">
              {[{ type: "Free", price: "Free", access: "REGULAR ACCESS" }, { type: "VIP", price: "$150", access: "VIP ACCESS" }, { type: "VVIP", price: "$150", access: "VVIP ACCESS" }].map((ticket) => (
                <Box
                  key={ticket.type}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  textAlign="center"
                  minW="150px"
                  borderColor={selectedTicket === ticket.type ? "#24A0B5" : "#197686"}
                  backgroundColor={selectedTicket === ticket.type ? "#24A0B5" : "transparent"}
                  color={selectedTicket === ticket.type ? "white" : "#FAFAFA"}
                  _hover={{
                    borderColor: "#24A0B5",
                    backgroundColor: "#197686",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedTicket(ticket.type)}
                >
                  <Box fontWeight="bold" fontSize="lg">{ticket.price}</Box>
                  <Box fontStyle="italic" color="#FAFAFA">{ticket.access}</Box>
                  <Box color="gray.500">20/52</Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box mb={4}>
            <label htmlFor="ticket-number">Number of Tickets</label>
            <Select
              id="ticket-number"
              mt="8px"
              borderColor="#07373F"
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1} style={{ padding: "8px", fontSize: "16px", background: "#07373F", color: "white" }}>
                  {num + 1}
                </option>
              ))}
            </Select>
          </Box>

          <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" mt={4} w="100%">
            <Button w="100%" mb={{ base: 2, md: 0 }} borderColor="#24A0B5" bg="transparent" color="#24A0B5" onClick={handleCancel}>
              Cancel
            </Button>
            <Button bg="#24A0B5" color="white" w="100%" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TicketSelection;
