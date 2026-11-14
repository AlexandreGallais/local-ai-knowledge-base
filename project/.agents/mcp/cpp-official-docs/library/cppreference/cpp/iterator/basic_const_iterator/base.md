# std::basic_const_iterator<Iter>::base

|  |  |  |
| --- | --- | --- |
| `constexpr const Iter& base() const& noexcept;` | (1) | (since C++23) |
| `constexpr Iter base() &&;` | (2) | (since C++23) |

Returns the underlying base iterator.

1) Returns a reference to the underlying iterator.

2) Move constructs the return value from the underlying iterator.

### Parameters

(none)

### Return value

1) A reference to the underlying iterator.

2) An iterator move constructed from the underlying iterator.

### Example

This section is incomplete Reason: no example

### See also

operator*, operator-> accesses the pointed-to element (public member function)
