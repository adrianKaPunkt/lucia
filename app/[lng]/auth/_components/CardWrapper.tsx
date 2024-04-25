'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeButton } from '@/components/ThemeButton';
import Image from 'next/image';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  description?: string;
  backButtonHref: string;
  backButtonLabel: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  description,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className={`sm:w-[500px] md:w-[1200px] shadow-md`}>
      <CardHeader>
        <div className="w-full flex justify-end">
          <ThemeButton />
        </div>
        <div className="w-full flex justify-center">
          <Link href="/">
            <Image src="/icons/logo.svg" alt="logo" width={200} height={80} />
          </Link>
        </div>
        <h1 className="text-2xl font-bold pt-7 text-center">{headerLabel}</h1>
        <p className="py-4 text-sm text-center">{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
