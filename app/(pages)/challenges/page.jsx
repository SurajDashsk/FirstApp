import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
      {/*Upcoming challenge*/}
      <ContainerBox className='h-[640px]'>
        <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>
        </div>

        <h1 className='text-lg font-bold mt-5'>Previous Challenges</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Challenge</p>
                <p className='text-xs text-gray'>15 Members</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>
        </div>
      </ContainerBox>

      {/*Create New Challenge*/}
      <ContainerBox className='h-[640px]'>
        <h1 className='text-lg font-bold'>Create New Challenges</h1>

        <div className='flex flex-col gap-4 mt-6 justify-between'>
          <input
            placeholder='Challenge Name'
            className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
            type='name'
            required
          />
          <input
            placeholder='Check-ins'
            className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
            type='name'
            required
          />
          <input
            placeholder='Day Buy-In'
            className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
            type='number'
            required
          />
          <input
            placeholder='Duration'
            className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
            type='number'
            required
          />
          <select
            id='tbd'
            className='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option defaultValue="Challenge Type" >Challenge Type</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option defaultValue="Occurence">Occurence</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option defaultValue="Start Date" >Start Date</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option defaultValue="Difficulty" >Difficulty</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <Button title='Submit' className='w-[50%] self-center mt-16'/>
        </div>
      </ContainerBox>
    </div>
  );
};

export default Home;
