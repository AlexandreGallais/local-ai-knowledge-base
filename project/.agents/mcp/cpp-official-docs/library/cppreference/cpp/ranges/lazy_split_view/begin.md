# std::ranges::lazy_split_view<V,Pattern>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin();` | (1) | (since C++20) |
| `constexpr auto begin() const requires ranges::forward_range<V> && ranges::forward_range<const V>;` | (2) | (since C++20) |

Returns an `outer_iterator` to the first element of the `lazy_split_view`.

Let `base_` be the underlying view and `current_` be the underlying caching object (may not be present).

1) Equivalent to

```cpp
constexpr auto begin()
{
    if constexpr (ranges::forward_range<V>)
        return /*outer_iterator*/</*simple_view*/<V>>{*this, ranges::begin(base_)};
    else
    {
        current_ = ranges::begin(base_);
        return /*outer_iterator*/<false>{*this};
    }
}
```

2) Equivalent to `return /*outer_iterator*/<true>{*this, ranges::begin(base_)};`.

### Return value

`outer_iterator` to the first element.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
