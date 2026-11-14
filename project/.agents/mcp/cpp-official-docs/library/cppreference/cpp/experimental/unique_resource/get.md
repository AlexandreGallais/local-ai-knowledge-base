# std::experimental::unique_resource<R, D>::get

`const R& get() const noexcept;` (library fundamentals TS v3)

Accesses the underlying resource handle.

### Parameters

(none)

### Return value

The underlying resource handle.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator*, operator-> | accesses the pointee if the resource handle is a pointer (public member function) |
| get | returns a pointer to the managed object (public member function of `std::unique_ptr<T,Deleter>`) |
