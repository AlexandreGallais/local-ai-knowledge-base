# std::experimental::ranges::search

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2> I1 search( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );` | (1) | (ranges TS) |
| `template< ForwardRange R1, ForwardRange R2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires IndirectlyComparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>, Pred, Proj1, Proj2> ranges::safe_iterator_t<R1> search( R1&& r1, R2&& r2, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );` | (2) | (ranges TS) |

1) Searches for the first occurrence of the sequence of elements `[``first2``,``last2``)` in the range `[``first1``,``last1``)`. Elements are compared using `pred` after being projected with `proj2` and `proj1`, respectively.

2) Same as (1), but uses `r1` as the first source range and `r2` as the second source range, as if using `ranges::begin(r1)` as `first1`, `ranges::end(r1)` as `last1`, `ranges::begin(r2)` as `first2`, and `ranges::end(r2)` as `last2`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first1, last1 | - | the range of elements to examine |
| r1 | - | the range of elements to examine |
| first2, last2 | - | the range of elements to search for |
| r2 | - | the range of elements to search for |
| pred | - | predicate to apply to the projected elements |
| proj1 | - | projection to apply to the elements in the first range |
| proj2 | - | projection to apply to the elements in the second range |

### Return value

An iterator to the beginning of first occurrence of the sequence `[``first2``,``last2``)` in the range `[``first1``,``last1``)`. If `[``first2``,``last2``)` is empty, `first1` is returned. If no such occurrence is found, an iterator that compares equal to `last1` is returned.

### Complexity

At most `S * N` applications of the predicate and each projection, where `S = last2 - first2` and `N = last1 - first1`.

### Possible implementation

`template<ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity> requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2> I1 search(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{}) { for (; ; ++first1) { I1 it = first1; for (I2 it2 = first2; ; (void)++it, (void)++it2) { if (it2 == last2) return first1; if (it == last1) return it; if (!ranges::invoke(pred, ranges::invoke(proj1, *it), ranges::invoke(proj2, *it2))) break; } } }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| search | searches for the first occurrence of a range of elements (function template) |
| find_end | finds the last sequence of elements in a certain range (function template) |
| includes | returns `true` if one set is a subset of another (function template) |
| equal | determines if two sets of elements are the same (function template) |
| find, find_if, find_if_not | finds the first element satisfying specific criteria (function template) |
| lexicographical_compare | returns `true` if one range is lexicographically less than another (function template) |
| mismatch | finds the first position where two ranges differ (function template) |
| search_n | searches for a number consecutive copies of an element in a range (function template) |
