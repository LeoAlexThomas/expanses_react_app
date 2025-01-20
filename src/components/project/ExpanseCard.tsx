import { CreateExpanseInterface, ExpanseInterface } from "@/types/project";
import { chakra, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Checkbox } from "../ui/checkbox";
import { useApi } from "@/hook/useApi";
import api from "../api";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";
import { Edit } from "@emotion-icons/entypo/Edit";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { colors } from "../utils";
import ExpanseFormModel from "./ExpanseFormModel";
import CustomModel from "../CustomModal";

const ExpanseCard = ({
  expanse,
  projectMutate,
}: {
  expanse: ExpanseInterface;
  projectMutate?: () => void;
}) => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const {
    open: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const { makeApiCall } = useApi();

  const handleUpdateExpense = (values: CreateExpanseInterface) => {
    makeApiCall({
      apiFn: () =>
        api(`/expanse/update/${expanse._id}`, {
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

  const handleExpanseDelete = () => {
    makeApiCall({
      apiFn: () =>
        api(`/expanse/delete/${expanse._id}`, {
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
    <VStack
      alignItems="stretch"
      p={3}
      w="100%"
      boxShadow="md"
      gap={4}
      borderRadius="8px"
      _hover={{
        boxShadow: "md",
      }}
    >
      <ExpanseFormModel
        isOpen={isOpen}
        onClose={onClose}
        projectId={expanse.projectId}
        defaultFormValues={{
          projectId: expanse.projectId,
          date: dayjs(expanse.date).format("YYYY-MM-DD"),
          spent: expanse.spent,
          title: expanse.title,
          isCompleted: expanse.isCompleted,
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
              onClick={handleExpanseDelete}
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
        <Checkbox
          checked={expanse.isCompleted}
          onCheckedChange={(e) =>
            handleUpdateExpense({
              ...expanse,
              isCompleted: e.checked as boolean,
            })
          }
        />
      </HStack>
      <HStack w="100%">
        <PrimaryButton
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
          Delete
        </PrimaryButton>
        <SecondaryButton
          variant="outline"
          bg="#00000000"
          borderRadius="8px"
          onClick={onOpen}
          color={colors.blueColor[4]}
          _icon={{
            w: "15px",
            h: "15px",
          }}
        >
          <Edit color={colors.blueColor[4]} />
          Edit
        </SecondaryButton>
      </HStack>
    </VStack>
  );
};

export default ExpanseCard;
