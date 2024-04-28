'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/data-table/SelectTable';
import axios from 'axios';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <Image
          src="/icons/logo.svg"
          alt={row.getValue('firstName')}
          width={40}
          height={40}
          className="rounded-full"
        />
      );
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="p-0 w-2 h-2"
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }></Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const gender = row.getValue('gender');
      return (
        <div
          className={`${
            gender === true
              ? 'bg-blue-500'
              : gender === false
              ? 'bg-pink-400'
              : 'bg-green-300'
          } w-3 h-3 rounded-full`}
        />
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Last Name
        </Button>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          First Name
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
        </Button>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            Role
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      let role = row.getValue('role');
      return (
        <Select onValueChange={(e) => updateRole(user.id, e)}>
          <SelectTrigger
            className={`${
              role === 'ADMIN'
                ? 'text-green-400'
                : role === 'USER'
                ? 'text-blue-500'
                : 'text-yellow-500'
            } bg-transparent border-none`}>
            <SelectValue placeholder={row.getValue('role')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GUEST" className="text-yellow-700">
              GUEST
            </SelectItem>
            <SelectItem value="USER" className="text-blue-500">
              USER
            </SelectItem>
            <SelectItem value="ADMIN" className="text-green-400">
              ADMIN
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Country
        </Button>
      );
    },
  },
  {
    accessorKey: 'mobile',
    header: 'Phone',
  },
  {
    accessorKey: 'birthday',
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="flex p-0"
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            Birthday
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = dayjs(row.getValue('birthday')).format('DD.MM.YYYY');
      return <span>{date}</span>;
    },
  },
  {
    id: 'age',
    header: 'Age',
    cell: ({ row }) => {
      const birthdate = new Date(row.getValue('birthday'));
      const age = dayjs(new Date()).diff(birthdate, 'y');
      return <span>{age}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/users/${encodeURIComponent(user.id)}`}>
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>AAA</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const updateRole = async (id: string, role: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update/role/`,
      {
        id: id,
        role: role,
      }
    );
    toast({
      variant: 'default',
      description: 'role updated',
    });
  } catch (error) {
    console.error('upadte failed', error);
    toast({
      variant: 'destructive',
      description: 'could not update role',
    });
  }
};
