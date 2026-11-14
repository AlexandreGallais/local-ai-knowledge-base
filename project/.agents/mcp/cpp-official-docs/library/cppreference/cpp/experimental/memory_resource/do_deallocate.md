# std::experimental::pmr::memory_resource::do_deallocate

`virtual void* do_deallocate( void* p, std::size_t bytes, std::size_t alignment ) = 0;` (library fundamentals TS)

Deallocates the storage pointed to by `p`. `p` shall have been returned by a prior call to `allocate(bytes, alignment)` on a `memory_resource` that compares equal to `*this`, and the storage it points to shall not yet have been deallocated.

### Exceptions

Throws nothing.

### See also

deallocate deallocates memory (public member function)
