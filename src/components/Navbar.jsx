import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  useDisclosure,
  VStack,
  Collapse,
  Portal,
} from '@chakra-ui/react';
import LogoImage from "../assets/Frame 1618871078.png";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Logo = () => <Image src={LogoImage} alt="Logo" w="60px" />;

const NavLink = ({ children, ...props }) => (
  <Link
    fontWeight="medium"
    fontSize="lg"
    color="white"
    _hover={{ color: 'gray.400', transition: 'color 0.3s ease-in-out' }}
    {...props}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
    bg="#05252C"
    px={6}
    py={3}
    w="100%"
    color="white"
    border="1px solid #197686"
    position="fixed" 
    top="0"          
    left="0"         
    right="0"        
    zIndex={50}
      >
      <Flex h={16} align="center" justify="space-between">
        {/* Logo */}
        <Logo />

        {/* Navigation Links (Hidden on Small Screens) */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }} flex={1} justify="center">
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/my-tickets">My Tickets</NavLink>
          <NavLink href="/about">About Project</NavLink>
        </HStack>

        {/* Button & Hamburger Menu */}
        <HStack spacing={4}>
          <Button
            bg="white"
            color="black"
            borderRadius="full"
            size="sm"
            _hover={{ bg: 'gray.200' }}
          >
            My Tickets →
          </Button>

          {/* Hamburger Menu (Only on Small Screens) */}
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ base: 'block', md: 'none' }}
            onClick={onToggle}
            aria-label="Open Menu"
            bg="transparent"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
        </HStack>
      </Flex>

      {/* Mobile Dropdown Menu (Only Visible on Small Screens) */}
      <Portal>
        <Collapse in={isOpen} animateOpacity>
          <Box
            w="100%"
            bg="#05252C"
            py={4}
            mt="20px"
            borderRadius="md"
            zIndex={30}
            position="fixed"
            top="64px"  // Adjusted to keep the dropdown below the navbar
            left="0"
            display={{ base: 'block', md: 'none' }} // Ensure it's only visible on small screens
          >
            <VStack spacing={4} align="center">
              <NavLink href="/events" onClick={onToggle}>Events</NavLink>
              <NavLink href="/my-tickets" onClick={onToggle}>My Tickets</NavLink>
              <NavLink href="/about" onClick={onToggle}>About Project</NavLink>
            </VStack>
          </Box>
        </Collapse>
      </Portal>
    </Box>
  );
};

export default Navbar;
