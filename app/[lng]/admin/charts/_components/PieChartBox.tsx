'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Mobile', value: 400, color: '#0088FE' },
  { name: 'Desktop', value: 300, color: '#00C49F' },
  { name: 'Laptop', value: 300, color: '#FFBB28' },
  { name: 'Tablet', value: 200, color: '#FF8042' },
];

const PieChartBox = () => {
  return (
    <div>
      <p className="text-[20px]">Leads by Source</p>
      <div className="flex flex-col justify-between">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: 'white', borderRadius: '5px' }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey="value">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-3 text-[14px]">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-3 items-center">
            <div className="flex gap-3 items-center">
              <div
                style={{ backgroundColor: item.color }}
                className="w-3 h-3 rounded-full">
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PieChartBox;
