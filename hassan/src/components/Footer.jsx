import { Box, Text, HStack, VStack } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/layout';  // Import spécifique pour Divider

const Footer = () => {
  return (
    <Box mt={8}>
      <Divider my={4} />
      <VStack spacing={2} textAlign="center" fontSize="sm">
        <Text fontWeight="bold">Capital Trading Private Limited Company</Text>
        <Text>3rd Floor - Zenith II Building, Christian Tobie Kush Street - Benanjo, P.O.Box 18302 Douala, Cameroon</Text>
        <HStack justify="center" spacing={4}>
          <Text>Tel +237 691 149 100 / 33 42 45 92</Text>
          <Text>Fax +237 33 42 45 92</Text>
        </HStack>
        <Text>Email: info@capitaltrading-cnn.com</Text>
        <Text>Web: www.capitaltrading-cnn.com</Text>
      </VStack>
    </Box>
  );
};

export default Footer;


// import { Box, Text, HStack, VStack } from '@chakra-ui/react';

// // Créez votre propre Divider
// const MyDivider = () => (
//   <Box 
//     width="100%" 
//     height="1px" 
//     bg="gray.200" 
//     my={4}
//   />
// );

// const Footer = () => {
//   return (
//     <Box mt={8}>
//       <MyDivider />
//       {/* ... reste du code inchangé ... */}

//       <VStack spacing={2} textAlign="center" fontSize="sm">
//         <Text fontWeight="bold">Capital Trading Private Limited Company</Text>
//         <Text>3rd Floor - Zenith II Building, Christian Tobie Kush Street - Benanjo, P.O.Box 18302 Douala, Cameroon</Text>
//         <HStack justify="center" spacing={4}>
//           <Text>Tel +237 691 149 100 / 33 42 45 92</Text>
//           <Text>Fax +237 33 42 45 92</Text>
//         </HStack>
//         <Text>Email: info@capitaltrading-cnn.com</Text>
//         <Text>Web: www.capitaltrading-cnn.com</Text>
//       </VStack>
//     </Box>
//   );
// };

// export default Footer;