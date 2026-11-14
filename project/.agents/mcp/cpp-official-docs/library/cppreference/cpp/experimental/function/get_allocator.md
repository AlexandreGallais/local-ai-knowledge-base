# std::experimental::function<R(Args...)>::get_allocator

`std::pmr::polymorphic_allocator<> get_allocator() const noexcept;` (library fundamentals TS v3)

Returns the `std::pmr::polymorphic_allocator<>` stored at the construction of `function` object. If no allocator was explicitly specified, the stored allocator is equal to the source allocator in move construction, or is default-constructed otherwise.

### Parameters

(none)

### Return value

The `std::pmr::polymorphic_allocator<>` stored at the construction of `function` object.

### See also

get_memory_resource (removed in library fundamentals TS v3) retrieves a pointer to the memory resource used by this object to allocate memory (public member function)
