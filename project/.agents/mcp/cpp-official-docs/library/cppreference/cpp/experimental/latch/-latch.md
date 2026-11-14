# std::experimental::latch::~latch

`~latch();` (concurrency TS)

Destroys the latch.

The behavior is undefined if a thread is blocked at the synchronization point.

The destructor may be called even if not all threads have returned from `wait()` or `count_down_and_wait()`, provided the internal counter must equal zero.

The destructor may block until all threads have returned from the blocking functions.

No thread is allowed to block on this latch after one thread has invoked the destructor.
