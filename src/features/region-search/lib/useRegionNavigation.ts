'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UseRegionNavigationReturn {
  navigateToRegion: (region: string) => void;
}

export function useRegionNavigation(): UseRegionNavigationReturn {
  const router = useRouter();

  const navigateToRegion = useCallback(
    (region: string) => {
      const params = new URLSearchParams();
      params.set('region', region);
      router.push(`/?${params.toString()}`);
    },
    [router],
  );

  return { navigateToRegion };
}
