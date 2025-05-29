import { Heading } from '@chakra-ui/react';
import { Box, Text, Divider, HStack, VStack } from "@chakra-ui/react";


const Header = () => {
  return (
    <Heading 
      as="h1" 
      size="lg" 
      textAlign="center" 
      mb={4} 
      textTransform="uppercase"
      letterSpacing="1px"
      color="brand.blue"
    >
      CAPITAL TRADING COMPANY
    </Heading>
  );
};

export default Header;