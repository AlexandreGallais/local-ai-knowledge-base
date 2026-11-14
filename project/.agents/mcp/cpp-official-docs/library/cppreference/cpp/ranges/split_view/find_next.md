# std::ranges::split_view<V,Pattern>::*find_next*

`constexpr ranges::subrange<ranges::iterator_t<V>> /*find_next*/( ranges::iterator_t<V> it );` (exposition only*)

Searches for the next occurrence of pattern in the underlying view. Equivalent to:

`auto [b, e] = ranges::search(ranges::subrange(it, ranges::end(base_)), pattern_); if (b != ranges::end(base_) and ranges::empty(pattern_)) { ++b; ++e; } return {b, e};`

### Parameters

it - an iterator to the position at which to start the search

### Return value

A subrange that represents the next position of the pattern, if it was found. An empty subrange otherwise.
