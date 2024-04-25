import SignUpForm from '@/app/[lng]/auth/_components/SignUpForm';
import { validateRequest } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import CardWrapper from '../_components/CardWrapper';

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/auth/sign-in');
  }
  return (
    <CardWrapper
      headerLabel="Sign Up"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Already have an account?">
      <SignUpForm />
    </CardWrapper>
  );
}
