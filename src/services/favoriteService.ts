import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const favoriteService = {
  getUserFavoritesIds: async (userId: string): Promise<(number | string)[]> => {
    if (!userId) return [];

    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(favoritesRef);

    return snapshot.docs.map((doc) => {
      const id = doc.id;
      const numId = Number(id);
      return isNaN(numId) ? id : numId;
    });
  },

  addFavorite: async (userId: string, productId: number | string) => {
    if (!userId) throw new Error('Kullanıcı giriş yapmalı');

    const favoriteRef = doc(db, 'users', userId, 'favorites', productId.toString());

    await setDoc(favoriteRef, {
      productId: productId,
      addedAt: new Date().toISOString(),
    });

    return productId;
  },

  removeFavorite: async (userId: string, productId: number | string) => {
    if (!userId) throw new Error('Kullanıcı giriş yapmalı');

    const favoriteRef = doc(db, 'users', userId, 'favorites', productId.toString());
    await deleteDoc(favoriteRef);

    return productId;
  },
};
