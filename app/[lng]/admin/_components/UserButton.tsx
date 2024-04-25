'use client';

import { signOut } from '@/actions/auth.actions';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const UserButton = () => {
  const logOut = () => {
    signOut();
  };
  return (
    <div onClick={logOut} className="cursor-pointer">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
export default UserButton;
