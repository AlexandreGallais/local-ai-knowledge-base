# std::experimental::latch

| Defined in header `<experimental/latch>` |  |
| --- | --- |
| `class latch;` | (concurrency TS) |

The `latch` class is a downward counter of type `ptrdiff_t` which can be used to synchronize threads. The value of the counter is initialized on creation. Threads may block on the latch until the counter is decremented to zero. There is no possibility to increase or reset the counter, which makes the latch a single-use barrier.

Unlike `std::experimental::barrier`, `std::experimental::latch` can be decremented by a participating thread more than once.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `latch` (public member function) |
| (destructor) | destroys the latch (public member function) |
| operator= [deleted] | not copy-assignable (public member function) |
| count_down_and_wait | decrements the counter by `1` and blocks until it reaches zero (public member function) |
| count_down | decrements the counter in a non-blocking manner (public member function) |
| is_ready | tests if the internal counter equals zero (public member function) |
| wait | blocks until the counter reaches zero (public member function) |
