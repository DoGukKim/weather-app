import { z } from 'zod';

import { formatZodError } from '../lib/utils';

const clientSchema = z.object({
  NEXT_PUBLIC_OPEN_METEO_API_URL: z.url(),
  NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST: z.string().min(1),
  NEXT_PUBLIC_KAKAO_LOCAL_API_URL: z.url(),
});

const clientEnvProcess = {
  NEXT_PUBLIC_OPEN_METEO_API_URL: process.env.NEXT_PUBLIC_OPEN_METEO_API_URL,
  NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST:
    process.env.NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST,
  NEXT_PUBLIC_KAKAO_LOCAL_API_URL: process.env.NEXT_PUBLIC_KAKAO_LOCAL_API_URL,
};

function parseClientEnv() {
  const parsed = clientSchema.safeParse(clientEnvProcess);

  if (!parsed.success) {
    const errorDetails = formatZodError(parsed.error);

    console.error(`❌ Invalid client environment variables: ${errorDetails}`);

    throw new Error('Invalid client environment variables');
  }

  return parsed.data;
}

export const clientEnv = parseClientEnv();
