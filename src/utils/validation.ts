import type { TranslationKey } from "@/src/i18n/translations";

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export type FieldErrors<K extends string> = Partial<Record<K, TranslationKey>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateLogin(values: LoginValues): FieldErrors<"email" | "password"> {
  const errors: FieldErrors<"email" | "password"> = {};
  if (!values.email.trim()) errors.email = "errEmailRequired";
  else if (!isValidEmail(values.email)) errors.email = "errEmailInvalid";
  if (!values.password) errors.password = "errPasswordRequired";
  return errors;
}

export function validateRegister(values: RegisterValues): FieldErrors<
  "name" | "email" | "password" | "confirm"
> {
  const errors: FieldErrors<"name" | "email" | "password" | "confirm"> = {};
  if (!values.name.trim()) errors.name = "errNameRequired";
  if (!values.email.trim()) errors.email = "errEmailRequired";
  else if (!isValidEmail(values.email)) errors.email = "errEmailInvalid";
  if (!values.password) errors.password = "errPasswordRequired";
  else if (values.password.length < 6) errors.password = "errPasswordShort";
  if (values.confirm !== values.password) errors.confirm = "errPasswordMismatch";
  return errors;
}

export function hasErrors(errors: Record<string, unknown>): boolean {
  return Object.keys(errors).length > 0;
}