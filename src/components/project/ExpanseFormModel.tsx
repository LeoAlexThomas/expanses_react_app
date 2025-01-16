import { PrimaryButton, SecondaryButton } from "../Buttons";
import CustomModel from "../CustomModal";
import { createExpanseFormId } from "../utils";
import ExpansesForm from "./ExpanseForm";

const ExpanseFormModel = ({
  projectId,
  isOpen,
  onClose,
}: {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onClose}
      title="Create Expanse"
      footer={
        <>
          <PrimaryButton form={createExpanseFormId} type="submit">
            Create Expanse
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      }
    >
      <ExpansesForm projectId={projectId} onSuccess={onClose} />
    </CustomModel>
  );
};

export default ExpanseFormModel;
