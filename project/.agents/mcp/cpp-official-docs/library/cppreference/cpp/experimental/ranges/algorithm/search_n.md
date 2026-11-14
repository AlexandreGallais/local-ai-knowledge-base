# std::experimental::ranges::search_n

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< ForwardIterator I, Sentinel<I> S, class T, class Pred = ranges::equal_to<>, class Proj = ranges::identity > requires IndirectlyComparable<I, const T*, Pred, Proj> I search_n( I first, S last, ranges::difference_type_t<I> count, const T& value, Pred pred = Pred{}, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< ForwardRange R, class T, class Pred = ranges::equal_to<>, class Proj = ranges::identity > requires IndirectlyComparable<ranges::iterator_t<R>, const T*, Pred, Proj> ranges::safe_iterator_t<R> search_n( R&& r, ranges::difference_type_t<ranges::iterator_t<R>> count, const T& value, Pred pred = Pred{}, Proj proj = Proj{} );` | (2) | (ranges TS) |

1) Searches the range `[``first``,``last``)` for the first sequence of `count` elements whose projected values are each equal to the given value `value` according to the predicate `pred`.

2) Same as (1), but uses `r` as the source range, as if using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| r | - | the range of elements to examine |
| count | - | the length of the sequence to search for |
| value | - | the value to search for |
| pred | - | the predicate that compares the projected elements with `value` |
| proj | - | the projection to apply to the elements |

### Return value

Iterator to the beginning of the found sequence in the range `[``first``,``last``)`. If no such sequence is found, an iterator that compares equal to `last` is returned.

### Complexity

At most `last - first` applications of the predicate and the projection.

### Possible implementation

`template<ForwardIterator I, Sentinel<I> S, class T, class Pred = ranges::equal_to<>, class Proj = ranges::identity> requires IndirectlyComparable<I, const T*, Pred, Proj> I search_n(I first, S last, ranges::difference_type_t<I> count, const T& value, Pred pred = Pred{}, Proj proj = Proj{}) { for (; first != last; ++first) { if (!ranges::invoke(pred, ranges::invoke(proj, *first), value)) continue; I candidate = first; ranges::difference_type_t<I> cur_count = 0; while (true) { ++cur_count; if (cur_count == count) // success return candidate; ++first; if (first == last) // exhausted the list return first; if (!ranges::invoke(pred, ranges::invoke(proj, *first), value)) // too few in a row break; } } return first; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| search_n | searches for the first occurrence of a number consecutive copies of an element in a range (function template) |
| find_end | finds the last sequence of elements in a certain range (function template) |
| find, find_if, find_if_not | finds the first element satisfying specific criteria (function template) |
| search | searches for a range of elements (function template) |
