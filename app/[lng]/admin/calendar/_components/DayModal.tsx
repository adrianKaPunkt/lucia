'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
dayjs.extend(weekOfYear);
dayjs.extend(isToday);
dayjs.extend(relativeTime);

interface DayModalProps {
  showModal: () => void;
  user: any;
  date: string;
}

const DayModal = ({ showModal, user, date }: DayModalProps) => {
  const [day, setDay] = useState(dayjs(date).format('DD'));
  const [month, setMonth] = useState(dayjs(date).format('MMMM'));
  const [year, setYear] = useState(dayjs(date).format('YYYY'));
  const [weekday, setWeekday] = useState(dayjs(date).format('dddd'));

  const getDateDifference = () => {
    const today = dayjs(new Date());
    const date = dayjs(`${year}-${month}-${day}`);

    if (dayjs(date).isToday()) {
      return 'now';
    } else {
      return dayjs(date).from(today);
    }
  };

  return (
    <Dialog open={true} onOpenChange={showModal}>
      <DialogContent className="flex w-full max-w-[920px] flex-col gap-6 border-none bg-gray-600 px-6 py-6 text-white">
        <div className="flex justify-between mt-4 text-sm">
          <div className="text-left">
            <p>{user.firstName + ' ' + user.lastName}</p>
          </div>
          <div className="text-right">
            <p>{getDateDifference()}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl pb-4">Calendar Week - {dayjs(date).week()}</p>
          <p className="text-4xl">{`${weekday}, ${day}. ${month} ${year}`}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DayModal;
