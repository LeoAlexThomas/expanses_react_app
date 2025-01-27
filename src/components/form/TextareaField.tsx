import {
  Box,
  chakra,
  Text,
  Textarea,
  TextareaProps,
  TextProps,
  VStack,
} from "@chakra-ui/react";
import get from "lodash/get";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { Field } from "@/components/ui/field";
import isEmpty from "lodash/isEmpty";

interface CustomTextAreaFieldProps<T extends FieldValues> {
  name: Path<T>;
  hForm: UseFormReturn<T>;
  rules: RegisterOptions<T>;
  title: string;
  titleProps?: TextProps;
}

export type TextAreaFieldProps<T extends FieldValues> =
  CustomTextAreaFieldProps<T> & Omit<TextareaProps, "name">;

function TextareaField<T extends FieldValues>({
  hForm,
  name,
  rules,
  title,
  titleProps,
  ...props
}: TextAreaFieldProps<T>) {
  const {
    formState: { errors },
    register,
  } = hForm;

  const error = get(errors, name);
  console.log("Error Message: ", error?.message);
  return (
    <Field
      required={Boolean(rules?.required)}
      invalid={Boolean(error)}
      errorText={
        isEmpty(error?.message) || error?.type === "required"
          ? "This field is required"
          : "Something went wrong"
      }
    >
      <VStack alignItems="stretch" w="100%">
        <Text
          fontSize={["12px", null, "16px"]}
          fontWeight={500}
          lineHeight="1.2"
          {...titleProps}
        >
          {title}{" "}
          {Boolean(rules.required) ? (
            <chakra.span color="#ff5b5b">*</chakra.span>
          ) : (
            ""
          )}
        </Text>
        <Box>
          <Textarea
            fontSize="14px"
            lineHeight="1.25"
            border="1px solid black"
            _hover={{}}
            borderRadius="8px"
            p={2}
            {...props}
            {...register(name, rules)}
          />
        </Box>
      </VStack>
    </Field>
  );
}
export default TextareaField;
