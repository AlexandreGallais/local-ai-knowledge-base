# std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>:: select_on_container_copy_construction

| Defined in header `<scoped_allocator>` |  |
| --- | --- |
| `scoped_allocator_adaptor select_on_container_copy_construction() const;` | (since C++11) |

Creates a new instance of `std::scoped_allocator_adaptor`, where the outer allocator base class and each inner allocator subobject are obtained by calling `std::allocator_traits<A>::select_on_container_copy_construction()`.

### Parameters

(none)

### Return value

A new `std::scoped_allocator_adaptor` object, constructed from correctly copied allocators.

### See also

select_on_container_copy_construction [static] obtains the allocator to use after copying a standard container (public static member function of `std::allocator_traits<Alloc>`)
