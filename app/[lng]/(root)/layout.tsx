import { ReactNode } from 'react';
import { languages } from '@/lib/i18n/settings';
import Navbar from './_components/Navbar';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface HomePageLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

const HomePageLayout = ({ children, params: { lng } }: HomePageLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default HomePageLayout;
