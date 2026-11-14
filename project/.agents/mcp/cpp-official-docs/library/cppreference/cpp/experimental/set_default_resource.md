# std::experimental::pmr::set_default_resource

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `memory_resource* set_default_resource( memory_resource* r ) noexcept;` | (library fundamentals TS) |

If `r` is not null, sets the default memory resource pointer to `r`; otherwise, sets the default memory resource pointer to `new_delete_resource()`.

The *default memory resource pointer* is used by certain facilities when an explicit memory resource is not supplied. The initial default memory resource pointer is the return value of `new_delete_resource()`.

This function is thread-safe. Every call to `set_default_resource` *synchronizes with* (see `std::memory_order`) the subsequent `set_default_resource` and `get_default_resource` calls.

### Return value

Returns the previous value of the default memory resource pointer.

### See also

|  |  |
| --- | --- |
| get_default_resource | gets the default `memory_resource` (function) |
| new_delete_resource | returns a static program-wide `memory_resource` that uses the global `operator new` and `operator delete` to allocate and deallocate memory (function) |
