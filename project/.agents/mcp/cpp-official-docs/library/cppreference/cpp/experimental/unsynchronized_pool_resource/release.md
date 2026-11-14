# std::experimental::pmr::unsynchronized_pool_resource::release

`void release();` (library fundamentals TS)

Releases all memory owned by this resource by calling the `deallocate` function of the upstream memory resource as needed.

Memory is released back to the upstream resource even if `deallocate` has not been called for some of the allocated blocks.

### See also

deallocate deallocates memory (public member function of `std::experimental::pmr::memory_resource`)
