# std::experimental::unique_resource<R, D>::release

`void release() noexcept;` (library fundamentals TS v3)

Releases the ownership of the managed resource if any. The destructor will not execute the deleter after the call, unless `reset` is called later for managing new resource.

Unlike `std::unique_ptr::release`, this function is not required to modify the stored resource handle.

### Parameters

(none)

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

release returns a pointer to the managed object and releases the ownership (public member function of `std::unique_ptr<T,Deleter>`)
