import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Text,
  Image,
  Spinner,
  Textarea,
  useToast,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Layout from "../Layout/Layout";

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!formData.avatar.trim()) newErrors.avatar = "Avatar is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "unsigned_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/df7ehiibh/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setFormData((prevData) => {
          const updatedData = { ...prevData, avatar: data.secure_url };
          localStorage.setItem("formData", JSON.stringify(updatedData));
          return updatedData;
        });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      toast({
        title: "Image Upload Failed",
        description: "Something went wrong while uploading the image. Try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (uploading) {
        toast({
          title: "Please Wait",
          description: "Image upload is still in progress.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/generated-ticket", { state: { formData } });
    }
  };

  return (
    <Layout>
      <Flex direction="column" minH="100vh" bg="#041E23">
        <Flex justify="space-between" alignItems="center" px={4} py={2} bg="#031E21" color="white">
          <Text fontSize="2xl" fontWeight="bold" mt="100px" color="white">
            Attendee details
          </Text>
          <Text fontSize="sm" fontWeight="bold" mt="100px"  color="white">
            Step 2/3
          </Text>
        </Flex>
        <Box mb="32px" w="100%" h="4px" bg="#0E464F" position="relative">
          <Box w="60%" h="100%" bg="#24A0B5" position="absolute" left="0" />
        </Box>

        <Box
          w={{ base: "100%", md: "70%", lg: "100%" }}
          mx="auto"
          
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          bg="#08252B"
          flexGrow={1}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6} color="white">
            Enter Your Details
          </Text>
          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <HStack
              bg="rgba(0, 0, 0, 0.2)"
              h="200px"
              justify="center"
              align="center"
              borderRadius="md"
              mb={4}
            >
              <Box
                w="240px"
                h="240px"
                border="4px solid #24A0B5"
                borderRadius="32px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                textAlign="center"
                bg="#0E464F"
                color="white"
                cursor="pointer"
                onClick={() => document.getElementById("avatar").click()}
              >
                {/* Display the upload icon and text only if avatar is not set */}
                {!formData.avatar && !uploading && (
                  <>
                    <IoCloudDownloadOutline size={24} color="#ffff" />
                    <Text fontSize="sm" mb={2}>
                      Drag & drop or click to upload
                    </Text>
                  </>
                )}
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                {uploading && <Spinner size="sm" color="blue.500" mt={2} />}
                {formData.avatar && (
                  <Image
                    src={formData.avatar}
                    alt="Avatar Preview"
                    w="100%"
                    
                  />
                )}
              </Box>
            </HStack>

            <Divider mt="50px" mb="32px" borderColor="#07373F" borderWidth="2px" borderStyle="solid" />

            {/* Full Name Input */}
            <Box mb={4}>
              <Text color="white">Enter your name</Text>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                bg="#07373F"
                color="white"
                borderColor="#197686"
                placeholder="Full Name"
                _placeholder={{ color: "whiteAlpha.600" }}
                focusBorderColor="#24A0B5"
              />
              {errors.fullName && <Text color="red.500">{errors.fullName}</Text>}
            </Box>

            {/* Email Input */}
            <Box mb={4}>
              <Text color="white">Enter your email</Text>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                bg="#07373F"
                color="white"
                borderColor="#197686"
                placeholder="Email"
                _placeholder={{ color: "whiteAlpha.600" }}
                focusBorderColor="#24A0B5"
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}
            </Box>

            {/* Special Requests Textarea */}
            <Box mb={4}>
              <Text color="white">Special Requests?</Text>
              <Textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                bg="#07373F"
                color="white"
                borderColor="#197686"
                focusBorderColor="#24A0B5"
                placeholder="Enter any special requests here"
                _placeholder={{ color: "whiteAlpha.600" }}
              />
            </Box>

            {/* Buttons */}
            <Box display="flex" gap={4} w={{ base: "100%", md: "70%", md: "100%" }} justifyContent="space-between" flexDirection={{ base: "column", md: "row" }}>
              <Button
                mb={{ base: 2, md: 0 }}
                w={{ base: "100%", md: "200px", md: "270px" }}
                borderColor="#24A0B5"
                bg="transparent"
                color="#24A0B5"
                onClick={() => navigate("/ticket-selection")}
              >
                Back
              </Button>
              <Button
                bg="#24A0B5"
                color="white"
                w={{ base: "100%", md: "200px", md: "270px" }}
                type="submit"
                isLoading={uploading}
                loadingText="Generating Ticket"
                isDisabled={uploading}
              >
                Get my free Ticket
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Layout>
  );
};

export default UserForm;
