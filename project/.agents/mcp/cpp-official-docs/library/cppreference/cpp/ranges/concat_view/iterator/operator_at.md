# std::ranges::concat_view<Views...>::*iterator*<Const>::operator[]

`constexpr decltype(auto) operator[]( difference_type pos ) const requires /*concat-is-random-access*/<Const, Views...>;` (since C++26)

Returns a reference to an element at specified relative location.

### Parameters

pos - position relative to current location

### Return value

`*((*this) + pos)`

### Example

This section is incomplete Reason: no example

### See also

operator* (C++26) accesses the element (public member function)
