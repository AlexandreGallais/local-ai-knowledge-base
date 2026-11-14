# std::experimental::pmr::memory_resource::allocate

`void* allocate( std::size_t bytes, std::size_t alignment = alignof(std::max_align_t) );` (library fundamentals TS)

Allocates storage with a size of at least `bytes` bytes. The returned storage is aligned to the specified `alignment` if such alignment is supported, and to `alignof(std::max_align_t)` otherwise.

Equivalent to `return do_allocate(bytes, alignment);`.

### Exceptions

Throws an exception if storage of the requested size and alignment cannot be obtained.

### See also

do_allocate [virtual] allocates memory (virtual protected member function)
