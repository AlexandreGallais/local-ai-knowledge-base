# std::experimental::pmr::monotonic_buffer_resource::do_is_equal

`virtual bool do_is_equal( const memory_resource& other ) const noexcept;` (library fundamentals TS)

Compare `*this` with `other` for identity - memory allocated using a `monotonic_buffer_resource` can only be deallocated using that same resource.

### Return value

`this == dynamic_cast<const monotonic_buffer_resource*>(&other)`

### See also

do_is_equal [virtual] compare for equality with another `memory_resource` (virtual protected member function of `std::experimental::pmr::memory_resource`)
