import { validateRequest } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import CardWrapper from '../_components/CardWrapper';
import NewPasswordForm from '../_components/NewPasswordForm';

const NewPasswordPage = async () => {
  const { user } = await validateRequest();
  if (!user) return redirect('/auth/sign-in');
  return (
    <CardWrapper
      headerLabel="New Password"
      backButtonHref="/auth/sign-in"
      backButtonLabel="login">
      <h1></h1>
      <NewPasswordForm userId={user.id} />
    </CardWrapper>
  );
};
export default NewPasswordPage;
