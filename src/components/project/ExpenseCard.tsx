import { CreateExpenseInterface, ExpenseInterface } from "@/types/project";
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Checkbox } from "../ui/checkbox";
import { useApi } from "@/hook/useApi";
import api from "../api";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";
import { Edit } from "@emotion-icons/entypo/Edit";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { colors } from "../utils";
import CustomModel from "../CustomModal";
import ExpenseFormModel from "./ExpenseFormModel";
import { useThemeCheck } from "@/context/themeCheck";

const ExpenseCard = ({
  expense,
  projectMutate,
}: {
  expense: ExpenseInterface;
  projectMutate?: () => void;
}) => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const { isDarkTheme } = useThemeCheck();
  const {
    open: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const { makeApiCall } = useApi();

  const handleUpdateExpense = (values: CreateExpenseInterface) => {
    makeApiCall({
      apiFn: () =>
        api(`/expense/update/${expense._id}`, {
          method: "PUT",
          data: values,
        }),
      successMsg: {
        title: "Expense updated successfully",
      },
      onSuccess: (res) => {
        projectMutate?.();
        onClose();
      },
    });
  };

  const handleExpenseDelete = () => {
    makeApiCall({
      apiFn: () =>
        api(`/expense/delete/${expense._id}`, {
          method: "DELETE",
        }),
      successMsg: {
        title: "Expense delete successfully",
      },
      onSuccess: (res) => {
        projectMutate?.();
      },
    });
  };

  return (
    <Box
      p={3}
      w="100%"
      boxShadow="md"
      gap={4}
      borderRadius="8px"
      border="2px solid"
      borderColor={isDarkTheme ? colors.greyColor[5] : colors.greyColor[0]}
      bgGradient="to-tr"
      gradientFrom={isDarkTheme ? colors.greyColor[5] : colors.greyColor[0]}
      gradientTo={isDarkTheme ? colors.greyColor[8] : colors.greyColor[4]}
      transition="transform 0.3s ease-in-out"
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.02)",
      }}
    >
      <ExpenseFormModel
        isOpen={isOpen}
        onClose={onClose}
        projectId={expense.projectId}
        defaultFormValues={{
          projectId: expense.projectId,
          date: dayjs(expense.date).format("YYYY-MM-DD"),
          spent: expense.spent,
          title: expense.title,
          isCompleted: expense.isCompleted,
        }}
        onEditExpense={handleUpdateExpense}
        onSuccess={() => {
          onClose();
          projectMutate?.();
        }}
      />

      <CustomModel
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        title="Confirmation!!!"
        footer={
          <>
            <PrimaryButton
              bg={colors.redColor[2]}
              color={colors.redColor[7]}
              _hover={{
                bg: colors.redColor[1],
              }}
              onClick={handleExpenseDelete}
            >
              Delete
            </PrimaryButton>
            <SecondaryButton onClick={onConfirmationClose}>
              Close
            </SecondaryButton>
          </>
        }
      >
        <Text pb="60px">Are you sure you want to delete this expense?</Text>
      </CustomModel>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack alignItems="stretch" justifyContent="space-between">
          <Text
            fontFamily="Playfair Display"
            fontSize={["20px", null, "26px"]}
            fontWeight={800}
            lineHeight="1.25"
            color={isDarkTheme ? colors.greyColor[2] : colors.greyColor[6]}
          >
            {expense.title}
          </Text>
          <Text
            fontFamily="Roboto"
            fontSize={["14px", null, "18px"]}
            lineHeight="1.25"
            fontWeight={500}
            color={isDarkTheme ? colors.greyColor[2] : colors.greyColor[6]}
          >
            {expense.isCompleted ? "Spent: " : "Payment: "}
            <chakra.span fontWeight={800} color="red">
              ₹{expense.spent}
            </chakra.span>
          </Text>
          <Text
            fontFamily="Roboto"
            fontSize={["14px", null, "16px"]}
            lineHeight="1.25"
            color={isDarkTheme ? colors.greyColor[2] : colors.greyColor[6]}
          >
            Last Date:{" "}
            <chakra.span fontWeight={500}>
              {dayjs(expense.date).format("MMM DD, YYYY")}
            </chakra.span>
          </Text>
        </VStack>
        <VStack
          alignItems="flex-end"
          alignSelf="stretch"
          justifyContent="space-between"
        >
          <Checkbox
            _checked={{
              backgroundColor: isDarkTheme
                ? colors.blueColor[3]
                : colors.blueColor[8],
            }}
            checked={expense.isCompleted}
            onCheckedChange={(e) =>
              handleUpdateExpense({
                ...expense,
                isCompleted: e.checked as boolean,
              })
            }
          />
          <HStack w="100%">
            <IconButton
              variant="outline"
              bg="#00000000"
              borderRadius="8px"
              borderColor={
                isDarkTheme ? colors.blueColor[6] : colors.blueColor[8]
              }
              onClick={onOpen}
              color={colors.blueColor[4]}
              _icon={{
                w: "15px",
                h: "15px",
              }}
              _hover={{
                bg: colors.blueColor[0],
              }}
            >
              <Edit color={colors.blueColor[4]} />
            </IconButton>

            <IconButton
              variant="subtle"
              bg={colors.redColor[0]}
              borderRadius="8px"
              onClick={onConfirmationOpen}
              color={colors.redColor[4]}
              _hover={{
                bg: colors.redColor[1],
              }}
              _icon={{
                w: "20px",
                h: "20px",
              }}
            >
              <Delete />
            </IconButton>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ExpenseCard;
