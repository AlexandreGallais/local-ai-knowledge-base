# std::experimental::ranges::distance

| Defined in header `<experimental/ranges/iterator>` |  |  |
| --- | --- | --- |
| `namespace { constexpr /* unspecified */ distance = /* unspecified */; }` |  | (ranges TS) (customization point object) |
| Call signature |  |  |
| `template< Iterator I, Sentinel<I> S > constexpr ranges::difference_type_t<I> distance( I first, S last );` | (1) |  |
| `template< Range R > constexpr ranges::difference_type_t<ranges::iterator_t<R>> distance( R&& r );` | (2) |  |
| `template< SizedRange R > constexpr ranges::difference_type_t<ranges::iterator_t<R>> distance( R&& r );` | (3) |  |

Returns the distance between `first` and `last`, or between the beginning and the end of the range `r`.

1) If `SizedSentinel<S, I>` is satisfied, equivalent to `return last - first;`. Otherwise, returns the number of increments needed to get from `first` to `last`. If `[``first``,``last``)` does not denote a range, then `I` and `S` must be the same type and must model `SizedSentinel`, and `[``last``,``first``)` must denote a range. Otherwise, the behavior is undefined.

2) Equivalent to `return ranges::distance(ranges::begin(r), ranges::end(r));`.

3) Equivalent to `return ranges::size(r);`.

Instantiating overloads (2,3) may be ill-formed if the header `<experimental/ranges/range>` is not included before the point of instantiation.

### Customization point objects

The name `ranges::distance` denotes a *customization point object*, which is a function object of a literal `Semiregular` class type (denoted, for exposition purposes, as `DistanceT`). All instances of `DistanceT` are equal. Thus, `ranges::distance` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `ranges::distance` above, `DistanceT` will satisfy `ranges::Invocable<const DistanceT, Args...>`. Otherwise, no function call operator of `DistanceT` participates in overload resolution.

In every translation unit in which `ranges::distance` is defined, it refers to the same instance of the customization point object. (This means that it can be used freely in things like inline functions and function templates without violating the one-definition rule.)

### Return value

The distance between `first` and `last`, or between the beginning and the end of the range `r`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| distance | returns the distance between two iterators (function template) |
| advance | advances an iterator by given distance (function template) |
| next | increment an iterator (function template) |
| prev | decrement an iterator (function template) |
| size | obtains the size of a range whose size can be calculated in constant time (customization point object) |
