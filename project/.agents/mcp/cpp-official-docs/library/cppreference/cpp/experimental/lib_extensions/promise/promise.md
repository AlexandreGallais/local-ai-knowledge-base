# std::experimental::promise<R>::promise (library fundamentals TS)

|  |  |  |
| --- | --- | --- |
| `promise();` | (1) | (library fundamentals TS) |
| `template< class Alloc > promise( std::allocator_arg_t, const Alloc& alloc );` | (2) | (library fundamentals TS) |
| `promise( promise&& other ) noexcept;` | (3) | (library fundamentals TS) |
| `promise( const promise& other ) = delete;` | (4) | (library fundamentals TS) |

Constructs a `std::experimental::promise` object.

1) Default constructor. Constructs the promise with an empty shared state.

2) Constructs the promise with an empty shared state. The shared state is allocated using `alloc`, which is treated as a type-erased allocator (see below).

3) Move constructor. Constructs the promise with the shared state of `other` using move semantics. After construction, `other` has no shared state.

4) `std::experimental::promise` is not copyable.

### Type-erased allocator

The constructors of `promise` taking an allocator argument `alloc` treats that argument as a type-erased allocator. The memory resource pointer used by `promise` to allocate memory is determined using the allocator argument (if specified) as follows:

| Type of `alloc` | Value of the memory resource pointer |
| --- | --- |
| Non-existent (no allocator specified at time of construction) | The value of `std::experimental::pmr::get_default_resource()` at time of construction. |
| `std::nullptr_t` | The value of `std::experimental::pmr::get_default_resource()` at time of construction. |
| A pointer type convertible to `std::experimental::pmr::memory_resource*` | `static_cast<std::experimental::pmr::memory_resource*>(alloc)` |
| A specialization of `std::experimental::pmr::polymorphic_allocator` | `alloc.resource()` |
| Any other type meeting the Allocator requirements | A pointer to a value of type `std::experimental::pmr::resource_adaptor<A>(alloc)`, where `A` is the type of `alloc`. The pointer remains valid only for the lifetime of the `promise` object. |
| None of the above | The program is ill-formed. |

### Parameters

|  |  |  |
| --- | --- | --- |
| alloc | - | allocator to use to allocate the shared state |
| other | - | another `std::experimental::promise` to acquire the state from |

### Exceptions

1,2) (none)
