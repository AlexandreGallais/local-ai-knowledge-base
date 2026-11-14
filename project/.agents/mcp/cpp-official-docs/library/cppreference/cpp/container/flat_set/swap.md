# std::flat_set<Key,Compare,KeyContainer>::swap

`void swap( flat_set& other ) noexcept;` (since C++23)

Exchanges the contents of the container adaptor with those of `other`. Effectively calls

```cpp
ranges::swap(compare, other.compare);
ranges::swap(c, other.c);
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

std::swap(std::flat_set) (C++23) specializes the `std::swap` algorithm (function template)
