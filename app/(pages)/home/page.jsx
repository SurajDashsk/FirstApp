import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

const Home = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        <ContainerBox>
          <h1 className='text-lg font-bold'>App Numbers</h1>

          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Total Users</big></p>
            <p>
              <span className='text-sm text-primary '>+14%</span> X Users
            </p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>User Retention</big></p>
            <p>X %</p>
          </div>
          <div className='flex justify-between py-6' >
            <p className='font-semibold'><big>Filure Rate </big><small>All-Time</small></p>
            <p>X %</p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Revenue/User</big></p>
            <p>$ X</p>
          </div>
        </ContainerBox>

      <ContainerBox>
        <h1 className='text-lg font-bold'>Upcoming Challenges</h1>
        <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Challenge</big></p>
           <p>View</p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Challenge</big></p>
            <p>View</p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Challenge</big></p>
            <p>View</p>
          </div>
          <div>
           <button style={{width: 500,height: 60,flexshrink: 0}}>See All</button>
          </div>
      </ContainerBox>
      <ContainerBox>
      <h1 className='text-lg font-bold'>Profile</h1>
      <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Name</big></p>
            <p>Jorge Ramos Putz</p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Access</big></p>
            <p>Admin</p>
          </div>
          <div className='flex justify-between py-6'>
            <p className='font-semibold'><big>Email</big></p>
            <p>jorge@peerpressur.com</p>
          </div>
      </ContainerBox>
      <ContainerBox>
      <h1 className='text-lg font-bold'>Invite</h1>
      <div className='flex justify-between py-6'>
            <p>Email</p>
        </div>
        <div className='flex justify-between py-6'>
            <p>Access</p>
           </div>
           <div>
           <button style={{width: 500,height: 60,flexshrink: 0}}>Send Invite</button>

           </div>
      </ContainerBox>
    </div>
  );
};

export default Home;
