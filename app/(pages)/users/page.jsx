import ContainerBox from '@/app/components/ContainerBox';
import LinearChart from '@/app/components/charts/LinearChart';
import React from 'react';

const FailiureRateData = [
  {
    name: '3/1',
    pv: 13,
    amt: 100,
  },
  {
    name: '3/7',
    pv: 14,
    amt: 90,
  },
  {
    name: '3/14',
    pv: 12,
    amt: 80,
  },
  {
    name: '3/21',
    pv: 26,
    amt: 70,
  },
  {
    name: '3/28',
    pv: 21,
    amt: 60,
  },
  {
    name: '4/4',
    pv: 25,
    amt: 50,
  },
  {
    name: '4/11',
    pv: 15,
    amt: 40,
  },
];

const Users = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
      {/* User Origin */}
      <ContainerBox className='h-[50%]'>User Origin</ContainerBox>

      {/* Failiure Rate */}
      <ContainerBox>
        <h1 className='text-xl font-semibold'>Failiure Rate</h1>
        <LinearChart heading='Weekly' data={FailiureRateData} />
      </ContainerBox>

      {/* Influencer Request */}
      <ContainerBox className="">Influencer Request</ContainerBox>

      {/* Retention */}
      <ContainerBox>
        <h1 className='text-xl font-semibold'>Retention</h1>
        <LinearChart heading='Weekly' data={FailiureRateData} />
      </ContainerBox>
    </div>
  );
};

export default Users;
