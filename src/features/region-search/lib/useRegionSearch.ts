import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';

import { Regions } from '@/entities/region';
import { replaceAll } from '@/shared/lib/utils';

interface UseRegionSearchReturn {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  deferredQuery: string;
  isStale: boolean;
  filteredRegions: Regions;
}

export function useRegionSearch(regions: Regions): UseRegionSearchReturn {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const filteredRegions = useMemo(() => {
    if (!deferredQuery || !regions) return regions;

    const normalizedQuery = replaceAll(deferredQuery, ' ', '');
    return regions.filter((r) =>
      replaceAll(r, '-', '').includes(normalizedQuery),
    );
  }, [deferredQuery, regions]);

  return {
    query,
    setQuery,
    deferredQuery,
    isStale,
    filteredRegions,
  };
}
