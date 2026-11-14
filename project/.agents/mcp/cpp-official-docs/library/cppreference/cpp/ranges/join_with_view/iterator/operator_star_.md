# std::ranges::join_with_view<V,Pattern>::*iterator*<Const>::operator*

`constexpr decltype(auto) operator*() const;` (since C++23)

Returns the current element in the joined view.

### Return value

`std::visit([](auto& it) -> /*reference*/ { return *it; }, inner_it_ )`, where `/*reference*/` is `ranges::common_reference_t<std::iter_reference_t<``InnerIter` `>,` `std::iter_reference_t<``PatternIter` `>>`.

### Example

This section is incomplete Reason: no example
