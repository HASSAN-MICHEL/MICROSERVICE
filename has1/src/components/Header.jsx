import { Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Heading 
      as="h1" 
      size="lg" 
      textAlign="center" 
      mb={4} 
      className="text-uppercase company-header"
    >
      CAPITAL TRADING COMPANY
    </Heading>
  );
};

export default Header;