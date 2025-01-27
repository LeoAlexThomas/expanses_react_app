import { CreateExpenseInterface } from "@/types/project";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import CustomModel from "../CustomModal";
import { createExpenseFormId } from "../utils";
import ExpensesForm from "./ExpanseForm";

const ExpenseFormModel = ({
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
  onEditExpense?: (values: CreateExpenseInterface) => void;
  defaultFormValues?: CreateExpenseInterface;
}) => {
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onClose}
      title={defaultFormValues ? "Edit Expense" : "Create Expense"}
      footer={
        <>
          <PrimaryButton form={createExpenseFormId} type="submit">
            {defaultFormValues ? "Save Expense" : "Create Expense"}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      }
    >
      <ExpensesForm
        projectId={projectId}
        onSuccess={onSuccess}
        onEditExpense={onEditExpense}
        defaultValues={defaultFormValues}
      />
    </CustomModel>
  );
};

export default ExpenseFormModel;
