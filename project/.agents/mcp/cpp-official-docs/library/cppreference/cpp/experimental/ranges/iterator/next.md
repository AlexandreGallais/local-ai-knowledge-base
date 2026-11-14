# std::experimental::ranges::next

| Defined in header `<experimental/ranges/iterator>` |  |  |
| --- | --- | --- |
| `namespace { constexpr /* unspecified */ next = /* unspecified */; }` |  | (ranges TS) (customization point object) |
| Call signature |  |  |
| `template< Iterator I > constexpr I next( I i );` | (1) |  |
| `template< Iterator I > constexpr I next( I i, ranges::difference_type_t<I> n );` | (2) |  |
| `template< Iterator I, Sentinel<I> S > constexpr I next( I i, S bound );` | (3) |  |
| `template< Iterator I, Sentinel<I> S > constexpr I next( I i, ranges::difference_type_t<I> n, S bound );` | (4) |  |

Advances the iterator `i` `n` times, or until `bound` is reached, whichever comes first, and returns the advanced iterator.

1) Equivalent to `++i; return i;`.

2) Equivalent to `ranges::advance(i, n); return i;`.

3) Equivalent to `ranges::advance(i, bound); return i;`.

4) Equivalent to `ranges::advance(i, n, bound); return i;`.

### Customization point objects

The name `ranges::next` denotes a *customization point object*, which is a function object of a literal `Semiregular` class type (denoted, for exposition purposes, as `NextT`). All instances of `NextT` are equal. Thus, `ranges::next` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `ranges::next` above, `NextT` will satisfy `ranges::Invocable<const NextT, Args...>`. Otherwise, no function call operator of `NextT` participates in overload resolution.

In every translation unit in which `ranges::next` is defined, it refers to the same instance of the customization point object. (This means that it can be used freely in things like inline functions and function templates without violating the one-definition rule.)

### Return value

The advanced iterator.

### Notes

Even though omitting `n` for overload (2) behaves as if `n` is 1, omitting `n` for overload (4) effectively behaves as if `n` is infinity (always advance to `bound`).

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| next (C++11) | increment an iterator (function template) |
| advance | advances an iterator by given distance (function template) |
| prev | decrement an iterator (function template) |
| distance | returns the distance between an iterator and a sentinel, or between the beginning and the end of a range (function template) |
