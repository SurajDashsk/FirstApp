import ContainerBox from '@/app/components/ContainerBox';
import LinearChart from '@/app/components/charts/LinearChart';
import Image from 'next/image';
import React from 'react';

import Button from '@/app/components/Button';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Badge01 from '@/public/images/badge01.svg';
import Badge02 from '@/public/images/badge02.svg';
import JuneVargasImage from '@/public/images/profile-images/June-Vargas.svg';
import DarleneRobertsonImage from '@/public/images/profile-images/Darlene-Robertson.svg';
import DarellStewardImage from '@/public/images/profile-images/Darell-Steward.svg';

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
      <ContainerBox>User Origin</ContainerBox>

      {/* Failiure Rate */}
      <ContainerBox>
        <h1 className='text-xl font-semibold'>Failiure Rate</h1>
        <LinearChart heading='Weekly' data={FailiureRateData} />
      </ContainerBox>

      {/* Influencer Request */}
      <ContainerBox>
        <h1 className='text-xl font-semibold'>Influencer Requests</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge'/>
              <div className='flex flex-col'>
                <p className='text-sm'>Influencer</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge' />
              <div className='flex flex-col'>
                <p className='text-sm'>Influencer</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>

          <div className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={defaultChallengeImage} alt='challenge'/>
              <div className='flex flex-col'>
                <p className='text-sm'>Influencer</p>
              </div>
            </div>
            <Button title='View' className='w-[25%] h-7' />
          </div>
        </div>

        <h1 className='text-xl font-semibold mt-5'>Influencers</h1>

        <div className='flex flex-col gap-4 mt-6 justify-center'>
          <div className='flex justify-between items-center bg-light_gray px-10 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={Badge01} alt='badge'/>
              <Image src={JuneVargasImage} alt='profile-image'/>
              <p>June Vegas</p>
            </div>
            <p>
              <span className='font-semibold'>120</span> Users
            </p>
          </div>

          <div className='flex justify-between items-center bg-light_gray px-10 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={Badge02} alt='badge'/>
              <Image src={DarleneRobertsonImage} alt='profile-image'/>
              <p>Darlene Robertson</p>
            </div>
            <p>
              <span className='font-semibold'>120</span> Users
            </p>
          </div>

          <div className='flex justify-between items-center bg-light_gray px-10 py-1 rounded-xl'>
            <div className='flex gap-6 justify-center items-center'>
              <Image src={Badge02} className='opacity-0' alt='badge'/>
              <Image src={DarellStewardImage} alt='profile-image'/>
              <p>Darell Steward</p>
            </div>
          </div>
        </div>
      </ContainerBox>

      {/* Retention */}
      <ContainerBox>
        <h1 className='text-xl font-semibold'>Retention</h1>
        <LinearChart heading='Weekly' data={FailiureRateData} />
      </ContainerBox>
    </div>
  );
};

export default Users;
