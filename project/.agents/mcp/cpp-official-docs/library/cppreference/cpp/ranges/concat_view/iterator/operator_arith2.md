# operator+,-(ranges::concat_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& it, difference_type n ) requires /*concat-is-random-access*/<Const, Views...>;` | (1) | (since C++26) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& it ) requires /*concat-is-random-access*/<Const, Views...>;` | (2) | (since C++26) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& it, difference_type n ) requires /*concat-is-random-access*/<Const, Views...>;` | (3) | (since C++26) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, const /*iterator*/& y ) requires /*concat-is-random-access*/<Const, Views...>;` | (4) | (since C++26) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, std::default_sentinel_t ) requires /* see description */;` | (5) | (since C++26) |
| `friend constexpr difference_type operator-( std::default_sentinel_t, const /*iterator*/& x ) requires /* see description */;` | (6) | (since C++26) |

Increments or decrements the iterator.

1) Equivalent to `auto t = it; t += n; return t;`.

2) Equivalent to `return it + n;`.

3) Equivalent to `auto t = it; t -= n; return t;`.

4) Let `Ix` be `x.it_ .index()` and `Iy` be `y.it_ .index()`:

- If `Ix > Iy` is `true`, equivalent to `difference_type result = ranges::distance(y.get-iter <Iy>(), y.get-end <Iy>()); for (std::size_t I = Iy + 1; I < Ix; I++) result += ranges::distance(x.get-view <I>()); return result + ranges::distance(x.get-begin <Ix>(), x.get-iter <Ix>());`.
- Otherwise, if `Ix < Iy` is `true`, equivalent to `return -(y - x);`.
- Otherwise, equivalent to `return x.get-iter <Ix>() - y.get-iter <Iy>();`.

If `x.it_ .valueless_by_exception() || y.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

5) Let `Ix` be `x.it_ .index()`, equivalent to `difference_type result = ranges::distance(x.get-iter <Ix>(), x.get-end <Ix>()); for (std::size_t I = Ix + 1, count = sizeof...(Views); I < count; I++) result += ranges::distance(x.get-view <I>()); return -result;`.

Let `Fs` be the pack that consists of all elements of `Views` except the first element, the expression in the `requires` clause is equivalent to `(std::sized_sentinel_for<ranges::sentinel_t<maybe-const <Const, Views>>, ranges::iterator_t<maybe-const <Const, Views>>> && ...) && (ranges::sized_range<maybe-const <Const, Fs>> && ...)`.

If `x.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

6) Equivalent to `return -(x - std::default_sentinel);`.

Let `Fs` be the pack that consists of all elements of `Views` except the first element, the expression in the `requires` clause is equivalent to `(std::sized_sentinel_for<ranges::sentinel_t<maybe-const <Const, Views>>, ranges::iterator_t<maybe-const <Const, Views>>> && ...) && (ranges::sized_range<maybe-const <Const, Fs>> && ...)`.

If `x.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `concat_view::iterator <Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| it, x, y | - | the iterators |
| n | - | a position relative to current location |

### Return value

As described above.

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterator (public member function)
