import { useState, useEffect } from 'react';

const useRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, [localStorage.getItem('role')]);

  return role;
};

export const useID = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const storeID = localStorage.getItem('ID');
    if (storeID) {
      setId(storeID);
    }
  }, [localStorage.getItem('ID')]);

  return id;
};

export default useRole;