# std::experimental::pmr::memory_resource

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `class memory_resource;` | (library fundamentals TS) |

The class `std::experimental::pmr::memory_resource` is an abstract interface to an unbounded set of classes encapsulating memory resources.

### Member functions

|  |  |
| --- | --- |
| (constructor) (implicitly declared) | constructs a new `memory_resource` (public member function) |
| (destructor) [virtual] | destructs a `memory_resource` (virtual public member function) |
| operator= (implicitly declared) | implicitly declared copy assignment operator (public member function) |
| Public member functions |  |
| allocate | allocates memory (public member function) |
| deallocate | deallocates memory (public member function) |
| is_equal | compare for equality with another `memory_resource` (public member function) |
| Protected member functions |  |
| do_allocate [virtual] | allocates memory (virtual protected member function) |
| do_deallocate [virtual] | deallocates memory (virtual protected member function) |
| do_is_equal [virtual] | compare for equality with another `memory_resource` (virtual protected member function) |

### Non-member-functions

operator==, operator!= compare two `memory_resource`s (function)
