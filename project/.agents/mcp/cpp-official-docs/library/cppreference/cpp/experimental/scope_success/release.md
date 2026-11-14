# std::experimental::scope_success<EF>::release

`void release() noexcept;` (library fundamentals TS v3)

Makes the `scope_success` inactive.

Once a `scope_success` is inactive, it cannot become active again, and will not call its exit function on destruction.

### Parameters

(none)

### Return value

(none)

### Notes

`release` may be either manually called or automatically called by `scope_success`'s move constructor.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| (constructor) | constructs a new `scope_success` (public member function) |
| (destructor) | calls the exit function when the scope is exited normally if the `scope_success` is active, then destroys the `scope_success` (public member function) |
