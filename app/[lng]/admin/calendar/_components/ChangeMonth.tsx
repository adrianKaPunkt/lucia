import { Input } from '@/components/ui/input';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

interface ChangeMonthProps {
  changeData: (mon: string, yea: string) => void;
  m: string;
  y: string;
}

const ChangeMonth = ({ changeData, m, y }: ChangeMonthProps) => {
  const [year, setYear] = useState(y);
  const [month, setMonth] = useState(m);
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
  return (
    <div>
      <div className="flex justify-center">
        <h1>{dayjs(`${year}-${month}-01`).format('MMMM')}</h1>
      </div>
      <div className="flex items-center">
        <FaChevronLeft
          onClick={() => {
            changeMonth(-1);
            changeData((Number(month) - 1).toString(), year);
          }}
          className="cursor-pointer mr-3"
        />
        <Input
          type="text"
          className="w-12 text-right bg-transparent mr-3"
          value={dayjs(`${year}-${month}-01`).format('MM')}
          onChange={(e) => setMonth(e.target.value)}
        />
        <p> - </p>
        <Input
          type="text"
          className="w-16 text-left bg-transparent ml-3"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <FaChevronRight
          onClick={() => {
            changeMonth(1);
            changeData((Number(month) + 1).toString(), year);
          }}
          className="cursor-pointer ml-3"
        />
      </div>
    </div>
  );
};
export default ChangeMonth;
