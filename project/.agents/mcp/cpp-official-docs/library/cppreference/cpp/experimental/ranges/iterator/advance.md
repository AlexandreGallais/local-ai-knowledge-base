# std::experimental::ranges::advance

| Defined in header `<experimental/ranges/iterator>` |  |  |
| --- | --- | --- |
| `namespace { constexpr /* unspecified */ advance = /* unspecified */; }` |  | (ranges TS) (customization point object) |
| Call signature |  |  |
| `template< Iterator I > constexpr void advance( I& i, ranges::difference_type_t<I> n );` | (1) |  |
| `template< Iterator I, Sentinel<I> S > constexpr void advance( I& i, S bound );` | (2) |  |
| `template< Iterator I, Sentinel<I> S > constexpr ranges::difference_type_t<I> advance( I& i, ranges::difference_type_t<I> n, S bound );` | (3) |  |

Advances the iterator `i` `n` times, or until `bound` is reached, whichever comes first.

1) If `I` models `RandomAccessIterator`, equivalent to `i += n`. Otherwise, increments (or decrements if `n` is negative) `i` `n` times. The behavior is undefined if `n` is negative and `I` does not model `BidirectionalIterator`.

2) If `Assignable<I&, S>` is satisfied, equivalent to `i = std::move(bound)`.

Otherwise, if `[``i``,``bound``)` does not denote a range, the behavior is undefined.

Otherwise, if `SizedSentinel<S, I>` is satisfied, equivalent to `ranges::advance(i, bound - i)`.

Otherwise, increments `i` until `i == bound`.

3) If `SizedSentinel<S, I>` is satisfied, equivalent to `ranges::advance(i, bound)` if |`n`| >= |`bound - i`|, and `ranges::advance(i, n)` otherwise.

Otherwise, increments (or decrements if `n` is negative) `i` either `n` times or until `i == bound`, whichever comes first.

If `n > 0`, `[``i``,``bound``)` shall denote a range; if `n == 0`, either `[``i``,``bound``)` or `[``bound``,``i``)` shall denote a range; if `n < 0`, `[``bound``,``i``)` shall denote a range, `I` and `S` shall be the same type, and `I` must model `BidirectionalIterator`. Otherwise, the behavior is undefined.

### Customization point objects

The name `ranges::advance` denotes a *customization point object*, which is a function object of a literal `Semiregular` class type (denoted, for exposition purposes, as `AdvanceT`). All instances of `AdvanceT` are equal. Thus, `ranges::advance` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `ranges::advance` above, `AdvanceT` will satisfy `ranges::Invocable<const AdvanceT, Args...>`. Otherwise, no function call operator of `AdvanceT` participates in overload resolution.

In every translation unit in which `ranges::advance` is defined, it refers to the same instance of the customization point object. (This means that it can be used freely in things like inline functions and function templates without violating the one-definition rule.)

### Return value

1,2) (none)

3) The number of increment/decrements not performed due to reaching `bound`. In other words, `n - M`, where `M` is the distance from the starting position of `i` to the ending position and is negative if the ending position is before the starting position.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| advance | advances an iterator by given distance (function template) |
| distance | returns the distance between an iterator and a sentinel, or between the beginning and the end of a range (function template) |
| next | increment an iterator (function template) |
| prev | decrement an iterator (function template) |
