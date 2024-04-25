import CardWrapper from '../_components/CardWrapper';
import ResetForm from '../_components/ResetForm';

const ResetPage = () => {
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to login">
      <ResetForm />
    </CardWrapper>
  );
};
export default ResetPage;
