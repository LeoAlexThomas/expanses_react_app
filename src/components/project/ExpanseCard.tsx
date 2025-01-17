import { ExpanseInterface } from "@/types/project";
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Checkbox } from "../ui/checkbox";
import { useApi } from "@/hook/useApi";
import api from "../api";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";

const ExpanseCard = ({
  expanse,
  projectMutate,
}: {
  expanse: ExpanseInterface;
  projectMutate?: () => void;
}) => {
  const { makeApiCall } = useApi();

  const handleChange = (checked: boolean) => {
    makeApiCall({
      apiFn: () =>
        api(`/expanse/update/${expanse._id}`, {
          method: "PUT",
          data: {
            ...expanse,
            isCompleted: checked,
          },
        }),
      onSuccess: (res) => {
        projectMutate?.();
      },
    });
  };

  const handleExpanseDelete = () => {
    makeApiCall({
      apiFn: () =>
        api(`/expanse/delete/${expanse._id}`, {
          method: "DELETE",
        }),
      onSuccess: (res) => {
        projectMutate?.();
      },
    });
  };

  return (
    <Box p={3} boxShadow="md" borderRadius="8px">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack alignItems="stretch" justifyContent="space-between">
          <Text
            fontFamily="Playfair Display"
            fontSize={["20px", null, "16px"]}
            fontWeight={600}
            lineHeight="1.25"
          >
            {expanse.title}
          </Text>
          <Text
            fontFamily="Roboto"
            fontSize={["14px", null, "16px"]}
            lineHeight="1.25"
            fontWeight={500}
          >
            {expanse.isCompleted ? "Spent: " : "Payment: "}
            <chakra.span fontWeight={800} color="red">
              ₹{expanse.spent}
            </chakra.span>
          </Text>
          <Text
            fontFamily="Roboto"
            fontSize={["12px", null, "14px"]}
            lineHeight="1.25"
          >
            Last Date:{" "}
            <chakra.span fontWeight={500}>
              {dayjs(expanse.date).format("MMM DD, YYYY")}
            </chakra.span>
          </Text>
        </VStack>
        <VStack alignItems="flex-end" gap={4}>
          <Checkbox
            checked={expanse.isCompleted}
            onCheckedChange={(e) => handleChange(e.checked as boolean)}
          />
          <IconButton
            aria-label="Delete Expanse"
            size="xs"
            variant="subtle"
            bg="red.50"
            borderRadius="8px"
            onClick={handleExpanseDelete}
            _icon={{
              width: "25px",
              height: "25px",
              color: "red",
            }}
          >
            <Delete />
          </IconButton>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ExpanseCard;
