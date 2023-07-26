'use client';
import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';
import RouteGuard from '@/app/components/route-guard';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import addData from '@/app/firebase/addData';
import fetchDataFireStore from '@/app/firebase/getData';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import moment from 'moment';

const Home = () => {
  const [challengeName, setChallengeName] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [dayBuyIn, setDayBuyIn] = useState('');
  const [duration, setDuration] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [occurence, setOccurence] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [previousChallenges, setPreviousChallenges] = useState([]);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  const splitChallenges = (challenges) => {
    let previousChallenges = [];
    let upcomingChallenges = [];
    let currentDate = moment().format('MM/DD/YYYY');

    challenges.forEach((challenge) => {
      if (moment(challenge.Start_Date) > moment(currentDate)) {
        upcomingChallenges.push(challenge);
      } else {
        previousChallenges.push(challenge);
      }
    });

    setUpcomingChallenges(upcomingChallenges);
    setPreviousChallenges(previousChallenges);
  };

  const getAllChallenges = async () => {
    const { newDocs } = await fetchDataFireStore('Challenge');
    if (newDocs.length) {
      splitChallenges(newDocs);
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

  useEffect(() => {
    getAllChallenges();
  }, []);

  const createChallenge = async () => {
    try {
      const data = {
        Challenge_ID: challengeName,
        Check_ins: checkIns,
        Daily_Buy_in: dayBuyIn,
        Duration: duration,
        Challenge_Type: challengeType,
        Occurence: occurence,
        Start_Date: moment(startDate).format('MM/DD/YYYY'),
        Difficulty: difficulty,
      };
      setIsLoading(true);
      const { error } = await addData('Challenge', crypto.randomUUID(), data);

      if (error) {
        toast.error('Failed');
      } else {
        toast.success('Challenge Added');
        resetAllStates();
        getAllChallenges();
      }
      setIsLoading(false);
    } catch (e) {
      toast.error('Failed');
      setIsLoading(false);
      console.log('error is', e);
    }
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
  };

  return (
    <RouteGuard>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        <ContainerBox className='h-[940px]'>
          <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

          {/*Upcoming challenge*/}
          <div className='flex flex-col gap-4 mt-6 justify-center'>
            {upcomingChallenges &&
              upcomingChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                    <Image src={defaultChallengeImage} alt='challenge' />
                    <div className='flex flex-col'>
                      <p className='text-sm'>{challenge.Challenge_ID}</p>
                      <p className='text-xs text-gray'>15 Members</p>
                    </div>
                  </div>
                  <Button title='View' className='w-[25%] h-7' />
                </div>
              ))}
          </div>

          <h1 className='text-lg font-bold mt-5'>Previous Challenges</h1>

          {/*Previous challenge*/}
          <div className='flex flex-col gap-4 mt-6 justify-center'>
            {previousChallenges &&
              previousChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                    <Image src={defaultChallengeImage} alt='challenge' />
                    <div className='flex flex-col'>
                      <p className='text-sm'>{challenge.Challenge_ID}</p>
                      <p className='text-xs text-gray'>15 Members</p>
                    </div>
                  </div>
                  <Button title='View' className='w-[25%] h-7' />
                </div>
              ))}
          </div>
        </ContainerBox>

        {/*Create New Challenge*/}
        <ContainerBox className='h-[940px]'>
          <h1 className='text-lg font-bold'>Create New Challenges</h1>

          <div className='flex flex-col gap-4 mt-6 justify-between'>
            <input
              placeholder='Challenge Name'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='name'
              required
              onChange={(e) => setChallengeName(e.target.value)}
              value={challengeName}
            />
            <input
              placeholder='Check-ins'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='name'
              required
              onChange={(e) => setCheckIns(e.target.value)}
              value={checkIns}
            />
            <input
              placeholder='Day Buy-In'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='number'
              required
              onChange={(e) => setDayBuyIn(e.target.value)}
              value={dayBuyIn}
            />
            <input
              placeholder='Duration'
              className='bg-light_gray px-4 py-2 rounded-lg focus:outline-gray'
              type='number'
              required
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
            <select
              id='tbd'
              className='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setChallengeType(e.target.value)}
              value={challengeType}
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
              value={occurence}
            >
              <option defaultValue='Occurence'>Occurence</option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <Calendar date={startDate} onChange={handleDateSelect} />
            <select
              id='tbd'
              class='bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2'
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
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
