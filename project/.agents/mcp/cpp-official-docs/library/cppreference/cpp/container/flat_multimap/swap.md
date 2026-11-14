# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::swap

`void swap( flat_multimap& other ) noexcept;` (since C++23)

Exchanges the contents of the container adaptor with those of `other`. Effectively calls

```cpp
ranges::swap(compare, other.compare);
ranges::swap(c.keys, other.c.keys);
ranges::swap(c.values, other.c.values);
```

### Parameters

other - container adaptor to exchange the contents with

### Return value

(none)

### Exceptions

(none)

### Complexity

Same as underlying container (typically constant).

### Example

This section is incomplete Reason: no example

### See also

std::swap(std::flat_multimap) (C++23) specializes the `std::swap` algorithm (function template)
