import { z } from 'zod';

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'It has to be an email!' })
      .min(2)
      .max(50),
    password: z
      .string()
      .min(6, { message: 'The password must be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'The password must be at least 6 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SignInSchema = z.object({
  email: z.string().email({ message: 'It has to be an email!' }).min(2).max(50),
  password: z
    .string()
    .min(6, { message: 'The password must be at least 6 characters long' }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: 'It has to be an email!' }).min(2).max(50),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'The password must be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'The password must be at least 6 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
