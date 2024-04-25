'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import DebouncedInput from '@/components/dataTable/DebouncedInput';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import DayModal from './DayModal';
import axios from 'axios';
import Loader from '@/components/Loader';

interface DataTableProps<TData, TValue> {
  initialSort: [] | any;
}

const DataTable = () => {
  //--
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [year, setYear] = useState(dayjs(new Date()).format('YYYY'));
  const [month, setMonth] = useState(dayjs(new Date()).format('MM'));

  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState();
  const [modalDay, setModalDay] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios
        .get('http://localhost:3000/api/calendar/')
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.log(error));
      setData(user);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const columns = (year: string, month: string) => {
    const days = dayjs(`${year}-${month}-01`).daysInMonth();
    const cols: ColumnDef<any>[] = [
      {
        id: 'image',
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
          return (
            <Image
              src={row.getValue('image')}
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
              <div
                id={`${day}--${user.id}`}
                className={`text-center rounded-full ${'bg-gray-600'} hover:bg-gray-400 w-5 h-5`}>
                {}
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

  const table = useReactTable({
    data,
    columns: columns(year, month),
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugColumns: true,
    enableSorting: true,
  });

  const changeMonth = (value: number) => {
    let m = Number(month) + value;
    if (m === 0) {
      m = 12;
      setYear((Number(year) - 1).toString());
    }
    if (m === 13) {
      m = 1;
      setYear((Number(year) + 1).toString());
    }
    setMonth(m.toString());
  };

  if (isLoading) {
    return (
      <div className="z-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {modal && (
        <DayModal showModal={showDayModal} user={modalUser} date={modalDay} />
      )}
      <div>
        <div className="flex items-center justify-between">
          {/* <div className="items-center py-4">
            <DebouncedInput
              placeholder="Search ..."
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              className="max-w-sm"
            />
          </div> */}
          <div className="flex items-center">
            <Image
              className="cursor-pointer"
              src="/icons/chevron-left.svg"
              alt="prev"
              width={20}
              height={20}
              onClick={() => changeMonth(-1)}
            />
            <Input
              type="text"
              className="w-12 text-right bg-transparent"
              value={dayjs(`${year}-${month}-01`).format('MM')}
              onChange={(e) => setMonth(e.target.value)}
            />
            <p> - </p>
            <Input
              type="text"
              className="w-16 text-left bg-transparent"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Image
              className="cursor-pointer"
              src="/icons/chevron-right.svg"
              alt="prev"
              width={20}
              height={20}
              onClick={() => changeMonth(1)}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Select
          onValueChange={(e) => {
            table.setPageSize(Number(e));
          }}>
          <SelectTrigger
            value={table.getState().pagination.pageSize}
            className="w-[100px]">
            <SelectValue
              placeholder={'Show ' + table.getState().pagination.pageSize}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[10, 15, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
};
export default DataTable;
