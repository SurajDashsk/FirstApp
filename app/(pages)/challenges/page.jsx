'use client';
import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import defaultChallengeImage from '@/public/images/default-challenge.svg';
import Image from 'next/image';
import RouteGuard from '@/app/components/route-guard';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import addData from '@/app/firebase/addData';
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
      dailyCheckInRequirements: {
        gym: null,
        run: null,
        steps: null,
      },
      difficulty: null,
      duration: null,
      freeDays: null,
      id: null,
      photo: null,
      price: null,
      registrationDeadline: null,
      requirements: {
        gym: null,
        run: null,
        steps: null,
      },
      reward: {
        company: null,
        name: null,
        value: null,
        valueUnit: null,
      },
      title: null,
      totalPoints: null,
    },
  });

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
  
      // Ensure that freeDays, duration, and difficulty are integers
      const challengeData = {
        dailyCheckInRequirements: {
          gym: data.dailyCheckInRequirements?.gym ?? 0,
          run: data.dailyCheckInRequirements?.run ?? 0,
          steps: data.dailyCheckInRequirements?.steps ?? 0,
        },
        difficulty: data.difficulty ? parseInt(data.difficulty) : null, // Ensure difficulty is an integer
        duration: data.duration ? parseInt(data.duration) : null,       // Ensure duration is an integer
        freeDays: data.freeDays ? parseInt(data.freeDays) : null,       // Ensure freeDays is an integer
        id: crypto.randomUUID(), // Generate a unique ID for the challenge
        photo: data.photo ?? null, // Default URL if not provided
        price: data.price ?? null,
        registrationDeadline: data.registrationDeadline ? data.registrationDeadline : null, // Ensure it's in ISO format
        requirements: {
          gym: data.requirements?.gym ?? null,
          run: data.requirements?.run ?? null,
          steps: data.requirements?.steps ?? null,
        },
        reward: {
          company: data.reward?.company ?? null,
          name: data.reward?.name ?? null,
          value: data.reward?.value ?? null,
          valueUnit: data.reward?.valueUnit ?? null,
        },
        title: data.title ?? null,
        totalPoints: data.totalPoints ?? null,
      };
  
      // Add the challenge data to the database
      const { error } = await addData('Challenge', challengeData.id, challengeData);
  
      if (error) {
        toast.error('Failed to add challenge');
      } else {
        toast.success('Challenge Added');
        reset({
          dailyCheckInRequirements: {
            gym: null,
            run: null,
            steps: null,
          },
          difficulty: null,
          duration: null,
          freeDays: null,
          id: null,
          photo: null,
          price: null,
          registrationDeadline: null,
          requirements: {
            gym: null,
            run: null,
            steps: null,
          },
          reward: {
            company: null,
            name: null,
            value: null,
            valueUnit: null,
          },
          title: null,
          totalPoints: null,
        });
        getAllChallenges();
      }
      setIsLoading(false);
    } catch (e) {
      toast.error('Failed');
      setIsLoading(false);
      console.log('Error:', e);
    }
  };  

  return (
    <RouteGuard>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
        <ContainerBox className='h-[650px]'>
          <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

          {/*Upcoming challenge scrollable container*/}
          <div className='flex flex-col gap-4 mt-6 justify-start overflow-y-auto h-[225px]'>
            {upcomingChallenges &&
              upcomingChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                    <Image src={defaultChallengeImage} alt='challenge' />
                    <div className='flex flex-col'>
                      <p className='text-sm'>{challenge.title}</p>
                      <p className='text-xs text-gray'>{challenge.registrationDeadline.toDate().toLocaleDateString("en-US")}</p>
                    </div>
                  </div>
                  <Button
                    title='View'
                    className='w-[25%] h-7'
                    // Removed Stripe logic here
                  />
                </div>
              ))}
          </div>

          <h1 className='text-lg font-bold mt-5'>Previous Challenges</h1>

          {/*Previous challenge scrollable container*/}
          <div className='flex flex-col gap-4 mt-6 justify-start overflow-y-auto h-[225px]'>
            {previousChallenges &&
              previousChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                    <Image src={defaultChallengeImage} alt='challenge' />
                    <div className='flex flex-col'>
                      <p className='text-sm'>{challenge.title}</p>
                      <p className='text-xs text-gray'>{challenge.registrationDeadline.toDate().toLocaleDateString("en-US")}</p>
                    </div>
                  </div>
                  <Button
                    title='View'
                    className='w-[25%] h-7'
                    // Removed Stripe logic here
                  />
                </div>
              ))}
          </div>
        </ContainerBox>

        {/*Create New Challenge*/}
        <ContainerBox className='h-[650px]'>
          <h1 className='text-lg font-bold'>Create New Challenges</h1>

          <div className='flex flex-col gap-4 mt-6 justify-between'>
            <input
              id='title'
              {...register('title', { required: true })}
              placeholder='Challenge Name'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['title']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='text'
            />
            <input
              placeholder='Free Days/Rest Days'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['freeDays']
                  ? 'border-error_rose focus:outline-error_rose'
                  : 'border-light_gray focus:outline-gray'
              }`}
              type='number'
              id='freeDays'
              {...register('freeDays', { required: true })}
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

            <Controller
              control={control}
              name="registrationDeadline"
              render={({ field }) => (
                <div className="date-picker-wrapper"> {/* Add wrapper with relative positioning */}
                  <DatePicker
                    placeholderText="Select date"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}  // Update the field value when the date changes
                    dateFormat="MM/dd/yyyy"
                    className={`bg-light_gray px-4 py-2 rounded-lg border w-full ${
                      errors["registrationDeadline"]
                        ? "border-error_rose focus:outline-error_rose"
                        : "border-light_gray focus:outline-gray"
                    }`}
                    popperModifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10], // Adjust the vertical offset to bring it upwards
                        },
                      },
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "viewport", // Ensure the dropdown stays within the viewport
                        },
                      },
                      {
                        name: "flip",
                        options: {
                          enabled: true, // Allow the dropdown to flip if there isn't space
                        },
                      },
                    ]}
                    popperPlacement="top" // Ensure it pops above the input
                  />
                </div>
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
              <option value='0'>Easy</option>
              <option value='1'>Medium</option>
              <option value='2'>Hard</option>
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
