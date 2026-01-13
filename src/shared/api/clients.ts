import ky, { KyInstance } from 'ky';

import { API_CONFIGS, ApiName } from './configs';

const openMeteoClient = ky.create(API_CONFIGS.openMeteo);
const kakaoLocalClient = ky.create(API_CONFIGS.kakaoLocal);

export const API_CLIENTS: Record<ApiName, KyInstance> = {
  openMeteo: openMeteoClient,
  kakaoLocal: kakaoLocalClient,
};
