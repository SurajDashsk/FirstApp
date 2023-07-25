import ContainerBox from '@/app/components/ContainerBox';
import LinearChart from '@/app/components/charts/LinearChart';
import RouteGuard from '@/app/components/route-guard';
import React from 'react';

const RevenueUserData = [
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

const Finances = () => {
  return (
    <RouteGuard>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        {/*Revenue/User*/}
        <ContainerBox>
          <h1 className='text-xl font-semibold'>Revenue/User</h1>
          <LinearChart heading='Weekly' data={RevenueUserData} />
        </ContainerBox>

        {/*Cash Breakdown*/}
        <ContainerBox className='h-[380px]'>
          <h1 className='text-xl font-semibold'>Cash Breakdown</h1>
          <div className='flex flex-col gap-4 mt-6'>
            <div className='flex justify-between'>
              <p>Total Cash</p>
              <p className='text-gray'>$ X</p>
            </div>
            <div className='flex justify-between'>
              <p>Current Port</p>
              <p className='text-gray'>$ X</p>
            </div>
            <div className='flex justify-between'>
              <p>Money Held</p>
              <p className='text-gray'>$ X</p>
            </div>
            <div className='flex justify-between'>
              <p>Revenue</p>
              <p className='text-gray'>$ X</p>
            </div>
          </div>
        </ContainerBox>
      </div>
    </RouteGuard>
  );
};

export default Finances;
