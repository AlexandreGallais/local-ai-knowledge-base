# std::experimental::pmr::synchronized_pool_resource::synchronized_pool_resource

|  |  |  |
| --- | --- | --- |
| `synchronized_pool_resource();` | (1) | (library fundamentals TS) |
| `explicit synchronized_pool_resource( memory_resource* upstream );` | (2) | (library fundamentals TS) |
| `explicit synchronized_pool_resource( const pool_options& opts );` | (3) | (library fundamentals TS) |
| `synchronized_pool_resource( const pool_options& opts, memory_resource* upstream );` | (4) | (library fundamentals TS) |
| `synchronized_pool_resource( const synchronized_pool_resource& ) = delete;` | (5) | (library fundamentals TS) |

Constructs a `synchronized_pool_resource`.

1-4) Constructs a `synchronized_pool_resource` using the specified upstream memory resource and tuned according to the specified options. The resulting object holds a copy of `upstream` but does not own the resource to which `upstream` points. The overloads not taking `opts` as a parameter uses a default constructed instance of `pool_options` as the options. The overloads not taking `upstream` as a parameter uses the return value of `std::experimental::pmr::get_default_resource()` as the upstream memory resource.

5) Copy constructor is deleted.

### Parameters

|  |  |  |
| --- | --- | --- |
| opts | - | a `pool_options` struct containing the constructor options |
| upstream | - | the upstream memory resource to use |

### Exceptions

1-4) Throws only if a call to the `allocate()` function of the upstream resource throws. It is unspecified if or under what conditions such a call takes place.
