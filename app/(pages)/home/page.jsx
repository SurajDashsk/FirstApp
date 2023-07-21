import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
      {/* App Numbers */}
      <ContainerBox className='h-[320px]'>
        <h1 className='text-lg font-bold'>App Numbers</h1>

        <div className='flex flex-col gap-4 mt-6'>
          <div className='flex justify-between'>
            <p>Total Users</p>

            <p className='text-gray'>
              <span className='text-sm text-forest_green'>+14%</span> X Users
            </p>
          </div>
          <div className='flex justify-between'>
            <p>User Retention</p>

            <p className='text-gray'>X %</p>
          </div>
          <div className='flex justify-between'>
            <p>
              Failure Rate <small className='text-xs'>All-Time</small>{' '}
            </p>
            <p className='text-gray'>X %</p>
          </div>
          <div className='flex justify-between'>
            <p>Revenue/User</p>
            <p className='text-gray'>$ X</p>
          </div>
        </div>
      </ContainerBox>

      {/* Upcoming Challenges */}
      <ContainerBox className='h-[320px]'>
        <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

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
            <Button title='View' className='w-32 h-7' />
          </div>

          <div className='self-center'>
            <Button title='See All' className='w-64 h-9' />
          </div>
        </div>
      </ContainerBox>

      {/* Profile */}
      <ContainerBox className='h-[320px]'>
        <h1 className='text-lg font-bold'>Profile</h1>

        <div className='flex flex-col gap-4 mt-6'>
          <div className='flex justify-between'>
            <p>Name</p>

            <p className='text-gray'>Jorge Ramos Putz</p>
          </div>
          <div className='flex justify-between'>
            <p>Access</p>

            <p className='text-gray'>Admin</p>
          </div>
          <div className='flex justify-between'>
            <p>Email</p>

            <p className='text-gray'>jorge@peerpressur.com</p>
          </div>
        </div>
      </ContainerBox>

      {/* Invite */}
      <ContainerBox className='h-[320px]'>
        <h1 className='text-lg font-bold'>Invite</h1>

        <div className='flex flex-col gap-4 mt-6'>
          <input
            placeholder='Email'
            className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
            type='email'
            required
          />
          <select
            id='tbd'
            className='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option selected>Access</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <Button title='Send Invite' className='w-[50%] self-center' />
        </div>
      </ContainerBox>
    </div>
  );
};

export default Home;
