import { useForm } from "react-hook-form";
import { CreateExpenseInterface } from "../../types/project";
import React from "react";
import { VStack } from "@chakra-ui/react";
import InputField from "../form/InputField";
import { useApi } from "../../hook/useApi";
import api from "../api";
import { createExpenseFormId } from "../utils";
import dayjs from "dayjs";
import isNil from "lodash/isNil";

const ExpensesForm = ({
  projectId,
  onSuccess,
  defaultValues,
  onEditExpense,
}: {
  projectId: string;
  onSuccess?: () => void;
  defaultValues?: CreateExpenseInterface;
  onEditExpense?: (values: CreateExpenseInterface) => void;
}) => {
  const { makeApiCall } = useApi();
  const expensesHookForm = useForm<CreateExpenseInterface>({
    mode: "onChange",
    defaultValues: defaultValues ?? {
      title: "",
      spent: 0,
      date: "",
      isCompleted: false,
      projectId: projectId,
    },
  });

  const onSubmit = (values: CreateExpenseInterface) => {
    if (isNil(defaultValues)) {
      makeApiCall({
        apiFn: () =>
          api("/expense/create", {
            method: "POST",
            data: { ...values, date: dayjs(values.date).toISOString() },
          }),
        successMsg: {
          title: "Expense added successfully",
        },
        onSuccess: (res) => onSuccess?.(),
      });
      return;
    }
    onEditExpense?.(values);
  };

  return (
    <form
      id={createExpenseFormId}
      onSubmit={expensesHookForm.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch" spaceY={4}>
        <InputField
          hForm={expensesHookForm}
          name="title"
          title="Title"
          placeholder="Enter Expense Title"
          rules={{ required: true }}
        />
        <InputField
          hForm={expensesHookForm}
          name="spent"
          title="Spent Amount"
          placeholder="Enter Amount"
          type="number"
          rules={{ required: true }}
          min={1}
        />
        <InputField
          hForm={expensesHookForm}
          name="date"
          rules={{
            required: true,
          }}
          title="Due Date"
          placeholder="Select due date..."
          type="date"
          min={dayjs().add(1, "day").toISOString().split("T")[0]}
        />
      </VStack>
    </form>
  );
};

export default ExpensesForm;
