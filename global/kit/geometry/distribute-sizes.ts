import type {
  DistributeMode,
  Span,
} from './shapes.ts';

interface Spacing {
  readonly gap: number;
  readonly offset: number;
}

const SPACING: Readonly<Record<DistributeMode, (
  free: number,
  count: number,
) => Spacing>> = {
  'space-around': (
    free,
    count,
  ) => ({
    gap: free / count,
    offset: free / count / 2,
  }),
  'space-between': (
    free,
    count,
  ) => ({
    gap: count === 1 ? 0 : free / (count - 1),
    offset: 0,
  }),
  'space-evenly': (
    free,
    count,
  ) => ({
    gap: free / (count + 1),
    offset: free / (count + 1),
  }),
};

/**
 * Gives the positions of items of given sizes spread over a length.
 *
 * Formula: free = end - start - sum(sizes). space-between: gap = free / (n - 1), first item on start. space-around: gap = free / n, half a gap at each end. space-evenly: gap = free / (n + 1), a full gap at each end. Returns the start of each item.
 * Edge cases: free < 0: throws `RangeError` (CSS falls back to another alignment instead). No item: throws. One item with space-between: on start.
 * @param sizes - Sizes of the items, in user units.
 * @param span - Start and end of the space the items share, in user units.
 * @param mode - How the free space is shared: space-between, space-around or space-evenly.
 * @returns A new list; the inputs are not changed.
 * @throws {RangeError} distributeSizes: at least one item is required.
 * @throws {RangeError} distributeSizes: the items do not fit between start and end.
 * @example
 * distributeSizes([20,20,20], { start: 0, end: 200 }, 'space-between'); // [0,90,180]
 * @see docs/geometry/
 */
export function distributeSizes(
  sizes: readonly number[],
  span: Span,
  mode: DistributeMode,
): readonly number[] {
  if (sizes.length === 0) {
    throw new RangeError('distributeSizes: at least one item is required');
  }

  const free = span.end - span.start - sizes.reduce(
    (
      sum,
      size,
    ) => sum + size,
    0,
  );

  if (free < 0) {
    throw new RangeError('distributeSizes: the items do not fit between start and end');
  }

  const {
    gap,
    offset,
  } = SPACING[mode](
    free,
    sizes.length,
  );

  return positionsFrom(
    sizes,
    span.start + offset,
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
