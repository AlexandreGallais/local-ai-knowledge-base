# std::experimental::pmr::unsynchronized_pool_resource::do_is_equal

`virtual bool do_is_equal( const memory_resource& other ) const noexcept;` (library fundamentals TS)

Compare `*this` with `other` for identity - memory allocated using an `unsynchronized_pool_resource` can only be deallocated using that same resource.

### Return value

`this == dynamic_cast<const unsynchronized_pool_resource*>(&other)`

### See also

do_is_equal [virtual] compare for equality with another `memory_resource` (virtual protected member function of `std::experimental::pmr::memory_resource`)
