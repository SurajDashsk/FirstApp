'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Label,
} from 'recharts';

const LinearChart = ({ heading, data }) => {
  return (
    <div className='p-4'>
      <p className='font-bold'>{heading}</p>
      <AreaChart
        width={550}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' />
        <Tooltip />
        
        <Area
          type='monotone'
          dataKey='pv'
          stroke='#169E83'
          strokeWidth={2.5}
          fillOpacity={1}
          fill='url(#colorPv)'
        />
      </AreaChart>
    </div>
  );
};

export default LinearChart;