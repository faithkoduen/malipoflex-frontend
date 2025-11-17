import { useEffect, useState } from "react";
import { fetchProfile } from "../utils/fetchProfile";

/**
 * Custom React hook to fetch profile data using token from localStorage.
 * Returns { profile, loading, error, token }
 */
export default function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Get token from localStorage (client-side only)
    const storedToken =
      typeof window !== "undefined"
        ? localStorage.getItem("token") ?? ""
        : "";

    setToken(storedToken);

    if (!storedToken) {
      setError("Missing token");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchProfile(storedToken)
      .then(setProfile)
      .catch((err) => setError(err.message || "Failed to fetch profile"))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error, token };
}