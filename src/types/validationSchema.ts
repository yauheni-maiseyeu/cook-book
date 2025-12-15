import * as yup from 'yup';

const emailField = yup
  .string()
  .trim()
  .required('Email обязателен')
  .email('Введите корректный email');

const passwordField = yup
  .string()
  .required('Пароль обязателен')
  .min(6, 'Пароль должен быть не менее 6 символов')
  .matches(/^\S+$/, 'Пароль не должен содержать пробелов');

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});

export const registrationSchema = yup.object({
  email: emailField,
  password: passwordField,
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export type LoginData = yup.InferType<typeof loginSchema>;
export type RegistrationData = yup.InferType<typeof registrationSchema>;
