# std::experimental::pmr::pool_options

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| `struct pool_options { std::size_t max_blocks_per_chunk = 0; std::size_t largest_required_pool_block = 0; };` | (library fundamentals TS) |

The struct `std::experimental::pmr::pool_options` contains a set of constructor options for `std::experimental::pmr::synchronized_pool_resource` and `std::experimental::pmr::unsynchronized_pool_resource`.

### Data members

|  |  |
| --- | --- |
| std::size_t max_blocks_per_chunk | the maximum number of blocks that will be allocated at once from the upstream memory resource to replenish a pool (public member object) |
| std::size_t largest_required_pool_block | the largest allocation size that is required to be fulfilled through the pooling mechanism (public member object) |

If the value of `max_blocks_per_chunk` is zero or greater than an implementation-defined limit, that limit is used instead. The implementation may use a smaller value than is specified and may use different values for different pools.

If the value of `largest_required_pool_block` is zero or greater than an implementation-defined limit, that limit is used instead. The implementation may use a threshold greater than specified in this field.

### See also

|  |  |
| --- | --- |
| synchronized_pool_resource | a thread-safe `memory_resource` for managing allocations in pools of different block sizes (class) |
| unsynchronized_pool_resource | a thread-unsafe `memory_resource` for managing allocations in pools of different block sizes (class) |
