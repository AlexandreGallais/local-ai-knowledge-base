/**
 * Gives the positions of items of given sizes put one after the other with a gap.
 *
 * Formula: position_0 = start; position_i = position_(i-1) + size_(i-1) + gap
 * Edge cases: A negative gap makes the items overlap.
 * @param sizes - Sizes of the items, in user units.
 * @param start - Value at the start of the range.
 * @param gap - Space between two items, in user units.
 * @returns A new list; the inputs are not changed.
 * @example
 * stackSizes([20,40,10],100,8); // [100,128,176]
 * @see docs/geometry/
 */
export function stackSizes(
  sizes: readonly number[],
  start: number,
  gap: number,
): readonly number[] {
  return positionsFrom(
    sizes,
    start,
    gap,
  );
}

function positionsFrom(
  sizes: readonly number[],
  first: number,
  gap: number,
): readonly number[] {
  return sizes.reduce<readonly number[]>(
    (
      positions,
      _size,
      index,
    ) => [
      ...positions,
      index === 0 ? first : (positions[index - 1] ?? first) + (sizes[index - 1] ?? 0) + gap,
    ],
    [],
  );
}
