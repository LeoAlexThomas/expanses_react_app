import { CreateProjectInterface } from "@/types/project";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import CustomModel from "../CustomModal";
import { createProjectFormId } from "../utils";
import ProjectForm from "./ProjectForm";

const ProjectFormModel = ({
  isOpen,
  onClose,
  defaultFormValues,
  onEditProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultFormValues?: CreateProjectInterface;
  onEditProject?: (values: any) => void;
}) => {
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onClose}
      title={defaultFormValues ? "Edit Project" : "Create project"}
      footer={
        <>
          <PrimaryButton form={createProjectFormId} type="submit">
            {defaultFormValues ? "Edit Project" : "Create Project"}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      }
    >
      <ProjectForm
        onSuccess={onClose}
        defaultValues={defaultFormValues}
        onEditProject={onEditProject}
      />
    </CustomModel>
  );
};

export default ProjectFormModel;
