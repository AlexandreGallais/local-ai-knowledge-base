# std::linear_congruential_engine<UIntType,a,c,m>::operator()

`result_type operator()();` (since C++11)

Advances the state of the engine, and generates a pseudo-random value from the new state.

### Return value

A pseudo-random number in `[``min()``,``max()``]`.

### Complexity

Amortized constant.

### See also

discard advances the engine's state by a specified amount (public member function)
