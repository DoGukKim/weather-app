import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';

import { Regions } from '@/entities/region';
import { removeSpaces } from '@/shared/lib/utils';

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
    if (!deferredQuery || !regions) return [];

    return regions.filter((r) => r.includes(removeSpaces(deferredQuery)));
  }, [deferredQuery, regions]);

  return {
    query,
    setQuery,
    deferredQuery,
    isStale,
    filteredRegions,
  };
}
