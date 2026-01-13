import { z } from 'zod';

/**
 * Zod 에러를 읽기 쉬운 문자열로 포맷팅
 * @param error - ZodError 인스턴스
 * @param prefix - 각 줄 앞에 붙일 접두사 (기본: '  • ')
 */
export function formatZodError(error: z.ZodError, prefix = '  • '): string {
  const flattened = z.flattenError(error);

  return Object.entries(flattened.fieldErrors)
    .map(([field, errors]) => {
      const messages = Array.isArray(errors)
        ? errors.join(', ')
        : String(errors);
      return `${prefix}${field}: ${messages}`;
    })
    .join('\n');
}
