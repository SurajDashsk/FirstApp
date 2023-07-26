'use client';
import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';
import RouteGuard from '@/app/components/route-guard';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import addData from '@/app/firebase/addData';

const Home = () => {
  const [challengeName, setChallengeName] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [dayBuyIn, setDayBuyIn] = useState('');
  const [duration, setDuration] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [occurence, setOccurence] = useState('');
  const [startDate, setStartDate] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState();

  // submit button click
  const createChallenge = async () => {
    try {
      const data = {
        Challenge_ID: challengeName,
        Check_ins: checkIns,
        Daily_Buy_in: dayBuyIn,
        Duration: duration,
        Challenge_Type: challengeType,
        Occurence: occurence,
        Start_Day: startDate,
        Difficulty: difficulty,
      };
      console.log(data);
      setIsLoading(true);
      const { error } = await addData('Challenge', crypto.randomUUID(), data);

      if (error) {
        toast.error('Failed');
      } else {
        toast.success('Challenge Added');
        resetAllStates();
      }
      setIsLoading(false);
    } catch (e) {
      toast.error('Failed');
      setIsLoading(false);
      console.log('error is', e);
    }
  };

  const resetAllStates = () => {
    setChallengeName('');
    setCheckIns('');
    setDayBuyIn('');
    setDuration('');
    setChallengeType('');
    setOccurence('');
    setStartDate('');
    setDifficulty('');
  };

  return (
    <RouteGuard>
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
              onChange={(e) => setChallengeName(e.target.value)}
            />
            <input
              placeholder='Check-ins'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='name'
              required
              onChange={(e) => setCheckIns(e.target.value)}
            />
            <input
              placeholder='Day Buy-In'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='number'
              required
              onChange={(e) => setDayBuyIn(e.target.value)}
            />
            <input
              placeholder='Duration'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='number'
              required
              onChange={(e) => setDuration(e.target.value)}
            />
            <select
              id='tbd'
              className='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setChallengeType(e.target.value)}
            >
              <option defaultValue='Challenge Type'>Challenge Type</option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <select
              id='tbd'
              class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setOccurence(e.target.value)}
            >
              <option defaultValue='Occurence'>Occurence</option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <select
              id='tbd'
              class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setStartDate(e.target.value)}
            >
              <option defaultValue='Start Date'>Start Date</option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <select
              id='tbd'
              class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option defaultValue='Difficulty'>Difficulty</option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <Button
              title='Submit'
              className='w-[50%] self-center mt-16'
              disabled={isLoading}
              onClick={createChallenge}
            />
          </div>
        </ContainerBox>
      </div>
    </RouteGuard>
  );
};
export default Home;
