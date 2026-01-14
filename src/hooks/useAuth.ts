import { auth } from '@/services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState, useCallback } from 'react';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return { user, loading, logOut };
}
