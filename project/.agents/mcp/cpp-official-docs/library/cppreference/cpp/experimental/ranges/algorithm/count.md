# std::experimental::ranges::count, std::experimental::ranges::count_if

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity > requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*> ranges::difference_type_t<I> count( I first, S last, const T& value, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< InputRange R, class T, class Proj = ranges::identity > requires IndirectRelation<ranges::equal_to<>, projected<ranges::iterator_t<R>, Proj>, const T*> ranges::difference_type_t<ranges::iterator_t<R>> count( R&& r, const T& value, Proj proj = Proj{} );` | (2) | (ranges TS) |
| `template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred > ranges::difference_type_t<I> count_if( I first, S last, Pred pred, Proj proj = Proj{} );` | (3) | (ranges TS) |
| `template< InputRange R, class Proj = ranges::identity, IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred > ranges::difference_type_t<ranges::iterator_t<R>> count_if( R&& r, Pred pred, Proj proj = Proj{} );` | (4) | (ranges TS) |

Returns the number of elements in the range `[``first``,``last``)` satisfying specific criteria.

1) Counts the elements whose projected values are equal to `value` (i.e., `ranges::invoke(proj, *i) == value`).

3) Counts the elements whose projected values satisfy the predicate `pred` (i.e., `ranges::invoke(pred, ranges::invoke(proj, *i)) != false`).

2,4) Same as (1,3), but uses `r` as the source range, as if using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| r | - | the range of elements to examine |
| value | - | the value to search for |
| pred | - | predicate to apply to the projected elements |
| proj | - | projection to apply to the elements |

### Return value

Number of elements satisfying the condition.

### Complexity

Exactly `last` - `first` comparisons / applications of the predicate, and the same number of applications of the projection.

### Notes

For the number of elements in the range `[``first``,``last``)` without any additional criteria, see `ranges::distance`.

### Possible implementation

First version

`template<InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity> requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*> ranges::difference_type_t<I> count(I first, S last, const T& value, Proj proj = Proj{}) { ranges::difference_type_t<I> ret = 0; for (; first != last; ++first) if (ranges::invoke(proj, *first) == value) ++ret; return ret; }`

Second version

`template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred> ranges::difference_type_t<I> count_if(I first, S last, Pred pred, Proj proj = Proj{}) { ranges::difference_type_t<I> ret = 0; for (; first != last; ++first) if (ranges::invoke(pred, ranges::invoke(proj, *i))) ++ret; return ret; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| count, count_if | returns the number of elements satisfying specific criteria (function template) |
| distance | returns the distance between an iterator and a sentinel, or between the beginning and the end of a range (function template) |
