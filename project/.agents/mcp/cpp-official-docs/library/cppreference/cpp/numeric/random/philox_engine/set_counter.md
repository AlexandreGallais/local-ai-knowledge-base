# std::philox_engine<UIntType,w,n,r,consts>::set_counter

`void set_counter( const std::array<result_type, n>& c );` (since C++26)

Sets the counter of the random-number engine.

- For each integer `k` in `[``​0​``,``n``)`, sets \(\scriptsize X_k \)Xk to \(\scriptsize c_{n-1-k} \mod 2^w \)cn-1-k mod 2w .
- The value of `j` is set to `n - 1`.[1]

1. ↑ As `j` is being set to `n - 1`, the next state transition always generates new random values.

### Parameters

c - counter sequence to use to set the counter

### Complexity

\(\scriptsize O(n) \)O(n).

### See also

|  |  |
| --- | --- |
| (constructor) | constructs the engine (public member function) |
| seed | sets the current state of the engine (public member function) |
