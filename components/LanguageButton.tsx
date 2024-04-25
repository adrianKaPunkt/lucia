'use client';

import Link from 'next/link';
import { languages } from '@/lib/i18n/settings';
import { useParams, usePathname } from 'next/navigation';

const LanguageButton = () => {
  const pathName = usePathname();
  const params = useParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  return (
    <div>
      {languages.map((locale) => {
        return (
          <span key={locale}>
            {locale !== params.lng && (
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default LanguageButton;
