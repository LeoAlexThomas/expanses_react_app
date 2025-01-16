import { useForm } from "react-hook-form";
import { CreateProjectInterface } from "../../types/project";
import React from "react";
import { VStack } from "@chakra-ui/react";
import InputField from "../form/InputField";
import TextareaField from "../form/TextareaField";
import { createProjectFormId } from "../utils";
import { useApi } from "../../hook/useApi";
import api from "../api";

const ProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { makeApiCall } = useApi();
  const projectHookForm = useForm<CreateProjectInterface>({
    mode: "onChange",
    defaultValues: {
      title: "",
      totalSpent: 0,
    },
  });

  const onSubmit = (values: CreateProjectInterface) => {
    makeApiCall({
      apiFn: () =>
        api("/project/create", {
          method: "POST",
          data: { ...values, description: values.description || null },
        }),
      successMsg: {
        title: "Project created successfully",
      },
      onSuccess: (res) => onSuccess?.(),
    });
  };

  return (
    <form
      id={createProjectFormId}
      onSubmit={projectHookForm.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch" spaceY={4}>
        <InputField
          hForm={projectHookForm}
          name="title"
          title="Title"
          rules={{ required: true }}
        />
        <TextareaField
          hForm={projectHookForm}
          name="description"
          title="Description"
          rules={{ required: false }}
          h="100px"
          maxH={"100px"}
        />
      </VStack>
    </form>
  );
};

export default ProjectForm;
