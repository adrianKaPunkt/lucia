'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

type ChartBoxProps = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox = (props: ChartBoxProps) => {
  return (
    <div className="flex h-full">
      <div className="flex flex-col basis-2/5 h-full justify-between">
        <div className="flex gap-4 items-center">
          <Image src={props.icon} alt="" width={20} height={20} />
          <span>{props.title}</span>
        </div>
        <p className="text-[30px] font-bold">{props.number}</p>
        <Link href={'/'} className="text-sm text-blue-500">
          View all
        </Link>
      </div>
      <div className="flex flex-col basis-3/5 justify-between w-full h-full">
        <div className="w-full h-24">
          <ResponsiveContainer width="99%" height="99%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 30, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col text-right">
          <span
            className={`font-bold text-[20px] ${
              props.percentage > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
            {props.percentage}%
          </span>
          <span className="text-sm">this month</span>
        </div>
      </div>
    </div>
  );
};
export default ChartBox;
