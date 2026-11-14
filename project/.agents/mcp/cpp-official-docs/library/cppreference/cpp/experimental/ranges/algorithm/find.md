# std::experimental::ranges::find, std::experimental::ranges::find_if, std::experimental::ranges::find_if_not

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity > requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*> I find( I first, S last, const T& value, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< InputRange R, class T, class Proj = ranges::identity > requires IndirectRelation<ranges::equal_to<>, projected<ranges::iterator_t<R>, Proj>, const T*> ranges::safe_iterator_t<R> find( R&& r, const T& value, Proj proj = Proj{} );` | (2) | (ranges TS) |
| `template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred > I find_if( I first, S last, Pred pred, Proj proj = Proj{} );` | (3) | (ranges TS) |
| `template< InputRange R, class Proj = ranges::identity, IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred > ranges::safe_iterator_t<R> find_if( R&& r, Pred pred, Proj proj = Proj{} );` | (4) | (ranges TS) |
| `template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred > I find_if_not( I first, S last, Pred pred, Proj proj = Proj{} );` | (5) | (ranges TS) |
| `template< InputRange R, class Proj = ranges::identity, IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred > ranges::safe_iterator_t<R> find_if_not( R&& r, Pred pred, Proj proj = Proj{} );` | (6) | (ranges TS) |

Returns the first element in the range `[``first``,``last``)` that satisfies specific criteria:

1) `find` searches for an element whose projected value is equal to `value` (i.e., `value == ranges::invoke(proj, *i)`).

3) `find_if` searches for an element for whose projected value predicate `p` returns `true` (i.e., `ranges::invoke(pred, ranges::invoke(proj, *i))`) is `true`).

5) `find_if_not` searches for an element for whose projected value predicate `q` returns `false` (i.e., `ranges::invoke(pred, ranges::invoke(proj, *i))`) is `false`).

2,4,6) Same as (1,3,5), but uses `r` as the source range, as if using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| r | - | the range of elements to examine |
| value | - | value to compare the projected elements to |
| pred | - | predicate to apply to the projected elements |
| proj | - | projection to apply to the elements |

### Return value

Iterator to the first element satisfying the condition. If no such element is found, returns an iterator that compares equal to `last`.

### Complexity

At most `last` - `first` applications of the predicate and projection.

### Possible implementation

First version

`template<InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity> requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*> I find(I first, S last, const T& value, Proj proj = Proj{}) { for (; first != last; ++first) if (ranges::invoke(proj, *first) == value) break; return first; }`

Second version

`template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred> I find_if(I first, S last, Pred pred, Proj proj = Proj{}) { for (; first != last; ++first) if (ranges::invoke(pred, ranges::invoke(proj, *first))) break; return first; }`

Third version

`template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectUnaryPredicate<projected<I, Proj>> Pred> I find_if_not(I first, S last, Pred pred, Proj proj = Proj{}) { for (; first != last; ++first) if (!ranges::invoke(pred, ranges::invoke(proj, *first))) break; return first; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| find, find_if, find_if_not (C++11) | finds the first element satisfying specific criteria (function template) |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| find_end | finds the last sequence of elements in a certain range (function template) |
| find_first_of | searches for any one of a set of elements (function template) |
| mismatch | finds the first position where two ranges differ (function template) |
| search | searches for a range of elements (function template) |
