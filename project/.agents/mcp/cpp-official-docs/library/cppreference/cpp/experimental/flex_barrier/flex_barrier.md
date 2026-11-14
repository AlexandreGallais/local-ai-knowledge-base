# std::experimental::flex_barrier::flex_barrier

|  |  |  |
| --- | --- | --- |
| `explicit flex_barrier( std::ptrdiff_t num_threads );` | (1) | (concurrency TS) |
| `template< class F > flex_barrier( std::ptrdiff_t num_threads, F completion );` | (2) | (concurrency TS) |
| `flex_barrier( const flex_barrier & ) = delete;` | (3) | (concurrency TS) |

1) Has the same effect as `flex_barrier(num_threads, c)`, where `c` is a Callable object whose invocation returns -1 and has no side effects.

2) Constructs a `flex_barrier` for `num_threads` participating threads, using `completion` for the completion phase. The set of participating threads is the first `num_threads` threads to arrive at the synchronization point.

3) Copy constructor is deleted; `flex_barrier` is not copyable.

### Parameters

|  |  |  |
| --- | --- | --- |
| num_threads | - | the number of participating threads for the `flex_barrier`; must be non-negative |
| completion | - | a function object controlling the completion phase; must be Callable with no arguments and return type `std::ptrdiff_t`, and when invoked, must return a value no less than -1 and must not throw an exception |
| Type requirements |  |  |
| - `F` must meet the requirements of CopyConstructible. |  |  |

### Notes

If `num_threads` is zero, the set of participating threads is empty, and flex_barrier can only be destroyed.
