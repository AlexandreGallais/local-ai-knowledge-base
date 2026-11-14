# std::experimental::flex_barrier

| Defined in header `<experimental/barrier>` |  |
| --- | --- |
| `class flex_barrier;` | (concurrency TS) |

The class `std::experimental::flex_barrier` provides a thread-coordination mechanism that allows a set of participating threads to block until an operation is completed. Unlike `std::experimental::latch`, barriers are reusable; once the participating threads are released from a barrier's synchronization point, they can reuse the same barrier.

A barrier has a completion phase, which is executed by one of the participating threads once all threads in the set of participating threads arrive at the synchronization point. The `arrive_and_wait` and `arrive_and_drop` calls synchronize with the start of the completion phase; the end of the completion phase synchronizes with the returns from all calls blocked by its completion.

`std::experimental::flex_barrier` allows the user to control the completion phase with a function object. If the function object returns -1, the set of participating threads is unchanged (and the same set of participating threads must arrive at the synchronization point in the next cycle); otherwise the set of participating threads becomes a new set with a size equal to the returned value `N`, and consists of the next `N` threads to arrive at the barrier's synchronization point.

Users who do not need this functionality can use `std::experimental::barrier`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `flex_barrier` (public member function) |
| (destructor) | destroys the `flex_barrier` (public member function) |
| operator= [deleted] | not copy-assignable (public member function) |
| arrive_and_wait | arrive at the synchronization point and block (public member function) |
| arrive_and_drop | arrive at the synchronization point and remove the current thread from the set of participating threads (public member function) |
