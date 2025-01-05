'use client';

import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultChallengeImage from '@/public/images/default-challenge.svg';
import getChallengesGroupedByMapId from '@/app/firebase/getPopularChallenges';
import getActiveUserChallengeCount from '@/app/firebase/getActiveUserChallengeCount';
import getAppNumbers from '@/app/firebase/getAppNumbers';
import { useRouter } from 'next/navigation';

const Statistics = () => {
  const router = useRouter();
  const [groupedChallenges, setGroupedChallenges] = useState([]);
  const [challengesError, setChallengesError] = useState(false);

  // States to hold the app numbers
  const [totalUsers, setTotalUsers] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [activeUserChallengeCount, setActiveChallengesCount] = useState(0);

  // Fetch grouped challenges
  const fetchGroupedChallenges = async () => {
    try {
      const result = await getChallengesGroupedByMapId(); // Call the function to get grouped challenges
      if (result && result.length > 0) {
        setGroupedChallenges(result); // Set grouped challenges in state if result is valid
      } else {
        setGroupedChallenges([]); // Set empty array if no challenges
      }
    } catch (error) {
      console.error('Error fetching grouped challenges:', error);
      setChallengesError(true); // Set error state if something goes wrong
      setGroupedChallenges([]); // Ensure we set an empty array in case of error
    }
  };

  const fetchActiveChallengesCount = async () => {
    try {
      const { result, error } = await getActiveUserChallengeCount();
      if (error) {
        console.error('Error fetching active user challenge count:', error);
        setActiveChallengesCount(0); // Set count to 0 if there's an error
      } else {
        setActiveChallengesCount(result); // Set result to 0 if result is null or undefined
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setActiveChallengesCount(0); // Ensure count is set to 0 on unexpected error
    }
  };

  // Fetch app numbers from the external function
  const fetchAppNumbers = async () => {
    const appNumbers = await getAppNumbers();
    if (appNumbers) {
      setTotalUsers(appNumbers.totalUsers);
      setSubscriptions(appNumbers.subscriptions);
      setAverageAge(appNumbers.averageAge);
    }
  };

  useEffect(() => {
    fetchGroupedChallenges();
    fetchAppNumbers();
    fetchActiveChallengesCount();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* App Numbers and Invite */}
      <div className="md:col-span-1 flex flex-col gap-6">
        {/* App Numbers */}
        <ContainerBox className="h-[320px]">
          <h1 className="text-lg font-bold">App Numbers</h1>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex justify-between">
              <p>Total Users</p>
              <p className="text-primary font-extrabold">{totalUsers}</p>
            </div>
            <div className="flex justify-between">
              <p>Subscriptions</p>
              <p className="text-primary font-extrabold">{subscriptions}</p>
            </div>
            <div className="flex justify-between">
              <p>Active Users</p>
              <p className="text-primary font-extrabold">{activeUserChallengeCount}</p>
            </div>
          </div>
        </ContainerBox>

        {/* Invite */}
        <ContainerBox className="h-[320px]">
          <h1 className="text-lg font-bold">Invite</h1>
          <div className="flex flex-col gap-4 mt-6">
            <input
              placeholder="Email"
              className="bg-light_gray px-4 py-2 rounded-lg focus:outline-gray"
              type="email"
              required
            />
            <input
              placeholder="Company"
              className="bg-light_gray px-4 py-2 rounded-lg focus:outline-gray"
              type="text"
              required
            />
            <select
              id="tbd"
              className="bg-light_gray text-gray rounded-lg focus:outline-gray px-4 py-2"
            >
              <option defaultValue="Access">Access</option>
              <option value="US">Other 1</option>
              <option value="CA">Other 2</option>
              <option value="FR">Other 3</option>
              <option value="DE">Other 4</option>
            </select>
            <Button title="Send Invite" className="w-[50%] self-center" />
          </div>
        </ContainerBox>
      </div>

      {/* Popular Challenges */}
      <ContainerBox className="h-[665px] md:col-span-1">
        <h1 className="text-lg font-bold">Popular Challenges</h1>
        <div className="flex flex-col gap-4 mt-6 justify-center">
          {challengesError ? (
            <p>No Data Available</p> // Show fallback message if there's an error
          ) : groupedChallenges.length > 0 ? (
            <div className="overflow-y-auto max-h-[575px]"> {/* Scroll container */}
              {groupedChallenges
                .sort((a, b) => b.count - a.count) // Sort challenges by count (highest to lowest)
                .map((challenge) => {
                  return (
                    <div
                      key={challenge.challenge.id}
                      className="flex justify-between items-center bg-light_gray px-5 py-2 rounded-xl mb-3"
                    >
                  <div className='flex gap-6 justify-center items-center'>
                                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                          <Image
                                            src={challenge.challenge.photo ? challenge.challenge.photo : defaultChallengeImage}
                                            alt="challenge"
                                            layout="fill"         // This will make the image fill the parent container
                                            objectFit="cover"     // Ensures the image covers the circle area
                                          />
                                        </div>
                    <div className='flex flex-col'>
                      <p className='text-sm font-semibold text-primary'>{challenge.challenge.title}</p>
                      <p className='text-xs'>Registration Deadline: {challenge.challenge.date}</p>
                    </div>
                  </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold"> Total Users: {challenge.count} {/* Display count of instances */}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p>No Challenges Available</p> // If no challenges, show this message
          )}
        </div>
      </ContainerBox>

    </div>
  );
};

export default Statistics;
