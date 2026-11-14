# std::ranges::join_view<V>::*iterator*<Const>::operator*,->

|  |  |  |
| --- | --- | --- |
| `constexpr decltype(auto) operator*() const;` | (1) | (since C++20) |
| `constexpr InnerIter operator->() const requires /*has-arrow*/<InnerIter> && std::copyable<InnerIter>;` | (2) | (since C++20) |

Returns the element the underlying iterator `inner_` points to.

1) Equivalent to `return *inner_;`.

2) Equivalent to `return inner_;`.

### Parameters

(none)

### Return value

The current element.

### Example

This section is incomplete Reason: no example
