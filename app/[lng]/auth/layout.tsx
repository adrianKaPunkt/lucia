import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-slate-600">
        {children}
      </div>
    </>
  );
};
export default AuthLayout;
