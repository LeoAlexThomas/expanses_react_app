import {
  chakra,
  createListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import get from "lodash/get";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export interface SelectOptionInterface {
  label: string;
  value: string;
}

function SelectField<T extends FieldValues>({
  hForm,
  name,
  rules,
  title,
  titleProps,
  options,
  ...props
}: {
  name: Path<T>;
  hForm: UseFormReturn<T>;
  rules: RegisterOptions<T>;
  title: string;
  titleProps?: TextProps;
  options: SelectOptionInterface[];
}) {
  const {
    formState: { errors },
    control,
  } = hForm;

  const error = get(errors, name);

  const selectCollection = createListCollection({ items: options });

  return (
    <Field
      required={Boolean(rules?.required)}
      invalid={Boolean(error)}
      errorText={error ? "This field is required" : ""}
      label={
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
      }
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={selectCollection}
            {...props}
          >
            <SelectContent>
              {selectCollection.items.map((opt) => (
                <SelectItem item={opt} key={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
}

export default SelectField;
