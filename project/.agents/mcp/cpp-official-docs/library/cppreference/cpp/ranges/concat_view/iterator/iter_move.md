# iter_move(ranges::concat_view::*iterator*)

`friend constexpr decltype(auto) iter_move( const /*iterator*/& it ) noexcept(/* see description */);` (since C++26)

Returns the result of applying `ranges::iter_move` to the underlying iterator contained in `it_` .

Let `Ref` be `concat-rvalue-reference-t` `<``maybe-const` `<Const, Views>...>`. Equivalent to `return std::visit([](const auto& i) -> Ref { return ranges::iter_move(i); }, it.it_ );`.

If `it.it_.valueless_by_exception()` is `true`, the behavior is undefined.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `concat_view::``iterator` `<Const>` is an associated class of the arguments.

### Parameters

it - iterator

### Return value

The result of applying `ranges::iter_move` to the underlying iterator.

### Exceptions

`noexcept` specification:

`noexcept( ((std::is_nothrow_invocable_v <decltype(ranges::iter_move), const ranges::iterator_t</*maybe-const*/<Const, Views>>&> && std::is_nothrow_convertible_v<ranges::range_rvalue_reference_t </*maybe-const*/<Const, Views>>, Ref>) && ...) )`
