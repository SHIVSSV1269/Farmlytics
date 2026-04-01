import React, { createContext, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, FormProvider, useFormContext, FieldValues, FieldPath } from "react-hook-form";

// ---------- Context ----------
type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const Form = FormProvider;

// ---------- Form Field ----------
export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: any // same props as Controller
) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    error: fieldState.error,
  };
};

// ---------- UI Components ----------
export const FormItem = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return <View style={[styles.formItem, style]}>{children}</View>;
};

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
  const { error } = useFormField();
  return <Text style={[styles.label, error && styles.labelError]}>{children}</Text>;
};

export const FormControl = (props: any) => {
  const { error } = useFormField();
  return <TextInput style={[styles.input, error && styles.inputError]} {...props} />;
};

export const FormDescription = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.description}>{children}</Text>;
};

export const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  const { error } = useFormField();
  const body = error ? String(error?.message) : children;
  if (!body) return null;
  return <Text style={styles.error}>{body}</Text>;
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  formItem: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  labelError: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
  },
  inputError: {
    borderColor: "red",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
