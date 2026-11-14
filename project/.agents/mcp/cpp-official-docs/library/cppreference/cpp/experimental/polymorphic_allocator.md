# std::experimental::pmr::polymorphic_allocator

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `template< class T > class polymorphic_allocator;` | (library fundamentals TS) |

The class template `std::experimental::pmr::polymorphic_allocator` is an Allocator whose allocation behavior depends on the memory resource it is constructed with. Thus, different instances of `polymorphic_allocator` can exhibit entirely different allocation behavior. This runtime polymorphism allows objects using `polymorphic_allocator` to behave as if they used different allocator types at run time despite the identical static allocator type.

### Member types

| Member type | definition |
| --- | --- |
| `value_type` | `T` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `polymorphic_allocator` (public member function) |
| (destructor) (implicitly declared) | implicitly declared destructor (public member function) |
| operator= | copy assignment operator (public member function) |
| Public member functions |  |
| allocate | allocate memory (public member function) |
| deallocate | deallocate memory (public member function) |
| construct | constructs an object in allocated storage (public member function) |
| destroy | destroys an object in allocated storage (public member function) |
| select_on_container_copy_construction | create a new `polymorphic_allocator` for use by a container's copy constructor (public member function) |
| resource | returns a pointer to the underlying memory resource (public member function) |

### Non-member functions

operator==, operator!= compare two `polymorphic_allocator`s (function)
