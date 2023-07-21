'use client';

import React from 'react';
import {
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  BarChart,
} from 'recharts';

const MyBarChart = ({
  barSize,
  data,
  height = 250,
  headingRight,
  headingLeft,
  span
}) => {
  return (
    <div className='flex flex-col w-full'>
      {headingLeft && headingRight && (
        <div className='flex justify-around items-center'>
          <p className='font-bold text-2xl'>
            {headingLeft}{' '}
            <span className='text-sm font-light text-gray'>{span}</span>
          </p>
          <p className='italic text-gray'>{headingRight}</p>
        </div>
      )}
      <ResponsiveContainer height={height}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={barSize}
        >
          <XAxis dataKey='name' axisLine={false} tickLine={false} />
          <YAxis dataKey='uv' axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey='pv' fill='#8884d8' /> */}
          <Bar dataKey='uv' fill='#34DEDE' radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
