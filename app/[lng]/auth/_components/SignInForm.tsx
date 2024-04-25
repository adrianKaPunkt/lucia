'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignInSchema } from '@/lib/db/schemas/auth';
import { resendVerificationEmail, signIn } from '@/actions/auth.actions';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import Link from 'next/link';

const SignInForm = () => {
  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState(false);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 180,
      intervalMs: 1000,
    });
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count, resetCountdown, stopCountdown]);

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values);
    if (res.error) {
      toast({
        variant: 'destructive',
        description: res.error,
      });
      if (res?.key === 'email_not_verified') {
        setShowResendVerificationEmail(true);
      }
    } else if (res.success) {
      toast({
        variant: 'default',
        description: 'Signed In successfully',
      });
      router.push('/admin');
    }
  }

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues('email'));
    if (res.error) {
      toast({
        variant: 'destructive',
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: 'default',
        description: res.success,
      });
      startCountdown();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/auth/forgot-password" className="text-xs">
            Forgot Password?
          </Link>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        {showResendVerificationEmail && (
          <Button
            onClick={onResendVerificationEmail}
            variant="link"
            disabled={count > 0 && count < 180}>
            Send verification email
          </Button>
        )}
      </Form>
    </>
  );
};
export default SignInForm;
