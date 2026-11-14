# operator==(std::philox_engine)

`friend bool operator==( const philox_engine& lhs, const philox_engine& rhs );` (since C++26)

Compares two pseudo-random number engines. Two engines are equal, if their internal states are equivalent, that is, if they would generate equivalent values for any number of calls of `operator()`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `decltype(*this)` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

lhs, rhs - engines to compare

### Return value

`true` if the engines are equal, `false` otherwise.
