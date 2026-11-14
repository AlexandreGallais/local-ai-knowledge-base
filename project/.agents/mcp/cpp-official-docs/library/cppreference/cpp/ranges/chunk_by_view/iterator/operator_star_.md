# std::ranges::chunk_by_view<V,Pred>::*iterator*::operator*

`constexpr value_type operator*() const;` (since C++23)

Returns the current element in the `chunk_by_view`.

Equivalent to: `return ranges::subrange(current_, next_)`.

Before the call to this operator `current_` must not be equal to `next_`, otherwise the behavior is undefined.

### Parameters

(none)

### Return value

The current element.

### Example

This section is incomplete Reason: no example
