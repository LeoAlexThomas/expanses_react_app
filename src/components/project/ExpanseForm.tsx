import { useForm } from "react-hook-form";
import { CreateExpanseInterface } from "../../types/project";
import React from "react";
import { VStack } from "@chakra-ui/react";
import InputField from "../form/InputField";
import { useApi } from "../../hook/useApi";
import api from "../api";
import { createExpanseFormId } from "../utils";

const ExpansesForm = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: () => void;
}) => {
  const { makeApiCall } = useApi();
  const ExpansesHookForm = useForm<CreateExpanseInterface>({
    mode: "onChange",
    defaultValues: {
      title: "",
      spent: 0,
      projectId: projectId,
    },
  });

  const onSubmit = (values: CreateExpanseInterface) => {
    makeApiCall({
      apiFn: () =>
        api("/expanse/create", {
          method: "POST",
          data: values,
        }),
      successMsg: {
        title: "Expanse added successfully",
      },
      onSuccess: (res) => onSuccess?.(),
    });
  };

  return (
    <form
      id={createExpanseFormId}
      onSubmit={ExpansesHookForm.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch" spaceY={4}>
        <InputField
          hForm={ExpansesHookForm}
          name="title"
          title="Title"
          rules={{ required: true }}
        />
        <InputField
          hForm={ExpansesHookForm}
          name="spent"
          title="Spent Amount"
          type="number"
          rules={{ required: true }}
          min={1}
        />
      </VStack>
    </form>
  );
};

export default ExpansesForm;
