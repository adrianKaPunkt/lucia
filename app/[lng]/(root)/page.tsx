'use server';

import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

interface HomePageProps {
  params: { lng: string };
}

export default async function Home({ params: { lng } }: HomePageProps) {
  const { t } = await useTranslation(lng);
  let name = 'Adria';
  return (
    <div className="flex h-full flex-col items-center p-5">
      <p>{t('title', { name })}</p>
    </div>
  );
}
