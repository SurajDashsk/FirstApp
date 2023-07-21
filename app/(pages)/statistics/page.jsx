import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';
import MyBarChart from '@/app/components/charts/MyBarChart';
import LinearChart from '@/app/components/charts/LinearChart';

const StatisticsData = [
  {
    name: 'Onboarding',
    uv: 6,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Login',
    uv: 5,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Profile',
    uv: 3,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Social',
    uv: 7,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Home',
    uv: 8,
    pv: 4800,
    amt: 2181,
  },
];

const usageData = [
  {
    name: 'Sun',
    uv: 6,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Mon',
    uv: 5,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Tue',
    uv: 3,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Wed',
    uv: 7,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Thu',
    uv: 8,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Fri',
    uv: 4,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    uv: 4,
    pv: 4800,
    amt: 2181,
  },
];

const UserPerAverageData = [
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

const Statistics = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 h-full'>
      {/* Page Statistics */}
      <ContainerBox className='h-[320px] col-span-2'>
        <h1 className='text-lg font-bold mb-4'>Page Statistics</h1>

        <MyBarChart data={StatisticsData} barSize={25} />
      </ContainerBox>

      {/* Usage */}
      <ContainerBox className='h-[350px]'>
        <h1 className='text-lg font-bold'>Usage</h1>

        <MyBarChart
          data={usageData}
          barSize={15}
          headingLeft={15}
          headingRight='Time in App'
          span='min'
        />
      </ContainerBox>

      {/* Target Customer */}
      <ContainerBox className='h-[350px]'>
        <h1 className='text-lg font-bold'>Target Customer</h1>

        <div className='flex flex-col gap-4 mt-6'></div>
      </ContainerBox>

      {/* User Challenges */}
      <ContainerBox className='h-[350px]'>
        <h1 className='text-lg font-bold'>User Challenges</h1>

        <LinearChart
          heading='Per User Average'
          data={UserPerAverageData}
          height={250}
        />
      </ContainerBox>

      {/* Challenges Performance*/}
      <ContainerBox className='h-[350px]'>
        <h1 className='text-lg font-bold'>Challenges Performance</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
              </div>
            </div>
            <Button title='View' className='w-32 h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-32 h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>
        </div>
      </ContainerBox>

      {/* User Trajectory */}
      <ContainerBox className='h-[350px] col-span-2'>
        <h1 className='text-lg font-bold'>User Trajectory</h1>

        <div className='flex mt-4'>
          <MyBarChart
            data={usageData}
            barSize={7}
            headingLeft='8:02'
            headingRight='Challenge Log Time'
            span='AM'
          />
          <MyBarChart
            data={usageData}
            barSize={7}
            headingLeft={15}
            headingRight='Time in App'
            span='min'
          />
          <LinearChart data={UserPerAverageData} height={200} width={400} />
        </div>
      </ContainerBox>
    </div>
  );
};

export default Statistics;
