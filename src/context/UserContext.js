'use client';
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data.user || null);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
