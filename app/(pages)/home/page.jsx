'use client';

import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React, { useEffect, useState } from 'react';

import defaultChallengeImage from '@/public/images/default-challenge.svg';
import defaultProfileImage from '@/public/images/defaultProfileImage.svg';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase_app from '@/app/firebase/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import getUserByEmail from '@/app/firebase/getUserByEmail';
import RouteGuard from '@/app/components/route-guard';
import getUpcomingChallenges from '@/app/firebase/getUpcomingChallenges';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [userState, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);
  const [userDataError, setUserDataError] = useState(false);
  const [challengesError, setChallengesError] = useState(false);

  useEffect(() => {
    if (!userState) {
      signInUser();
    }
  }, [userState]);

  const fetchUpcomingChallenges = async () => {
    try {
      const result = await getUpcomingChallenges();
      if (result && result.upcomingChallenges) {
        setUpcomingChallenges(result.upcomingChallenges);
      } else {
        setUpcomingChallenges([]);
      }
    } catch (error) {
      console.error('Error fetching upcoming challenges:', error);
      setChallengesError(true);
      setUpcomingChallenges([]);
    }
  };

  useEffect(() => {
    fetchUpcomingChallenges();
  }, []);

  const getUserData = async () => {
    try {
      const { user } = await getUserByEmail(userState?.email);
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserDataError(true);
      setUserData(null);
    }
  };

  useEffect(() => {
    if (userState?.email) {
      getUserData();
    }
  }, [userState]);

  return (
    <RouteGuard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Left Column: Upcoming Challenges */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <ContainerBox className="h-[665px]">
            <h1 className="text-lg font-bold">Upcoming Challenges</h1>
            <div className='flex flex-col gap-4 mt-6 justify-start overflow-y-auto h-[450px]'>
              {challengesError ? (
                <p>No Data Available</p>
              ) : upcomingChallenges.length > 0 ? (
                upcomingChallenges.map((challenge) => (
                  <div
                    className="flex justify-between items-center bg-light_gray px-5 py-1 rounded-xl"
                    key={challenge.id}
                  >
                    <div className="flex gap-6 justify-center items-center">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        src={challenge.photo ? challenge.photo : defaultChallengeImage}
                        alt="challenge"
                        layout="fill"         // This will make the image fill the parent container
                        objectFit="cover"     // Ensures the image covers the circle area
                      />
                    </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-primary">{challenge.title}</p>
                        <p className="text-xs">
                          {challenge.registrationDeadline.toDate().toLocaleDateString("en-US")}
                        </p>
                      </div>
                    </div>
                    <Button title="View" className="w-[25%] h-7" />
                  </div>
                ))
              ) : (
                <p>No Upcoming Challenges Available</p>
              )}
            </div>
              <div className="flex justify-center mt-20">
                <Button
                  title="See All"
                  className="w-64 h-9"
                  onClick={() => router.push('/challenges')}
                />
              </div>
          </ContainerBox>
        </div>

        {/* Right Column: Profile and App Numbers */}
        <div className="md:col-span-1 flex flex-col gap-6">
            {/* Profile */}
          <ContainerBox className="h-[320px]">
            <h1 className="text-lg font-bold">Profile</h1>
            <div className="flex flex-col gap-4 mt-1">
              {/* Centering Image */}
              <div className="flex justify-center mt-1"> {/* Centering container */}
              <div className="relative w-20 h-20 overflow-hidden rounded-full">
                      <Image
                        src={userData?.photo ? userData?.photo : defaultProfileImage}
                        alt="challenge"
                        layout="fill"         // This will make the image fill the parent container
                        objectFit="cover"     // Ensures the image covers the circle area
                      />
                    </div>
              </div>
              <div className="flex flex-col gap-4 mt-1">
              {userDataError ? (
                <p>No Data Available</p>
              ) : userData ? (
                <>
                  <div className="flex justify-between">
                    <p>Name</p>
                    <p className="text-primary font-extrabold">{userData?.companyName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Access</p>
                    <p className="text-primary font-extrabold">{userData?.isAdmin ? 'Admin' : 'Company'}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Email</p>
                    <p className="text-primary font-extrabold">{userData?.email}</p>
                  </div>
                  <div className="flex justify-between">
                <p>Challenges Created</p>
                <p className="text-primary font-extrabold">X</p>
              </div>
                </>
              ) : (
                <p>No User Data Available</p>
              )}
            </div>
            </div>
          </ContainerBox>

          {/* Export User Rewards */}
          <ContainerBox className="h-[320px]">
            <h1 className="text-lg font-bold">Export User Rewards</h1>
            <p>Not Available</p>
          </ContainerBox>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Home;
