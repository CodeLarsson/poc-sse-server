import { describe, expect, it } from '@jest/globals';
import { addNumbers } from '../src/index';

describe('addNumbers', () => {
  it('should add two numbers', () => {
    const result = addNumbers(1, 2);
    expect(result).toBe(3);
  });
});
