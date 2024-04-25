import SignInForm from '@/app/[lng]/auth/_components/SignInForm';
import { validateRequest } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import CardWrapper from '../_components/CardWrapper';

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }
  return (
    <CardWrapper
      headerLabel="Sign In"
      description="Create a new Account"
      backButtonHref="/auth/sign-up"
      backButtonLabel="Don't have an account?">
      <SignInForm />
    </CardWrapper>
  );
}
