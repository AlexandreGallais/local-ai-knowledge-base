# std::experimental::propagate_const<T>::operator bool

`constexpr explicit operator bool() const;` (library fundamentals TS v2)

Checks whether the wrapped pointer-like object, `t_`, is null.

### Parameters

(none)

### Return value

`true` if the wrapped object is not null, otherwise `false`. Equivalent to `(bool)t_`.

### Example

This section is incomplete Reason: no example

### See also

get returns a pointer to the object pointed to by the wrapped pointer (public member function)
