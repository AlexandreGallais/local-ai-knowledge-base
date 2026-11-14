# Experimental library header <experimental/memory_resource>

This header is part of the Library Fundamentals TS (v1, v2, v3).

### Classes

| Defined in namespace `std::experimental::pmr` |  |
| --- | --- |
| memory_resource | an abstract interface for classes that encapsulate memory resources (class) |
| synchronized_pool_resource | a thread-safe `memory_resource` for managing allocations in pools of different block sizes (class) |
| unsynchronized_pool_resource | a thread-unsafe `memory_resource` for managing allocations in pools of different block sizes (class) |
| monotonic_buffer_resource | a special-purpose `memory_resource` that releases the allocated memory only when the resource is destroyed (class) |
| polymorphic_allocator | an allocator that supports run-time polymorphism based on the `memory_resource` it is constructed with (class template) |
| resource_adaptor | adapts an allocator into a `memory_resource` (alias template) |

### Functions

| Defined in namespace `std::experimental::pmr` |  |
| --- | --- |
| Comparison |  |
| operator==, operator!= | compare two `memory_resource`s (function) |
| operator==, operator!= | compares two allocators (function template) |
| Global memory resources |  |
| new_delete_resource | returns a static program-wide `memory_resource` that uses the global `operator new` and `operator delete` to allocate and deallocate memory (function) |
| null_memory_resource | returns a static `memory_resource` that performs no allocation (function) |
| Default memory resource |  |
| get_default_resource | gets the default `memory_resource` (function) |
| set_default_resource | sets the default `memory_resource` (function) |

### Synopsis

```cpp
namespace std {
namespace experimental {
inline namespace fundamentals_v1 {
namespace pmr {

  class memory_resource;

  bool operator==(const memory_resource& a,
                  const memory_resource& b) noexcept;
  bool operator!=(const memory_resource& a,
                  const memory_resource& b) noexcept;

  template <class Tp> class polymorphic_allocator;

  template <class T1, class T2>
  bool operator==(const polymorphic_allocator<T1>& a,
                  const polymorphic_allocator<T2>& b) noexcept;
  template <class T1, class T2>
  bool operator!=(const polymorphic_allocator<T1>& a,
                  const polymorphic_allocator<T2>& b) noexcept;

  // The name resource_adaptor_imp is for exposition only.
  template <class Allocator> class resource_adaptor_imp;

  template <class Allocator>
    using resource_adaptor = resource_adaptor_imp<
      typename allocator_traits<Allocator>::template rebind_alloc<char>>;

  // Global memory resources
  memory_resource* new_delete_resource() noexcept;
  memory_resource* null_memory_resource() noexcept;

  // The default memory resource
  memory_resource* set_default_resource(memory_resource* r) noexcept;
  memory_resource* get_default_resource() noexcept;

  // Standard memory resources
  struct pool_options;
  class synchronized_pool_resource;
  class unsynchronized_pool_resource;
  class monotonic_buffer_resource;

} // namespace pmr
} // namespace fundamentals_v1
} // namespace experimental
} // namespace std
```
