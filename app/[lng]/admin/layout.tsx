'use server';

import SessionProvider from '@/lib/auth/SessionProvider';
import { validateRequest } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const sessionData = await validateRequest();
  if (!sessionData.user) return redirect('/auth/sign-in');

  return (
    <main className="h-screen w-full">
      <SessionProvider value={sessionData}>
        <Navbar />
        <div>
          <div className="flex pt-16 ml-6">
            <Sidebar />
            <div className="flex p-5 w-full h-[calc(100vh-64px)]">
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </main>
  );
};
export default AdminLayout;
