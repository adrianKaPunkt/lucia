'use client';

import Loader from '@/components/Loader';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserIdPageProps {
  params: {
    id: string;
  };
}

const UserIdPage = ({ params: { id } }: UserIdPageProps) => {
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      const user = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
          params: { id: userId },
        })
        .then((response) => {
          return response.data[0];
        });
      setData(user);
      setIsLoading(false);
    };
    fetchUser(id);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div></div>
      <h1>{`${data?.firstName} ${data?.lastName}`}</h1>
    </div>
  );
};
export default UserIdPage;
