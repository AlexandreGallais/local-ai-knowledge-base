# std::experimental::latch::latch

|  |  |  |
| --- | --- | --- |
| `explicit latch( ptrdiff_t value );` | (1) | (concurrency TS) |
| `latch( const latch & ) = delete;` | (2) | (concurrency TS) |

1) Constructs a `latch` and initializes its internal counter.

2) Copy constructor is deleted. `latch` is not copyable.

### Parameters

value - the initial value of the internal counter; must be non-negative
