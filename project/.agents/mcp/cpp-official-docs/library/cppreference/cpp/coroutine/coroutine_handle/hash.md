# std::hash<std::coroutine_handle>

| Defined in header `<coroutine>` |  |
| --- | --- |
| `template< class Promise > struct hash<std::coroutine_handle<Promise>>;` | (since C++20) |

The template specialization of `std::hash` for `std::coroutine_handle` allows users to obtain hashes of objects of type `std::coroutine_handle<P>`.

`operator()` of the specialization is noexcept.

### Example

This section is incomplete Reason: no example

### See also

hash (C++11) hash function object (class template)
