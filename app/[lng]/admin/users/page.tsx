'use client';

import Loader from '@/components/Loader';
import DataTable from '@/components/data-table/DataTable';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { columns } from './_components/columns';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const users = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/`)
        .then((response) => {
          return response.data;
        });
      setData(users);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="mx-auto">
      <DataTable columns={columns} data={data} />
    </section>
  );
};
export default UsersPage;
