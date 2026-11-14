# std::experimental::scope_exit<EF>::release

`void release() noexcept;` (library fundamentals TS v3)

Makes the `scope_exit` inactive.

Once a `scope_exit` is inactive, it cannot become active again, and will not call its exit function on destruction.

### Parameters

(none)

### Return value

(none)

### Notes

`release` may be either manually called or automatically called by `scope_exit`'s move constructor.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| (constructor) | constructs a new `scope_exit` (public member function) |
| (destructor) | calls the exit function when the scope is exited if the `scope_exit` is active, then destroys the `scope_exit` (public member function) |
