import { auth } from '@/services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState, useCallback } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';

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

      if (currentUser) {
        setCookie('firebase-uid', currentUser.uid, { maxAge: 60 * 60 * 24 * 30 });
      } else {
        deleteCookie('firebase-uid');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = useCallback(async () => {
    try {
      deleteCookie('firebase-uid');
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return { user, loading, logOut };
}
