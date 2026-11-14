# std::experimental::pmr::polymorphic_allocator<T>::polymorphic_allocator

|  |  |
| --- | --- |
| `polymorphic_allocator() noexcept;` | (1) |
| `polymorphic_allocator( const polymorphic_allocator& other ) noexcept = default;` | (2) |
| `template< class U > polymorphic_allocator( const polymorphic_allocator<U>& other ) noexcept;` | (3) |
| `polymorphic_allocator( memory_resource* r );` | (4) |

Constructs a new `polymorphic_allocator`.

1) Constructs a `polymorphic_allocator` using the return value of `std::experimental::pmr::get_default_resource()` as the underlying memory resource.

2,3) Constructs a `polymorphic_allocator` using `other.resource()` as the underlying memory resource.

4) Constructs a `polymorphic_allocator` using `r` as the underlying memory resource. This constructor provides an implicit conversion from `memory_resource*`.

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another `polymorphic_allocator` to copy from |
| r | - | pointer to the memory resource to use. May not be null |

### Exceptions

4) Throws nothing.
