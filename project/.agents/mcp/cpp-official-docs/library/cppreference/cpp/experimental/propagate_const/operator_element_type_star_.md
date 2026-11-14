# std::experimental::propagate_const<T>::operator element_type*, std::experimental::propagate_const<T>::operator const element_type*

|  |  |  |
| --- | --- | --- |
| `constexpr operator element_type*();` | (1) | (library fundamentals TS v2) |
| `constexpr operator const element_type*() const;` | (2) | (library fundamentals TS v2) |

Provides implicit conversions to `element_type*` and `const element_type*`.

1) This function does not participate in overload resolution unless `T` is an object pointer type or is implicitly convertible to `element_type*`.

2) This function does not participate in overload resolution unless `T` is an object pointer type or is implicitly convertible to `const element_type*`.

### Parameters

(none)

### Return value

A pointer to the object pointed to by the wrapped pointer-like object, i.e., `this->get()`.

### Example

This section is incomplete Reason: no example

### See also

get returns a pointer to the object pointed to by the wrapped pointer (public member function)
