import { CreateExpanseInterface } from "@/types/project";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import CustomModel from "../CustomModal";
import { createExpanseFormId } from "../utils";
import ExpansesForm from "./ExpanseForm";

const ExpanseFormModel = ({
  projectId,
  isOpen,
  onClose,
  onSuccess,
  onEditExpense,
  defaultFormValues,
}: {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onEditExpense?: (values: CreateExpanseInterface) => void;
  defaultFormValues?: CreateExpanseInterface;
}) => {
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onClose}
      title={defaultFormValues ? "Edit Expense" : "Create Expense"}
      footer={
        <>
          <PrimaryButton form={createExpanseFormId} type="submit">
            {defaultFormValues ? "Edit Expense" : "Create Expense"}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      }
    >
      <ExpansesForm
        projectId={projectId}
        onSuccess={onSuccess}
        onEditExpense={onEditExpense}
        defaultValues={defaultFormValues}
      />
    </CustomModel>
  );
};

export default ExpanseFormModel;
