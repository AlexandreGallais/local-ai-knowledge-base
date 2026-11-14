# std::experimental::ranges::find_end

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2, class Proj = ranges::identity, IndirectRelation<I2, projected<I1, Proj>> Pred = ranges::equal_to<> > I1 find_end( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{}, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< ForwardRange R1, ForwardRange R2, class Proj = ranges::identity, IndirectRelation<ranges::iterator_t<R2>, projected<ranges::iterator_t<R1>, Proj>> Pred = ranges::equal_to<> > ranges::safe_iterator_t<R1> find_end( Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{}, Proj proj = Proj{} );` | (2) | (ranges TS) |

1) Searches for the last occurrence of the sequence `[``first2``,``last2``)` in the range `[``first1``,``last1``)` (after projection with `proj`).

2) Same as (1), but uses `r1` as the first source range and `r2` as the second source range, as if using `ranges::begin(r1)` as `first1`, `ranges::end(r1)` as `last1`, `ranges::begin(r2)` as `first2`, and `ranges::end(r2)` as `last2`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first1, last1 | - | the range of elements to examine |
| r1 | - | the range of elements to examine |
| first2, last2 | - | the range of elements to search for |
| r2 | - | the range of elements to search for |
| pred | - | predicate to compare the elements |
| proj | - | projection to apply to the elements in the first range |

### Return value

Iterator to the beginning of last occurrence of the sequence `[``first2``,``last2``)` in range `[``first1``,``last1``)` (after projection with `proj`).

If `[``first2``,``last2``)` is empty or if no such sequence is found, an iterator that compares equal to `last1` is returned.

### Complexity

At most `S * (N - S + 1)` applications of the predicate and projection, where `S = last2 - first2` and `N = last1 - first1`.

### Notes

The projection is only applied to the range `[``first1``,``last1``)`.

### Possible implementation

`template<ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2, class Proj = ranges::identity, IndirectRelation<I2, projected<I1, Proj>> Pred = ranges::equal_to<>> I1 find_end(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{}, Proj proj = Proj{}) { I1 result = ranges::next(first1, last1); if (first2 == last2) return result; while (true) { I1 new_result = ranges::search(first1, last1, first2, last2, pred, proj); if (new_result == last1) break; else { result = new_result; first1 = result; ++first1; } } return result; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| find_end | finds the last sequence of elements in a certain range (function template) |
| search | searches for a range of elements (function template) |
| includes | returns `true` if one set is a subset of another (function template) |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| find, find_if, find_if_not | finds the first element satisfying specific criteria (function template) |
| find_first_of | searches for any one of a set of elements (function template) |
| search_n | searches for a number consecutive copies of an element in a range (function template) |
