import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

const Home = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        <ContainerBox>
          <h1 className='text-lg font-semibold'>App Numbers</h1>

          <div className='flex justify-between py-10  '>
            <p>Total Users</p>
            <p>
              <span className='text-sm text-primary '>+14%</span> X Users
            </p>
          </div>
        </ContainerBox>

      <ContainerBox>
        <h1 className='text-lg font-semibold'>Upcoming Challenges</h1>

        <div className='flex justify-between py-10  '>
          <p>Total Users</p>
          <p>
            <span className='text-sm text-primary '>+14%</span> X Users
          </p>
        </div>  
      </ContainerBox>
      <ContainerBox>Hi</ContainerBox>
      <ContainerBox>Hi</ContainerBox>
    </div>
  );
};

export default Home;
