import { Options } from 'ky';

import { clientEnv } from '../config';

export type ApiName = 'openMeteo' | 'kakaoLocal';

const openMeteoConfig: Options = {
  prefixUrl: clientEnv.NEXT_PUBLIC_OPEN_METEO_API_URL,
};

const kakaoLocalConfig: Options = {
  prefixUrl: clientEnv.NEXT_PUBLIC_KAKAO_LOCAL_API_URL,
};

export const API_CONFIGS: Record<ApiName, Options> = {
  openMeteo: openMeteoConfig,
  kakaoLocal: kakaoLocalConfig,
};
