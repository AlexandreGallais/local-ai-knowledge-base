# std::philox_engine<UIntType,w,n,r,consts>::discard

`void discard( unsigned long long z );`

Advances the internal state by `z` times.

### Parameters

z - integer value specifying the number of times to advance the state by

### Complexity

No worse than the complexity of `z` consecutive calls to `operator()`.

### Notes

This function can use “fast jump” algorithms which advance the state by many steps (order of millions) without calculating intermediate state transitions can be used instead of naive loops that calls `operator()` `z` times and discarding the result.

### See also

operator() advances the engine's state and returns the generated value (public member function)
