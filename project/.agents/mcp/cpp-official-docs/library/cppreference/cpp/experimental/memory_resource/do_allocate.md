# std::experimental::pmr::memory_resource::do_allocate

`virtual void* do_allocate( std::size_t bytes, std::size_t alignment ) = 0;` (library fundamentals TS)

Allocates storage with a size of at least `bytes` bytes. The returned storage is aligned to the specified `alignment` if such alignment is supported, and to `alignof(std::max_align_t)` otherwise.

`alignment` shall be a power of two.

### Exceptions

Throws an exception if storage of the requested size and alignment cannot be obtained.

### See also

allocate allocates memory (public member function)
