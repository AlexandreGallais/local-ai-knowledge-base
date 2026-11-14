# std::experimental::propagate_const<T>::get

|  |  |
| --- | --- |
| `constexpr element_type* get();` | (library fundamentals TS v2) |
| `constexpr const element_type* get() const;` | (library fundamentals TS v2) |

Returns a pointer to the object pointed to by the wrapped pointer-like object, `t_`.

### Parameters

(none)

### Return value

If `T` is an object pointer type, then `t_`. Otherwise, `t_.get()`.

### Example

This section is incomplete Reason: no example
