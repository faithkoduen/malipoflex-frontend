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