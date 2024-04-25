'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';

type BarChartBoxProps = {
  title: string;
  dataKey: string;
  color: string;
  chartData: object[];
};

const BarChartBox = (props: BarChartBoxProps) => {
  return (
    <div className="w-full h-full">
      <p className="text-[20px] mb-5">{props.title}</p>
      <div className="w-full h-40">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BarChartBox;
