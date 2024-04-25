'use client';

import LanguageButton from '@/components/LanguageButton';
import { useTranslation } from '@/lib/i18n/client';

const ImprintPage = ({ params }: any) => {
  const { t } = useTranslation(params.lng, 'imprint');
  return (
    <section>
      <div className="flex justify-center pt-10">
        <div className="fra-responsive">
          <h1 className="text-5xl">{t('title')}</h1>
          <p className="pt-10 text-2xl font-semibold">
            <span className="font-bold text-frablue">FRAJET&#174;</span>{' '}
            Luftverkehrsgesellschaft GmbH i.G.
          </p>
          <br />
          <p className="text-2xl font-light">
            Ned. Kujundzic
            <br />
            Board of Directors
            <br />
            <br />
            Nordendstr. 2<br />
            64546 Mörfelden-Walldorff
            <br />
            Germany
            <br />
            <br />
            Telefon: +49 (0) 6105 70 60 86-0
            <br />
            Fax: +49 (0) 6105 70 62 40-0
            <br />
            Mobil: +49 (0) 160 97 505 73 8<br />
            E-Mail: <a href="mailto:info@frajet.net">info(at)frajet.net</a>
            <br />
          </p>
        </div>
      </div>
    </section>
  );
};
export default ImprintPage;
