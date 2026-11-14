# std::experimental::pmr::get_default_resource

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `memory_resource* get_default_resource() noexcept;` | (library fundamentals TS) |

Gets the default memory resource pointer.

The *default memory resource pointer* is used by certain facilities when an explicit memory resource is not supplied. The initial default memory resource pointer is the return value of `new_delete_resource()`.

This function is thread-safe. Previous call to `set_default_resource` *synchronizes with* (see `std::memory_order`) the subsequent `get_default_resource` calls.

### Return value

Returns the value of the default memory resource pointer.

### See also

|  |  |
| --- | --- |
| set_default_resource | sets the default `memory_resource` (function) |
| new_delete_resource | returns a static program-wide `memory_resource` that uses the global `operator new` and `operator delete` to allocate and deallocate memory (function) |
