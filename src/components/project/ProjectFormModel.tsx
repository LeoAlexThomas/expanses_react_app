import { PrimaryButton, SecondaryButton } from "../Buttons";
import CustomModel from "../CustomModal";
import { createProjectFormId } from "../utils";
import ProjectForm from "./ProjectForm";

const ProjectFormModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onClose}
      title="Create project"
      footer={
        <>
          <PrimaryButton form={createProjectFormId} type="submit">
            Create Project
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      }
    >
      <ProjectForm onSuccess={onClose} />
    </CustomModel>
  );
};

export default ProjectFormModel;
