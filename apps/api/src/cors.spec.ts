import { describe, expect, it } from 'vitest';
import { getCorsOrigins } from './cors.js';

describe('getCorsOrigins', () => {
  it('returns trimmed configured origins', () => {
    expect(
      getCorsOrigins(' https://example.com, http://localhost:3000 '),
    ).toEqual(['https://example.com', 'http://localhost:3000']);
  });

  it('returns no origins when unset', () => {
    expect(getCorsOrigins()).toEqual([]);
  });
});
