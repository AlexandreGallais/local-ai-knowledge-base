# std::experimental::pmr::polymorphic_allocator<T>::destroy

`template< class U > void destroy( U* p );` (library fundamentals TS)

Destroys the object pointed to by `p`, as if by calling `p->~U()`.

### Parameters

p - pointer to the object being destroyed

### See also

destroy [static] destructs an object stored in the allocated storage (function template)
