"use client";
import { fetchUsers } from "../utils/fetchUsers";
import { useState, useEffect } from "react";
interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone_number: string;
  user_type: string;
  national_id: string;
  kra_pin: string;
  next_of_kin_name: string;
  next_of_kin_id: string;
  created_at:string;
}
export const useFetchUsers = () => {
  const [data, setData] = useState<User[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetchUsers(); 
        setData(Array.isArray(result) ? result : []); 
      } catch (error: any) {
        setError(error?.message || "Failed to load users");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return { data, loading, error };
};


import {  useCallback } from "react";
import { getMembers, createMember, Member } from "../utils/fetchUsers";

const useFetchMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      setError(`Failed to fetch members: ${(error as Error).message}`);
      console.error("Fetch members error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMember = async (newMember: Member) => {
    try {
      const createdMember = await createMember(newMember);
      setMembers((prevMembers) => [...prevMembers, createdMember]);
    } catch (error) {
      setError(`Failed to add member: ${(error as Error).message}`);
      console.error("Add member error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { members, loading, error, refetch: fetchData, addMember };
};

export default useFetchMembers;
