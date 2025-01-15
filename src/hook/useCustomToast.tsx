import { createToaster } from "@chakra-ui/react";

const toastId = "toast-id";

export enum ToastStatusEnum {
  info = "info",
  warning = "warning",
  success = "success",
  error = "error",
}

const useCustomToast = () => {
  const showToast = ({
    title,
    status,
    description,
    duration = 3000,
  }: {
    title: string;
    status: ToastStatusEnum;
    description?: string;
    duration?: number; // milliseconds
  }) => {
    const toast = createToaster({
      id: toastId,
      max: 1,
      placement: "bottom-end",
      duration: duration,
    });
    return toast.create({
      title,
      description,
      type: status,
    });
  };

  return {
    showToast,
  };
};

export default useCustomToast;
