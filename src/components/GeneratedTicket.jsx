import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  Spinner,
  Flex,
  Card,
  Stack,
  Divider,
  Button,
  Table,
  Tbody,
  Td,
  Tr,
  HStack,
} from "@chakra-ui/react";
import Barcode from "react-barcode"; // Import react-barcode
import Layout from "../Layout/Layout";

const GeneratedTicket = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  

  const handleBookAnotherTicket = () => {
    navigate("/");
  };

  if (!formData) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const generateUniqueNumber = () => Math.floor(Math.random() * 1000000000);

  return (
    <Layout>
      {/* Progress Bar Section */}
      
      <Flex justify="space-between" px={{ base: 6, md: 12 }} mt="80px" w="75%">
  <Text fontSize="xl" fontWeight="bold" mt={6} color="white">
    Ready
  </Text>
  <Text fontSize="sm" fontWeight="bold" mt={6} color="white">
    Step 3/3
  </Text>
</Flex>

      <Box w="65%" h="4px" bg="#0E464F" position="relative" my={4}>
        <Box w="65%" h="100%" bg="#24A0B5" position="absolute" left="0" />
      </Box>

      {/* Ticket Container */}
      <Card
        position="relative"
        bg="#041E23"
        borderRadius="16px"
        p={{ base: "25px", md: "20px" }}
        maxW="600px"
        w="90%"
        mx="auto"
        color="white"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb={4}>
          Your Ticket is Booked!
        </Heading>
        <Text fontSize="sm" mb={4} color="gray.400">
          Check your email for a copy or download it here.
        </Text>

        {/* Ticket Details */}
        <Box
          border="1px solid #24A0B5"
          borderRadius="16px"
          p={{ base: "20px", md: "20px" }}
          bg="radial-gradient(103.64% 57.39% at 14.02% 32.06%, #24A0B533, transparent)"
          textAlign="center"
          w="100%"
          _before={{
            content: '""',
            position:"absolute",
      width:"40px",
      height:"40px",
      bg:"#041E23",
      borderRadius:"50%",
      top:"13%",
      left:"2px",
          }}
          _after={{
            content: '""',
            position: "absolute",
            width: "40px",
            height: "40px",
            background: "#041E23",
            borderRadius: "50%",
            top: "15%",
            right: "2px",
            transform: "translateY(-50%)",
          }}
        >
            <Box
      position="absolute"
      width="40px"
      height="40px"
      bg="#041E23"
      borderRadius="50%"
      bottom="12%"
      left="15px"
    />

    {/* Right-side cutouts */}
    <Box
      position="absolute"
      width="40px"
      height="40px"
      bg="#041E23"
      borderRadius="50%"
      bottom="12%"
      right="15px"
    />
    <Box
      position="absolute"
      width="40px"
      height="40px"
      bg="#041E23"
      borderRadius="50%"
      bottom="34%"
      right="18px"
      zIndex={30}
    />

    {/* Right-side cutouts */}
    <Box
      position="absolute"
      width="40px"
      height="40px"
      bg="#041E23"
      borderRadius="50%"
      bottom="34%"
      left="18px"
      zIndex={30}
    />
          {/* Event Details */}
          <Box border="1px solid #24A0B5" borderRadius="8px" p={4} bg="#08343C">
            <Heading as="h3" size="md" mb={2}>
              Techember Fest '25
            </Heading>
            <Text fontSize="sm">📍 04 Rumens Road, Ikoyi, Lagos</Text>
            <Text fontSize="sm"> 📆 March 15, 2025 | 7:00 PM</Text>
    
          {/* User Details */}
          <Flex
            direction="column"
            alignItems="center"
            my={4}
            overflow="hidden"
          >
            <Image
              src={formData.avatar}
              alt="Avatar"
              boxSize="100px"
              borderRadius="8px"
              objectFit="cover"
              mb={3}
              border="4px solid #24A0B5"
            />

            {/* Table Container */}
            <Box border="1px solid #133D44" borderRadius="8px" overflow="hidden" p={4} color="white">
  <Table variant="unstyled" size="sm">
    <Tbody>
      {/* First Field (Name & Email) */}
      <Tr borderBottom="1px solid #133D44">
        <Td fontWeight="bold" textAlign="center" display={{ base: 'none', md: 'table-cell' }}>Name</Td>
        <Td fontWeight="bold" textAlign="center" display={{ base: 'none', md: 'table-cell' }}>Email</Td>
      </Tr>
      <Tr>
        <Td textAlign="center" display={{ base: 'block', md: 'table-cell' }} mb={{ base: 2, md: 0 }}>
          <Text fontWeight="bold">Name:</Text>
          {formData.fullName}
        </Td>
        <Td textAlign="center" display={{ base: 'block', md: 'table-cell' }} mb={{ base: 2, md: 0 }}>
          <Text fontWeight="bold">Email:</Text>
          {formData.email}
        </Td>
      </Tr>

      {/* Second Field (Ticket Type & Ticket For) */}
      <Tr borderBottom="1px solid #133D44">
        <Td fontWeight="bold" textAlign="center" display={{ base: 'none', md: 'table-cell' }}>Ticket Type</Td>
        <Td fontWeight="bold" textAlign="center" display={{ base: 'none', md: 'table-cell' }}>Ticket For</Td>
      </Tr>
      <Tr>
        <Td textAlign="center" display={{ base: 'block', md: 'table-cell' }} mb={{ base: 2, md: 0 }}>
          <Text fontWeight="bold">Ticket Type:</Text>
          {formData.ticketType || "VIP"}
        </Td>
        <Td textAlign="center" display={{ base: 'block', md: 'table-cell' }} mb={{ base: 2, md: 0 }}>
          <Text fontWeight="bold">Ticket For:</Text>
          {formData.ticketCount || 1}
        </Td>
      </Tr>

      {/* Third Field (Special Request - Full Row) */}
      <Tr borderBottom="1px solid #133D44">
        <Td fontWeight="bold" textAlign="center" colSpan={2} display={{ base: 'none', md: 'table-cell' }}>
          Special Request
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center" colSpan={2} display={{ base: 'block', md: 'table-cell' }} mb={{ base: 2, md: 0 }}>
          <Text fontWeight="bold">Special Request:</Text>
          {formData.specialRequests || "Nil"}
        </Td>
      </Tr>
    </Tbody>
  </Table>
</Box>
          </Flex>
          
        

        <Divider
          my={4}
          borderColor="#24A0B5"
          borderWidth="2px"
          borderStyle="dashed"
        />

        {/* Barcode Section */}
        <Box mb={4}>
          <Flex justifyContent="center" alignItems="center" direction="column">
            <Barcode value={generateUniqueNumber()} width="1.5px" height={60} />
            
          </Flex>
        </Box>
        </Box>
        </Box>

        {/* Buttons */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={2}
          w="100%"
          justify="center"
          mt={4}
        >
          <Button
            border="1px solid #24A0B5"
            bg="transparent"
            color="#24A0B5"
            fontSize="16px"
            w={{ base: "100%", md: "45%" }}
            onClick={handleBookAnotherTicket}
          >
            Book Another Ticket
          </Button>
          <Button
            fontSize="16px"
            colorScheme="teal"
            bg="#24A0B5"
            color="white"
            w={{ base: "100%", md: "45%" }}
            
          >
            Download Ticket
          </Button>
        </Flex>
      </Card>
    </Layout>
  );
};

export default GeneratedTicket;
