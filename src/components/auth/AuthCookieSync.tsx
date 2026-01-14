'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { setCookie, deleteCookie } from 'cookies-next';

export default function AuthCookieSync() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCookie('firebase-uid', user.uid, { maxAge: 60 * 60 * 24 * 30 });
      } else {
        deleteCookie('firebase-uid');
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
