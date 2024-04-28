import { ThemeButton } from '@/components/ThemeButton';
import Image from 'next/image';
import Link from 'next/link';
import UserButton from './UserButton';

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full h-16 bg-slate-300 dark:bg-slate-700 flex items-center justify-between p-3">
      <div>
        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={140} height={35} />
        </Link>
      </div>
      <div className="flex gap-x-4">
        <ThemeButton />
        <UserButton />
      </div>
    </nav>
  );
};
export default Navbar;
