import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DayModal from './DayModal';
import { CgSun } from 'react-icons/cg';

interface ColumnsProps {
  changeColumns: (col: ColumnDef<any>[]) => void;
  y: string;
  m: string;
}

const Columns = ({ changeColumns, y, m }: ColumnsProps) => {
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState();
  const [modalDay, setModalDay] = useState('');

  useEffect(() => {
    changeColumns(getColumns(y, m));
  }, [m, y]);

  const getColumns = (year: string, month: string) => {
    const days = dayjs(`${year}-${month}-01`).daysInMonth();
    const cols: ColumnDef<any>[] = [
      {
        id: 'image',
        accessorKey: 'image',
        header: 'Image',
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
        id: 'lastName',
        accessorKey: 'lastName',
        header: ({ column }) => {
          return (
            <Button
              className="p-0"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }>
              Last Name
            </Button>
          );
        },
      },
      {
        id: 'firstName',
        accessorKey: 'firstName',
        header: ({ column }) => {
          return (
            <Button
              className="p-0"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }>
              First Name
            </Button>
          );
        },
      },
    ];

    const today = dayjs(new Date()).format('YYYY-MM-DD');
    for (let i = 1; i <= days; i++) {
      let date = dayjs(`${year}-${month}-${i}`);
      let day = date.format('YYYY-MM-DD');
      cols.push({
        minSize: 10,
        maxSize: 10,
        id: day,
        accessorKey: `${day + 'T00:00:00.000Z'}`,
        header: ({ column }) => {
          return (
            <div
              className={`text-center text-xs flex-col justify-center ${
                dayjs(date).format('YYYY-MM-DD') === today
                  ? 'text-green-600'
                  : date.format('ddd') === 'Sun'
                  ? 'text-red-800'
                  : 'text-gray-500'
              }`}>
              <div>{date.format('DD')}</div>
              <div>{date.format('ddd')}</div>
            </div>
          );
        },
        cell: ({ row }) => {
          let user = row.original;
          return (
            <div
              className="flex justify-center items-center cursor-pointer w-8 h-8"
              onClick={() => showDayModal(user, day)}>
              <div id={`${day}--${user.id}`}>
                <CgSun />
              </div>
            </div>
          );
        },
      });
    }

    return cols;
  };

  const showDayModal = (user?: any, date?: string) => {
    if (user) setModalUser(user);
    if (date) setModalDay(date);
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <DayModal showModal={showDayModal} user={modalUser} date={modalDay} />
      )}
    </>
  );
};
export default Columns;
