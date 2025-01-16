import { ExpanseInterface } from "@/types/project";
import { Box, chakra, Text, VStack } from "@chakra-ui/react";

const ExpanseCard = ({ expanse }: { expanse: ExpanseInterface }) => {
  return (
    <Box p={3} boxShadow="md" borderRadius="8px">
      <VStack alignItems="stretch" justifyContent="space-between">
        <Text
          fontFamily="Playfair Display"
          fontSize={["14px", null, "16px"]}
          fontWeight={600}
          lineHeight="1.25"
        >
          {expanse.title}
        </Text>
        <Text
          fontFamily="Roboto"
          fontSize={["12px", null, "14px"]}
          lineHeight="1.25"
          fontWeight={500}
        >
          Spent:{" "}
          <chakra.span fontWeight={800} color="red">
            ₹{expanse.spent}
          </chakra.span>
        </Text>
      </VStack>
    </Box>
  );
};

export default ExpanseCard;
