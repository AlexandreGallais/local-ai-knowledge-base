# std::allocator_traits<Alloc>::select_on_container_copy_construction

| Defined in header `<memory>` |  |
| --- | --- |
| `static Alloc select_on_container_copy_construction( const Alloc& a );` | (since C++11) (constexpr since C++20) |

If possible, obtains the copy-constructed version of the allocator `a`, by calling `a.select_on_container_copy_construction()`. If the above is not possible (e.g. `Alloc` does not have the member function `select_on_container_copy_construction()`), then returns `a`, unmodified.

This function is called by the copy constructors of all standard library containers. It allows the allocator used by the constructor's argument to become aware that the container is being copied and modify state if necessary.

### Parameters

a - allocator used by a standard container passed as an argument to a container copy constructor

### Return value

The allocator to use by the copy-constructed standard containers.

### See also

select_on_container_copy_construction copies the state of `scoped_allocator_adaptor` and all its allocators (public member function of `std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>`)
