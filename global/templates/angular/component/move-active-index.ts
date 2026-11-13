/** Keys that move the active option of a list. */
export type ListMoveKey = 'ArrowDown' | 'ArrowUp' | 'End' | 'Home';

/**
 * Tell whether a key of a keyboard event moves the active option.
 * @param key The key of a KeyboardEvent, as "ArrowDown".
 * @returns True for ArrowDown, ArrowUp, End and Home.
 * @example isListMoveKey('End') // true
 */
export function isListMoveKey(key: string): key is ListMoveKey {
  return key === 'ArrowDown' || key === 'ArrowUp' || key === 'End' || key === 'Home';
}

/**
 * Return the index of the option that becomes active after a move key.
 *
 * The index does not wrap: it stays on the first or the last option.
 * @param current Index of the active option, or -1 when no option is active.
 * @param count Number of options in the list.
 * @param key Move key pressed by the user.
 * @returns The new active index, or -1 when the list is empty.
 * @example moveActiveIndex(0, 3, 'ArrowDown') // 1
 */
export function moveActiveIndex(
  current: number,
  count: number,
  key: ListMoveKey,
): number {
  if (count <= 0) {
    return -1;
  }

  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return count - 1;
  }

  return key === 'ArrowUp'
    ? Math.max(
        current - 1,
        0,
      )
    : Math.min(
        current + 1,
        count - 1,
      );
}
