# std::experimental::pmr::polymorphic_allocator<T>::select_on_container_copy_construction

`polymorphic_allocator select_on_container_copy_construction() const;` (library fundamentals TS)

Returns a default-constructed `polymorphic_allocator` object.

### Parameters

(none)

### Return value

A default-constructed `polymorphic_allocator` object.

### Notes

`polymorphic_allocator`s do not propagate on container copy construction.

### See also

select_on_container_copy_construction [static] obtains the allocator to use after copying a standard container (public static member function of `std::allocator_traits<Alloc>`)
