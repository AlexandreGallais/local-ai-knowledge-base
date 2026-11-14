# std::experimental::shared_ptr<T>::get

`element_type* get() const noexcept;` (library fundamentals TS)

Returns the stored pointer.

### Parameters

(none)

### Return value

The stored pointer.

### Notes

A `shared_ptr` may share ownership of an object while storing a pointer to another object. `get()` returns the stored pointer, not the managed pointer.

### Example

This section is incomplete Reason: no example

### See also

operator*, operator-> dereferences the stored pointer (public member function)
