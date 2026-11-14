# std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>::allocate

| Defined in header `<scoped_allocator>` |  |  |
| --- | --- | --- |
| `pointer allocate( size_type n );` | (1) | (since C++11) |
| `pointer allocate( size_type n, const_void_pointer hint );` | (2) | (since C++11) |

Uses the outer allocator to allocate uninitialized storage.

1) Calls `std::allocator_traits<OuterAlloc>::allocate(outer_allocator(), n)`.

2) Additionally provides memory locality hint, by calling `std::allocator_traits<OuterAlloc>::allocate(outer_allocator(), n, hint)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| n | - | the number of objects to allocate storage for |
| hint | - | pointer to a nearby memory location |

### Return value

The pointer to the allocated storage.

### See also

|  |  |
| --- | --- |
| allocate | allocates uninitialized storage (public member function of `std::allocator<T>`) |
| allocate [static] | allocates uninitialized storage using the allocator (public static member function of `std::allocator_traits<Alloc>`) |
