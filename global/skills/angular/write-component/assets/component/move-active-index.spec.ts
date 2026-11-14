import {
  describe,
  expect,
  it,
} from 'vitest';

import { moveActiveIndex } from './move-active-index';

describe('moveActiveIndex', () => {
  it('moves down and stops on the last option', () => {
    expect(moveActiveIndex(
      0,
      3,
      'ArrowDown',
    )).toBe(1);
    expect(moveActiveIndex(
      2,
      3,
      'ArrowDown',
    )).toBe(2);
  });
  it('moves up and stops on the first option', () => {
    expect(moveActiveIndex(
      2,
      3,
      'ArrowUp',
    )).toBe(1);
    expect(moveActiveIndex(
      0,
      3,
      'ArrowUp',
    )).toBe(0);
  });
  it('goes to the first option from no active option', () => {
    expect(moveActiveIndex(
      -1,
      3,
      'ArrowDown',
    )).toBe(0);
    expect(moveActiveIndex(
      -1,
      3,
      'ArrowUp',
    )).toBe(0);
  });
  it('goes to both ends, and gives -1 for an empty list', () => {
    expect(moveActiveIndex(
      1,
      3,
      'Home',
    )).toBe(0);
    expect(moveActiveIndex(
      1,
      3,
      'End',
    )).toBe(2);
    expect(moveActiveIndex(
      0,
      0,
      'ArrowDown',
    )).toBe(-1);
  });
});
