# std::experimental::shared_ptr<T>::operator*, std::experimental::shared_ptr<T>::operator->

|  |  |  |
| --- | --- | --- |
| `T& operator*() const noexcept;` | (1) | (library fundamentals TS) |
| `T* operator->() const noexcept;` | (2) | (library fundamentals TS) |

Dereferences the stored pointer. The behavior is undefined if the stored pointer is null.

### Parameters

(none)

### Return value

1) The result of dereferencing the stored pointer, i.e., `*get()`.

2) The stored pointer, i.e., `get()`.

### Remarks

When `T` is an array type or (possibly cv-qualified) `void`, it is unspecified whether function (1) is declared.

When `T` is an array type, it is unspecified whether function (2) is declared.

In either case, if the function is declared, it is unspecified what its return type is, except that the declaration (although not necessarily the definition) of the function is guaranteed to be legal.

### Example

This section is incomplete Reason: no example

### See also

get returns the stored pointer (public member function)
