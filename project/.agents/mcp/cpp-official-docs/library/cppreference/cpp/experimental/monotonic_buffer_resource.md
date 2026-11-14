# std::experimental::pmr::monotonic_buffer_resource

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `class monotonic_buffer_resource : public memory_resource;` | (library fundamentals TS) |

The class `std::experimental::pmr::monotonic_buffer_resource` is a special-purpose memory resource class that releases the allocated memory only when the resource is destroyed. It is intended for very fast memory allocations in situations where memory is used to build up a few objects and then is released all at once.

`monotonic_buffer_resource` can be constructed with an initial buffer. If there is no initial buffer, or if the buffer is exhausted, additional buffers are obtained from an *upstream memory resource* supplied at construction. The size of buffers obtained follows a geometric progression.

`monotonic_buffer_resource` is not thread-safe.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `monotonic_buffer_resource` (public member function) |
| (destructor) [virtual] | destroys a `monotonic_buffer_resource`, releasing all allocated memory (virtual public member function) |
| operator= [deleted] | copy assignment operator is deleted. `monotonic_buffer_resource` is not copy assignable (public member function) |
| Public member functions |  |
| release | release all allocated memory (public member function) |
| upstream_resource | returns a pointer to the upstream memory resource (public member function) |
| Protected member functions |  |
| do_allocate [virtual] | allocate memory (virtual protected member function) |
| do_deallocate [virtual] | no-op (virtual protected member function) |
| do_is_equal [virtual] | compare for equality with another `memory_resource` (virtual protected member function) |
