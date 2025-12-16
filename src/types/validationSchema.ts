import i18n from '@/localization';
import * as yup from 'yup';

const t = (key: string, options?: any) => i18n.t(key, options);

const emailField = yup
  .string()
  .trim()
  .required(() => t('errors.required'))
  .email(() => t('errors.email'));

const passwordField = yup
  .string()
  .required(() => t('errors.required'))
  .min(6, ({ min }) => t('errors.passwordMin', { count: min }))
  .matches(/^\S+$/, () => t('errors.noSpaces'));

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});

export const registrationSchema = yup.object({
  email: emailField,
  password: passwordField,
  confirmPassword: yup
    .string()
    .required(() => t('errors.required'))
    .oneOf([yup.ref('password')], () => t('errors.equalPasswords')),
});

export type LoginData = yup.InferType<typeof loginSchema>;
export type RegistrationData = yup.InferType<typeof registrationSchema>;
