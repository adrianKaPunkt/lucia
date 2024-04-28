'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import DataTable from '@/components/data-table/DataTable';
import axios from 'axios';
import dayjs from 'dayjs';
import ChangeMonth from './_components/ChangeMonth';
import { ColumnDef } from '@tanstack/react-table';
import Columns from './_components/Colums';

const CalendarPage = () => {
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState(dayjs(new Date()).format('MM'));
  const [year, setYear] = useState(dayjs(new Date()).format('YYYY'));

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar`)
        .then((response) => {
          return response.data;
        });
      setData(users);
      //setColumns(getColumns(year, month));
      setIsLoading(false);
    };
    fetchData();
  }, [month, year]);

  if (isLoading) {
    return (
      <div className="z-50 w-full">
        <Loader />
      </div>
    );
  }

  const handleDate = (month: string, year: string) => {
    setMonth(month);
    setYear(year);
  };

  const getColumns = (columns: ColumnDef<any>[]) => {
    setColumns(columns);
  };

  return (
    <section className="mx-auto w-full">
      <Columns changeColumns={getColumns} y={year} m={month} />
      <div className="flex justify-center">
        <ChangeMonth changeData={handleDate} m={month} y={year} />
      </div>
      <DataTable data={data} columns={columns} />
    </section>
  );
};
export default CalendarPage;
