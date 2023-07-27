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

import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { Controller, useForm } from 'react-hook-form';
import getUpcomingChallenges from '@/app/firebase/getUpcomingChallenges';
import getPreviousChallenges from '@/app/firebase/getPreviousChallenges';

const Home = () => {
  const [isLoading, setIsLoading] = useState();
  const [previousChallenges, setPreviousChallenges] = useState([]);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Challenge_ID: '',
      dayBuyIn: '',
      checkIns: '',
      duration: '',
      challengeType: '',
      occurence: '',
      difficulty: '',
      startDate: new Date(),
    },
  });

  // const splitChallenges = (challenges) => {
  //   let previousChallenges = [];
  //   let upcomingChallenges = [];
  //   let currentDate = moment().format('MM/DD/YYYY');

  //   challenges.forEach((challenge) => {
  //     if (moment(challenge.Start_Date) > moment(currentDate)) {
  //       upcomingChallenges.push(challenge);
  //     } else {
  //       previousChallenges.push(challenge);
  //     }
  //   });

  //   setUpcomingChallenges(upcomingChallenges);
  //   setPreviousChallenges(previousChallenges);
  // };

  const getAllChallenges = async () => {
    const { upcomingChallenges } = await getUpcomingChallenges();
    setUpcomingChallenges(upcomingChallenges);
    const { previousChallenges } = await getPreviousChallenges();
    setPreviousChallenges(previousChallenges);
  };

  useEffect(() => {
    getAllChallenges();
  }, []);

  const createChallenge = async (data) => {
    try {
      setIsLoading(true);
      const { error } = await addData('Challenge', crypto.randomUUID(), data);

      if (error) {
        toast.error('Failed');
      } else {
        toast.success('Challenge Added');
        reset({
          Challenge_ID: '',
          dayBuyIn: '',
          checkIns: '',
          duration: '',
          challengeType: '',
          occurence: '',
          difficulty: '',
        });
        getAllChallenges();
      }
      setIsLoading(false);
    } catch (e) {
      toast.error('Failed');
      setIsLoading(false);
      console.log('error is', e);
    }
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
              id='Challenge_ID'
              {...register('Challenge_ID', { required: true })}
              placeholder='Challenge Name'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['Challenge_ID']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='name'
            />
            <input
              placeholder='Check-ins'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['checkIns']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='name'
              id='checkIns'
              {...register('checkIns', { required: true })}
            />
            <input
              placeholder='Day Buy-In'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['dayBuyIn']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='number'
              id='dayBuyIn'
              {...register('dayBuyIn', { required: true })}
            />
            <input
              placeholder='Duration'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['duration']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='number'
              id='duration'
              {...register('duration', { required: true })}
            />
            <select
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['challengeType']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              id='challengeType'
              {...register('challengeType', { required: true })}
            >
              <option value='' disabled selected>
                Select your Challenge
              </option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <select
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['occurence']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              id='occurence'
              {...register('occurence', { required: true })}
            >
              <option value='' disabled selected>
                Select Occurence
              </option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <Controller
              control={control}
              name='startDate'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select date'
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat='dd/MM/yyyy'
                  className={`bg-light_gray px-4 py-2 rounded-lg border w-full ${
                    errors['occurence']
                      ? 'border-error_rose focus:outline-error_rose'
                      : 'border-light_gray focus:outline-gray'
                  }`}
                />
              )}
            />
            <select
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['difficulty']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              id='difficulty'
              {...register('difficulty', { required: true })}
            >
              <option value='' disabled selected>
                Select Difficulty
              </option>
              <option value='US'>Other 1</option>
              <option value='CA'>Other 2</option>
              <option value='FR'>Other 3</option>
              <option value='DE'>Other 4</option>
            </select>
            <Button
              title='Submit'
              className='w-[50%] self-center mt-16'
              disabled={isLoading}
              onClick={handleSubmit(createChallenge)}
            />
          </div>
        </ContainerBox>
      </div>
    </RouteGuard>
  );
};
export default Home;
