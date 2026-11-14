# std::experimental::ranges::prev

| Defined in header `<experimental/ranges/iterator>` |  |  |
| --- | --- | --- |
| `namespace { constexpr /* unspecified */ prev = /* unspecified */; }` |  | (ranges TS) (customization point object) |
| Call signature |  |  |
| `template< Iterator I > constexpr I prev( I i );` | (1) |  |
| `template< Iterator I > constexpr I prev( I i, ranges::difference_type_t<I> n );` | (2) |  |
| `template< Iterator I > constexpr I prev( I i, ranges::difference_type_t<I> n, I bound );` | (3) |  |

Decrements the iterator `i` `n` times, or until `bound` is reached, whichever comes first, and returns the decremented iterator.

1) Equivalent to `--i; return i;`.

2) Equivalent to `ranges::advance(i, -n); return i;`.

3) Equivalent to `ranges::advance(i, -n, bound); return i;`.

### Customization point objects

The name `ranges::prev` denotes a *customization point object*, which is a function object of a literal `Semiregular` class type (denoted, for exposition purposes, as `PrevT`). All instances of `PrevT` are equal. Thus, `ranges::prev` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `ranges::prev` above, `PrevT` will satisfy `ranges::Invocable<const PrevT, Args...>`. Otherwise, no function call operator of `PrevT` participates in overload resolution.

In every translation unit in which `ranges::prev` is defined, it refers to the same instance of the customization point object. (This means that it can be used freely in things like inline functions and function templates without violating the one-definition rule.)

### Return value

The decremented iterator.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| prev (C++11) | decrement an iterator (function template) |
| advance | advances an iterator by given distance (function template) |
| next | increment an iterator (function template) |
| distance | returns the distance between an iterator and a sentinel, or between the beginning and the end of a range (function template) |
