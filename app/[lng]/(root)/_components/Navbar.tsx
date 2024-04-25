import LanguageButton from '@/components/LanguageButton';
import { ThemeButton } from '@/components/ThemeButton';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center">
      <div>
        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={150} height={50} />
        </Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <LanguageButton />
        <ThemeButton />
      </div>
    </nav>
  );
};
export default Navbar;
