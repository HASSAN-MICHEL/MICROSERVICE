import { Box, Heading, Text, Grid, GridItem, VStack } from '@chakra-ui/react';

const Section = ({ title, items = [] }) => (
  <Box mb={3}>
    <Text fontWeight="bold" textTransform="uppercase">{title}</Text>
    {items.length > 0 && (
      <Box pl={4}>
        {items.map((item, index) => (
          typeof item === 'string' ? (
            <Text key={index}>{item}</Text>
          ) : (
            <Box pl={4} key={index}>
              {item.nested.map((nestedItem, i) => (
                <Text key={i}>{nestedItem}</Text>
              ))}
            </Box>
          )
        ))}
      </Box>
    )}
  </Box>
);

const LeftColumn = () => (
  <GridItem>
    <VStack align="stretch" spacing={4}>
      <Section 
        title="SENSIFICIARY:" 
        items={[
          "OPERATION REHALES",
          "DESIGNATION",
          "ACCOUNTING RECORD",
          { nested: ["DEBITED ACCOUNT"] }
        ]}
      />
      <Section title="AMOUNT" />
      <Section title="AMOUNT IN WOOD:" />
      <Section title="REQUESTED BY:" items={["BURSARY"]} />
    </VStack>
  </GridItem>
);

const RightColumn = () => (
  <GridItem>
    <VStack align="stretch" spacing={4}>
      <Section title="VERIFIED BY:" items={["ACCOUNTANT"]} />
      <Section title="CREDITED ACCOUNT" />
      <Section title="TOTAL" />
      <Section title="CERTIFICATION" items={["ACCOUNT"]} />
      <Section title="APPROVED BY:" />
    </VStack>
  </GridItem>
);

const MonetaryUnit = () => {
  return (
    <Box mb={6}>
      <Heading as="h2" size="md" mb={4} textTransform="uppercase">
        MONETARY UNIT:
      </Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <LeftColumn />
        <RightColumn />
      </Grid>
    </Box>
  );
};

export default MonetaryUnit;