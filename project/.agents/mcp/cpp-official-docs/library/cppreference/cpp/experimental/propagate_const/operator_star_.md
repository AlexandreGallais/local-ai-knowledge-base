# std::experimental::propagate_const<T>::operator*, std::experimental::propagate_const<T>::operator->

|  |  |  |
| --- | --- | --- |
| `constexpr element_type& operator*();` | (1) | (library fundamentals TS v2) |
| `constexpr const element_type& operator*() const;` | (2) | (library fundamentals TS v2) |
| `constexpr element_type* operator->();` | (3) | (library fundamentals TS v2) |
| `constexpr const element_type* operator->() const;` | (4) | (library fundamentals TS v2) |

Provides access to the object pointed to by the pointer-like object `*this` wraps.

The behavior of these functions is undefined if `get() == nullptr`.

### Parameters

(none)

### Return value

1,2) The object pointed to by the wrapped pointer-like object, i.e., `*get()`.

3,4) A pointer to the object pointed to by the wrapped pointer-like object, i.e., `get()`.

### Example

This section is incomplete Reason: no example

### See also

get returns a pointer to the object pointed to by the wrapped pointer (public member function)
