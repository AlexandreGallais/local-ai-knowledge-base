# std::experimental::latch::count_down

`void count_down( ptrdiff_t n = 1 );` (1) (concurrency TS)

Atomically decrements the internal counter by `n` without blocking the caller.

If `n` is greater than the value of the internal counter or is negative, the behavior is undefined.

This operation synchronizes with all calls that block on this latch and all `is_ready` calls on this latch that returns `true`.

### Parameters

n - the value by which the internal counter is decreased

### Return value

(none)

### Exceptions

Throws nothing.
