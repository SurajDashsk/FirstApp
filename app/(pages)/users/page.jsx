'use client';

import Button from '@/app/components/Button';
import ContainerBox from '@/app/components/ContainerBox';
import React, { useEffect, useState } from 'react';
import defaultProfileImage from '@/public/images/defaultProfileImage.svg';
import Image from 'next/image';
import getUsers from '@/app/firebase/getUsers'; // Import the new getUsers function
import { useRouter } from 'next/navigation';

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]); // Change state to hold user data
  const [usersError, setUsersError] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const result = await getUsers(); // Call the function to get users
      if (result && result.newDocs && result.newDocs.length > 0) {
        const sortedUsers = result.newDocs.sort((a, b) => {
          const aChallenges = a.totalChallengeCount || 0;
          const bChallenges = b.totalChallengeCount || 0;
          return bChallenges - aChallenges; // Sort by total challenge count, descending
        });
        setUsers(sortedUsers); // Set sorted users in state
      } else {
        setUsers([]); // Set empty array if no users
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersError(true); // Set error state if something goes wrong
      setUsers([]); // Ensure we set an empty array in case of error
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Users */}
      <ContainerBox className="h-[665px] md:col-span-2">
        <h1 className="text-lg font-bold">Users List</h1>
        <div className="flex flex-col gap-4 mt-6 justify-center">
          {usersError ? (
            <p>No Data Available</p> // Show fallback message if there's an error
          ) : users.length > 0 ? (
            <div className="overflow-y-auto max-h-[575px]"> {/* Scroll container */}
              {users.map((user, index) => {
                return (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-light_gray px-5 py-2 rounded-xl mb-3"
                  >
                    <div className="flex flex-col">
                      <p className="text-sm text-primary font-semibold">{user.firstName} {user.lastName}</p> {/* Display user's name */}
                      <p className="text-xs">{user.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold"> Total Challenges: {user.totalChallengeCount || 0} </p> {/* Example of user-related data */}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No Users Available</p> // If no users, show this message
          )}
        </div>
      </ContainerBox>
    </div>
  );
};

export default Users;
