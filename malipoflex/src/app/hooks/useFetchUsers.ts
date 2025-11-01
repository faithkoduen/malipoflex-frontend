// src/hooks/useFetchMembers.ts
"use client";
import { useEffect, useState, useCallback } from "react";
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