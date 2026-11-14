# std::experimental::ranges::adjacent_find

| Defined in header `<experimental/ranges/algorithm>` |  |  |
| --- | --- | --- |
| `template< ForwardIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectRelation<projected<I, Proj>> Pred = ranges::equal_to<> > I adjacent_find( I first, S last, Pred pred = Pred{}, Proj proj = Proj{} );` | (1) | (ranges TS) |
| `template< ForwardRange R, class Proj = ranges::identity, IndirectRelation<projected<ranges::iterator_t<R>, Proj>> Pred = ranges::equal_to<> > ranges::safe_iterator_t<R> adjacent_find( R&& r, Pred pred = Pred{}, Proj proj = Proj{} );` | (2) | (ranges TS) |

1) Searches the range `[``first``,``last``)` for two consecutive identical elements. Elements are compared using `pred` after being projected with `proj`.

2) Same as (1), but uses `r` as the source range, as if using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

Notwithstanding the declarations depicted above, the actual number and order of template parameters for algorithm declarations is unspecified. Thus, if explicit template arguments are used when calling an algorithm, the program is probably non-portable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| r | - | the range of elements to examine |
| pred | - | predicate to use to compare the projected elements |
| proj | - | projection to apply to the elements |

### Return value

An iterator to the first of the first pair of identical elements, that is, the first iterator `i` such that both `i` and `i + 1` are in the range `[``first``,``last``)` and `ranges::invoke(pred, ranges::invoke(proj, *i), ranges::invoke(proj, *(i + 1))) != false`.

If no such elements are found, an iterator that compares equal to `last` is returned.

### Complexity

If the range is nonempty, exactly `min((result - first) + 1, (last - first) - 1)` applications of the predicate where `result` is the return value, and at most twice as many applications of the projection.

### Possible implementation

`template<ForwardIterator I, Sentinel<I> S, class Proj = ranges::identity, IndirectRelation<projected<I, Proj>> Pred = ranges::equal_to<>> I adjacent_find(I first, S last, Pred pred = Pred{}, Proj proj = Proj{}) { if (first == last) return first; I next = first; ++next; while (next != last) { if (ranges::invoke(pred, ranges::invoke(proj, *first), ranges::invoke(proj, *next))) return first; ++next; ++first; } return next; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| unique | removes consecutive duplicate elements in a range (function template) |
