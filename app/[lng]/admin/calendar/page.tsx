'use client';

import { useEffect, useState } from 'react';
import DataTable from './_components/DataTable';
import { initialSort } from './_components/sorting';
import Loader from '@/components/Loader';

const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 10000);
  }, []);

  if (isLoading) {
    return (
      <div className="z-50 w-full">
        <Loader />
      </div>
    );
  }

  return (
    <section>
      <h1>Calendar</h1>

      {/* <DataTable /> */}
    </section>
  );
};
export default CalendarPage;
