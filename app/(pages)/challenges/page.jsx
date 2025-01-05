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
import { Controller, useForm, watch } from 'react-hook-form';
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
    setValue,
    formState: { errors },
    watch
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
      price: 1,
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

  useEffect(() => {
    const duration = watch('duration',7);  // Now correctly using watch() as a function
    if (duration) {
      const calculatedPrice = Math.max(Math.floor(duration / 6), 1);  // Ensure price is not less than 1
      setValue('price', calculatedPrice);  // Set price value programmatically
    }
  }, [watch('duration'), setValue]);  // Recalculate whenever duration changes
  
  
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
        difficulty: data.difficulty ? parseInt(data.difficulty) : 0,
        duration: data.duration ? parseInt(data.duration) : 7,
        freeDays: data.freeDays ? parseInt(data.freeDays) : 2,
        id: crypto.randomUUID(),
        photo: data.photo ?? null,
        price: data.price ? parseInt(data.price) : 1,
        registrationDeadline: data.registrationDeadline ? data.registrationDeadline : null,
        requirements: {
          gym: data.requirements?.gym ? parseInt(data.requirements?.gym) : 30,
          run: data.requirements?.run ? parseInt(data.requirements?.run) : 2,
          steps: data.requirements?.steps ? parseInt(data.requirements?.steps) : 1000,
        },
        reward: {
          company: data.reward?.company ?? null,
          name: data.reward?.name ?? null,
          value: data.reward?.value ? parseInt(data.reward?.value) : null,
          valueUnit: data.reward?.valueUnit ?? null,
        },
        title: data.title ?? null,
        totalPoints: data.totalPoints ?? 110,
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
        <ContainerBox className='h-[700px]'>
          <h1 className='text-lg font-bold'>Upcoming Challenges</h1>

          <div className='flex flex-col gap-4 mt-6 justify-start overflow-y-auto h-[250px]'>
            {upcomingChallenges &&
              upcomingChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                          <Image
                                            src={challenge.photo ? challenge.photo : defaultChallengeImage}
                                            alt="challenge"
                                            layout="fill"         // This will make the image fill the parent container
                                            objectFit="cover"     // Ensures the image covers the circle area
                                          />
                                        </div>
                    <div className='flex flex-col'>
                      <p className='text-sm font-semibold text-primary'>{challenge.title}</p>
                      <p className='text-xs'>Registration Deadline: {challenge.registrationDeadline.toDate().toLocaleDateString("en-US")}</p>
                    </div>
                  </div>
                  <Button
                    title='Active'
                    className='w-[25%] h-7'
                  />
                </div>
              ))}
          </div>

          <h1 className='text-lg font-bold mt-5'>Previous Challenges</h1>

          <div className='flex flex-col gap-4 mt-6 justify-start overflow-y-auto h-[250px]'>
            {previousChallenges &&
              previousChallenges.map((challenge) => (
                <div
                  className='flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl'
                  key={challenge.id}
                >
                  <div className='flex gap-6 justify-center items-center'>
                                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                          <Image
                                            src={challenge.photo ? challenge.photo : defaultChallengeImage}
                                            alt="challenge"
                                            layout="fill"         // This will make the image fill the parent container
                                            objectFit="cover"     // Ensures the image covers the circle area
                                          />
                                        </div>
                    <div className='flex flex-col'>
                      <p className='text-sm font-semibold text-primary'>{challenge.title}</p>
                      <p className='text-xs'>Registration Deadline: {challenge.registrationDeadline.toDate().toLocaleDateString("en-US")}</p>
                    </div>
                  </div>
                  <Button
                    title='Finished'
                    className='w-[25%] h-7'
                  />
                </div>
              ))}
          </div>
        </ContainerBox>

        <ContainerBox className='h-[700px]'>
          <h1 className='text-lg font-bold'>Create a New Challenge</h1>

          <div className='flex flex-col gap-3 mt-1 justify-between'>
            <h1 className='text-m'>Challenge Info</h1>
            <input
              id='title'
              {...register('title', { required: true })}
              placeholder='Challenge Name'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['title'] ? 'border-error_rose focus:outline-error_rose' : 'border-light_gray focus:outline-gray'
              }`}
              type='text'
            />

            {/* Free Days */}
            <input
              placeholder='Free Days/Rest Days'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['freeDays'] ? 'border-error_rose focus:outline-error_rose' : 'border-light_gray focus:outline-gray'
              }`}
              type='number'
              id='freeDays'
              {...register('freeDays', { required: true })}
            />

            {/* Duration */}
            <input
              placeholder='Duration (in Days)'
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['duration'] ? 'border-error_rose focus:outline-error_rose' : 'border-light_gray focus:outline-gray'
              }`}
              type='number'
              id='duration'
              {...register('duration', { required: true })}
            />

            {/* Difficulty */}
            <select
              className={`bg-light_gray px-4 py-2 rounded-lg border ${
                errors['difficulty'] ? 'border-error_rose focus:outline-error_rose' : 'border-light_gray focus:outline-gray'
              }`}
              id='difficulty'
              {...register('difficulty', { required: true })}
            >
              <option value='' disabled>
                Select Difficulty
              </option>
              <option value='0'>Easy</option>
              <option value='1'>Medium</option>
              <option value='2'>Hard</option>
            </select>

            {/* Registration Deadline */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Check-In Requirements */}
                    <div className="flex flex-col gap-4">
                      <h2>Check-In Requirements</h2>
                      <input
                        placeholder="Gym (min per day)"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["requirements.gym"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="number"
                        {...register("requirements.gym")}
                      />
                      <input
                        placeholder="Run (miles per day)"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["requirements.run"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="number"
                        {...register("requirements.run")}
                      />
                      <input
                        placeholder="Steps (per day)"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["requirements.steps"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="number"
                        {...register("requirements.steps")}
                      />
                    </div>

                    {/* Reward Info */}
                    <div className="flex flex-col gap-4">
                      <h2>Reward Info</h2>
                      <input
                        placeholder="Reward Company"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["reward.company"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="text"
                        {...register("reward.company")}
                      />
                      <input
                        placeholder="Reward Name"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["reward.name"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="text"
                        {...register("reward.name")}
                      />
                      <input
                        placeholder="Reward Value"
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["reward.value"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        type="number"
                        {...register("reward.value")}
                      />
                      <select
                        className={`bg-light_gray px-4 py-2 rounded-lg border ${
                          errors["reward.valueUnit"] ? "border-error_rose focus:outline-error_rose" : "border-light_gray focus:outline-gray"
                        }`}
                        id="rewardValueUnit"
                        {...register("reward.valueUnit", { required: true })}
                      >
                        <option value="" disabled>
                          Select Reward Unit
                        </option>
                        <option value="percent">%</option>
                        <option value="dollar">$</option>
                      </select>
                    </div>
                  </div>
            {/* Submit Button */}
            <Button
              title='Submit'
              className='w-[50%] self-center mt-3'
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
