'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export class CustomGeolocationError extends Error {
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    super(message);
    this.name = 'CustomGeolocationError';
    this.code = code;
  }
}

export interface GeolocationOptions extends PositionOptions {
  mountBehavior?: 'get';
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
}

export interface GeolocationState {
  loading: boolean;
  error: CustomGeolocationError | null;
  data: GeolocationData | null;
}

export interface GeolocationReturn extends GeolocationState {
  getCurrentPosition: () => void;
}

export function useGeolocation(
  options?: GeolocationOptions,
): GeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    loading: !!options?.mountBehavior,
    error: null,
    data: null,
  });

  const checkGeolocationSupport = useCallback(() => {
    if (typeof window === 'undefined' || navigator.geolocation === undefined) {
      setState({
        loading: false,
        error: new CustomGeolocationError({
          message: 'Geolocation is not supported by this browser.',
          code: 0,
        }),
        data: null,
      });

      return false;
    }

    return true;
  }, []);

  const geolocationOptions = useMemo(
    () => ({
      enableHighAccuracy: options?.enableHighAccuracy,
      maximumAge: options?.maximumAge,
      timeout: options?.timeout,
    }),
    [options?.enableHighAccuracy, options?.maximumAge, options?.timeout],
  );

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { coords } = position;

    setState(() => ({
      loading: false,
      error: null,
      data: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    }));
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    const { code, message } = error;

    setState((prev) => ({
      ...prev,
      loading: false,
      error: new CustomGeolocationError({
        message,
        code,
      }),
    }));
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!checkGeolocationSupport()) return;

    setState((prev) => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      geolocationOptions,
    );
  }, [checkGeolocationSupport, geolocationOptions, handleError, handleSuccess]);

  const mountBehaviorRef = useRef(options?.mountBehavior);

  useEffect(() => {
    if (mountBehaviorRef.current === 'get') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getCurrentPosition();
    }
  }, [getCurrentPosition]);

  return {
    ...state,
    getCurrentPosition,
  };
}
