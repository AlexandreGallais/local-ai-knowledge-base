# std::experimental::pmr::unsynchronized_pool_resource::do_deallocate

`virtual void do_deallocate( void* p, std::size_t bytes, std::size_t alignment );` (library fundamentals TS)

Returns the memory at `p` to the pool. It is unspecified if or under what circumstances this operation will result in a call to `deallocate()` on the upstream memory resource.

### Exceptions

Throws nothing.

### See also

|  |  |
| --- | --- |
| deallocate | deallocates memory (public member function of `std::experimental::pmr::memory_resource`) |
| do_deallocate [virtual] | deallocates memory (virtual protected member function of `std::experimental::pmr::memory_resource`) |
