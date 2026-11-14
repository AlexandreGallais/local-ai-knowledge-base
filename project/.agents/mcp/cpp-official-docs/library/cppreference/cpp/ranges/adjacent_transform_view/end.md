# std::ranges::adjacent_transform_view<V,F,N>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end();` | (1) | (since C++23) |
| `constexpr auto end() const requires ranges::range<const InnerView> && std::regular_invocable<const F&, /*REPEAT*/(ranges::range_reference_t<const V>, N)...>;` | (2) | (since C++23) |

Returns an iterator or a sentinel representing the end of the `adjacent_transform_view`.

Let `inner_` be the underlying `ranges::adjacent_view`.

1) Equivalent to:

```cpp
if constexpr (ranges::common_range<InnerView>)
    return /*iterator*/<false>(*this, inner_.end());
else
    return /*sentinel*/<false>(inner_.end());
```

2) Equivalent to:

```cpp
if constexpr (ranges::common_range<const InnerView>)
    return /*iterator*/<true>(*this, inner_.end());
else
    return /*sentinel*/<true>(inner_.end());
```

### Parameters

(none)

### Return value

An iterator to the element following the last element, if the underlying view `V` models `common_range`. Otherwise, a sentinel which compares equal to the end iterator.

### Notes

`adjacent_transform_view<V,F,N>` models `common_range` whenever the underlying view `V` does.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
