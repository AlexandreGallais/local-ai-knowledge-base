# iter_swap(ranges::concat_view::*iterator*)

`friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y ) noexcept( /* see description */ ) requires ( /* see description */ );` (since C++26)

Swaps the objects pointed to by the underlying iterators of `x` and `y`. Equivalent to `std::visit ( [&](const auto& it1, const auto& it2) { if constexpr (std::is_same_v<decltype(it1), decltype(it2)>) ranges::iter_swap(it1, it2); else ranges::swap(*x, *y); }, x.it_ , y.it_ );`

The expression in the `requires` clause is equivalent to `std::swappable_with<std::iter_reference_t</*iterator*/>, std::iter_reference_t</*iterator*/>> && (... && std::indirectly_swappable<ranges::iterator_t<maybe-const <Const, Views>>>)`.

If `x.it_ .valueless_by_exception() || y.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `concat_view::``iterator` `<Const>` is an associated class of the arguments.

### Parameters

x, y - iterators

### Exceptions

Let `its` be a pack of lvalues, where each value is of the corresponding type in `const ranges::iterator_t<``maybe-const` `<Const, Views>>`.

`noexcept` specification:

`noexcept(noexcept(ranges::swap(*x, *y)) && ... && noexcept(ranges::iter_swap(its, its)))`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| iter_swap (C++20) | swaps the values referenced by two dereferenceable objects (customization point object) |
| iter_swap | swaps the elements pointed to by two iterators (function template) |
