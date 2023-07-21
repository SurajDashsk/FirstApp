import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React from 'react';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';


const Home = () => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        {/*Upcoming challenge*/}
        <ContainerBox className= 'h-[640px]'>
        <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>

          </div>
          

          <h1 className='text-lg font-bold'>Previous Challenges</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          <div className='flex justify-between items-center bg-light_gray px-7 py-1 rounded-xl'>
          <Image src={defaultChallengeImage} />
          <p>Challenge</p>
          <Button title='View' className='w-[25%]' />            
          </div>
          </div>
        </ContainerBox>

        {/*Create New Challenge*/}
        <ContainerBox className= 'h-[640px]'>
        <h1 className='text-lg font-bold'>Create New Challenges</h1>

        <div className='flex flex-col gap-4 mt-6'>
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
            class='bg-light_gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option selected>Challenge Type</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option selected>Occurence</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option selected>Start Date</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <select
            id='tbd'
            class='bg-light_gray rounded-lg focus:outline-gray px-4 py-2'
          >
            <option selected>Difficulty</option>
            <option value='US'>Other 1</option>
            <option value='CA'>Other 2</option>
            <option value='FR'>Other 3</option>
            <option value='DE'>Other 4</option>
          </select>
          <Button title='Submit' className='w-[50%] self-center' />
        </div>

        </ContainerBox>

        </div>
  );
};

export default Home;
    







      