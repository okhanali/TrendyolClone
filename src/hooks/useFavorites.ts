'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { favoriteService } from '@/services/favoriteService';
import { toast } from 'react-toastify';

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.uid;

  // Favori ID listesini çek
  const { data: favoriteIds = [], isLoading } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => favoriteService.getUserFavoritesIds(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  // ID listede var mı?
  const isFavorite = (productId: number | string) => {
    return favoriteIds.some((id) => id.toString() === productId.toString());
  };

  const addMutation = useMutation({
    mutationFn: (productId: number | string) => favoriteService.addFavorite(userId!, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
      toast.success('Favorilere eklendi');
    },
    onError: () => toast.error('Ekleme başarısız'),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number | string) => favoriteService.removeFavorite(userId!, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
      toast.success('Favorilerden çıkarıldı');
    },
    onError: () => toast.error('Silme başarısız'),
  });

  const toggleFavorite = (productId: number | string) => {
    if (!userId) {
      toast.error('Lütfen önce giriş yapın');
      return;
    }

    if (isFavorite(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  const isProcessing = addMutation.isPending || removeMutation.isPending;

  return {
    favoriteIds,
    isLoading,
    toggleFavorite,
    isFavorite,
    isProcessing,
  };
};
