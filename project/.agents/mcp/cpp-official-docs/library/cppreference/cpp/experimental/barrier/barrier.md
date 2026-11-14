# std::experimental::barrier::barrier

|  |  |  |
| --- | --- | --- |
| `explicit barrier( std::ptrdiff_t num_threads );` | (1) | (concurrency TS) |
| `barrier( const barrier & ) = delete;` | (2) | (concurrency TS) |

1) Constructs a `barrier` for `num_threads` participating threads. The set of participating threads is the first `num_threads` threads to arrive at the synchronization point.

2) Copy constructor is deleted; `barrier` is not copyable.

### Parameters

num_threads - the number of participating threads for the barrier; must be non-negative

### Notes

If `num_threads` is zero, the set of participating threads is empty, and barrier can only be destroyed.
