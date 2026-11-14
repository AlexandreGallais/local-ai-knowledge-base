# std::subtract_with_carry_engine<UIntType,w,s,r>::operator()

`result_type operator()();` (since C++11)

Advances the state of the engine, and generates a pseudo-random value from the new state.

### Return value

A pseudo-random number in `[``min()``,``max()``]`.

### Complexity

Amortized constant.

### See also

discard advances the engine's state by a specified amount (public member function)
