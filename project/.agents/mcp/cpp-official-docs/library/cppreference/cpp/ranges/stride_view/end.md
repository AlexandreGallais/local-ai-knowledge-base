# std::ranges::stride_view<V>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end() requires (!/*simple-view*/<V>);` | (1) | (since C++23) |
| `constexpr auto end() const requires ranges::range<const V>` | (2) | (since C++23) |

Returns an iterator or a sentinel representing the end of the `stride_view`.

Let `base_` and `stride_` be the underlying data members.

1) Let `Const` be defined as `using Const = false;` and `Base` as `using Base = V;`.

2) Let `Const` be defined as `using Const = true;` and `Base` as `using Base = const V;`.

Equivalent to:

```cpp
if constexpr (ranges::common_range<Base> &&
              ranges::sized_range<Base> &&
              ranges::forward_range<Base>)
{
    auto missing = (stride_ - ranges::distance(base_) % stride_) % stride_;
    return iterator<Const>(this, ranges::end(base_), missing);
}
else if constexpr (ranges::common_range<Base> &&
                   !ranges::bidirectional_range<Base>)
{
    return iterator<Const>(this, ranges::end(base_));
}
else
{
    return std::default_sentinel;
}
```

### Parameters

(none)

### Return value

An iterator to the element following the last element, if the underlying view `V` models `common_range`. Otherwise, the `std::default_sentinel` which compares equal to the end iterator.

### Notes

`stride_view<V>` models `common_range` whenever the underlying view `V` does.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
