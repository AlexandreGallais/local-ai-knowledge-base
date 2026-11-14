# std::experimental::observer_ptr<W>::reset

`constexpr void reset( element_type* p = nullptr ) noexcept;` (library fundamentals TS v2)

Set `*this` to watch the object pointed to by `p`. `get()` returns `p` after the call.

### Parameters

ptr - pointer to a new object to watch

### Example

This section is incomplete Reason: no example

### See also

release returns a pointer to the watched object and stops watching the object (public member function)
