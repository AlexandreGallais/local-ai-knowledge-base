# std::ranges::enumerate_view<V>::*iterator*<Const>::operator[]

`constexpr auto operator[]( difference_type n ) const requires ranges::random_access_range<Base>` (since C++23)

Returns an element at specified relative location. Equivalent to: `return reference-type(pos_ + n, current_[n]);`.

### Parameters

n - position relative to current location

### Return value

The element at displacement `n` relative to the current location.

### Example

This section is incomplete Reason: no example

### See also

operator* (C++23) accesses the element (public member function)
