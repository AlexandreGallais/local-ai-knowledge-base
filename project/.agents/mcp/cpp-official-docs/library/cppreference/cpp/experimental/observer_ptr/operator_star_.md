# std::experimental::observer_ptr<W>::operator*, std::experimental::observer_ptr<W>::operator->

|  |  |  |
| --- | --- | --- |
| `constexpr std::add_lvalue_reference_t<element_type> operator*() const;` | (1) | (library fundamentals TS v2) |
| `constexpr element_type* operator->() const noexcept;` | (2) | (library fundamentals TS v2) |

`operator*` and `operator->` provide access to the object watched by `*this`.

The behavior of `operator*` is undefined if `get() == nullptr`.

### Parameters

(none)

### Return value

1) Returns the object watched by `*this`, equivalent to `*get()`.

2) Returns a pointer to the object watched by `*this`, i.e. `get()`.

### Exceptions

1) Throws nothing.

### Example

This section is incomplete Reason: no example

### See also

get returns a pointer to the watched object (public member function)
