import {
  Box,
  chakra,
  Input,
  InputProps,
  Text,
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

interface CustomInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  hForm: UseFormReturn<T>;
  rules: RegisterOptions<T>;
  title: string;
  titleProps?: TextProps;
}

export type InputFieldProps<T extends FieldValues> = CustomInputFieldProps<T> &
  Omit<InputProps, "name">;

function InputField<T extends FieldValues>({
  hForm,
  name,
  rules,
  title,
  titleProps,
  ...props
}: InputFieldProps<T>) {
  const {
    formState: { errors },
    register,
  } = hForm;

  const error = get(errors, name);

  return (
    <Field
      required={Boolean(rules?.required)}
      invalid={Boolean(error)}
      errorText={error ? "This field is required" : ""}
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
          <Input
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
export default InputField;
