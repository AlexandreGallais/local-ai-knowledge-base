# std::experimental::ranges::sort

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< RandomAccessIterator I, Sentinel<I> S, class Comp = ranges::less<>, class Proj = ranges::identity > requires Sortable<I, Comp, Proj> I sort( I first, S last, Comp comp = Comp{}, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< RandomAccessRange R, class Comp = ranges::less<>, class Proj = ranges::identity > requires Sortable<ranges::iterator_t<R>, Comp, Proj> ranges::safe_iterator_t<R> sort( R&& r, Comp comp = Comp{}, Proj proj = Proj{} );` | (2) | (ranges TS) |

1) Sorts the elements in the range `[``first``,``last``)` in ascending order. The order of equal elements is not guaranteed to be preserved. Elements are compared using `comp` after applying the projection `proj`.

2) Sorts the elements in the range `r`, as if by `return ranges::sort(ranges::begin(r), ranges::end(r), comp, proj);`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to sort |
| r | - | the range of elements to sort |
| comp | - | the comparator to use |
| proj | - | the projection to apply to elements in the range |

### Return value

An iterator pointing past the end of the range (i.e., it compares equal to `last` for overload (1), and `ranges::end(r)` for overload (2)).

### Complexity

O(N·log(N)) comparisons, where N is equal to the number of elements in the range.

### Example

This section is incomplete Reason: no example

### See also

sort sorts a range into ascending order (function template)
