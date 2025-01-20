import { useForm } from "react-hook-form";
import { CreateProjectInterface } from "../../types/project";
import React from "react";
import { VStack } from "@chakra-ui/react";
import InputField from "../form/InputField";
import TextareaField from "../form/TextareaField";
import { createProjectFormId } from "../utils";
import { useApi } from "../../hook/useApi";
import api from "../api";
import CustomReactAsyncSelectField from "../form/CustomReactAsyncSelectField";
import { UserInterface } from "@/types/user";
import { isArray, isNil } from "lodash";
import { mutate } from "swr";

const ProjectForm = ({
  defaultValues,
  onSuccess,
  onEditProject,
}: {
  defaultValues?: CreateProjectInterface;
  onSuccess?: () => void;
  onEditProject?: (values: any) => void;
}) => {
  const { makeApiCall } = useApi();
  const projectHookForm = useForm<CreateProjectInterface>({
    mode: "onChange",
    defaultValues: defaultValues ?? {
      title: "",
      totalSpent: 0,
      memberIds: [],
    },
  });

  const onSubmit = (values: CreateProjectInterface) => {
    const requestObj = {
      ...values,
      title: values.title.trim(),
      description: values.description || null,
      members: values.memberIds.map((member) => member.value),
    };
    if (isNil(defaultValues)) {
      makeApiCall({
        apiFn: () =>
          api("/project/create", {
            method: "POST",
            data: requestObj,
          }),
        successMsg: {
          title: "Project created successfully",
        },
        onSuccess: (res) => {
          mutate("/project/all");
          onSuccess?.();
        },
      });
      return;
    }
    onEditProject?.(requestObj);
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
        <CustomReactAsyncSelectField
          hForm={projectHookForm}
          name="memberIds"
          title="Members"
          placeholder="Select members for project"
          isMultiChoice
          rules={{ required: false }}
          getOptions={(value) =>
            api(`/user/all?searchText=${value}`).then(
              (values: UserInterface[]) => {
                if (!isArray(values)) {
                  return [];
                }
                return values.map((user) => ({
                  label: `${user.name} (${user.email})`,
                  value: user._id,
                }));
              }
            )
          }
        />
      </VStack>
    </form>
  );
};

export default ProjectForm;
