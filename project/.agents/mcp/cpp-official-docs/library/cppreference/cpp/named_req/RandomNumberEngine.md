# C++ named requirements: RandomNumberEngine (since C++11)

A random number engine is a function object returning unsigned integer values such that each value in the range of possible results has (ideally) equal probability.

Any random number engine is also a UniformRandomBitGenerator, and therefore may be plugged into any random number distribution in order to obtain a random number (formally, a random variate).

### Requirements

A type satisfies RandomNumberEngine if it satisfies UniformRandomBitGenerator and, given the following types and values, the semantic and complexity requirements in the table below are satisfied:

| Type | Definition |
| --- | --- |
| `E` | a RandomNumberEngine type |
| `T` | `E::result_type` |
| Value | Definition |
| `e` | a value of type `E` |
| `v` | an lvalue of type `E` |
| `x`, `y` | values of type (possibly const-qualified) `E` |
| `s` | a value of type `T` |
| `q` | a SeedSequence lvalue |
| `z` | a value of type `unsigned long long` |
| `os` | an lvalue whose type is a specialization of `std::basic_ostream` |
| `is` | an lvalue whose type is a specialization of `std::basic_istream` |
| `n` | the size of `E`'s state |
| `TA` | the transition algorithm of `E` |
| `GA` | the generation algorithm of `E` |

| Expression | Return type | Semantics | Complexity |
| --- | --- | --- | --- |
| `E()` | N/A | Creates an engine with the same initial state as all other default-constructed engines of type `E`. | \(\scriptsize O(n)\)O(n) |
| `E(x)` | Creates an engine that compares equal to `x`. | \(\scriptsize O(n)\)O(n) |  |
| `E(s)` | Creates an engine whose initial state is determined by `s`. | \(\scriptsize O(n)\)O(n) |  |
| `E(q)` | Creates an engine whose initial state is determined by a single call to `q.generate`. | same as the complexity of `q.generate` called on a sequence whose length is `n` |  |
| `e.seed()` | `void` | Postcondition: `e == E()`. | same as `E()` |
| `e.seed(s)` | `void` | Postcondition: `e == E(s)`. | same as `E(s)` |
| `e.seed(q)` | `void` | Postcondition: `e == E(q)`. | same as `E(q)` |
| `e()` | `T` | Advances `e`’s state from `ei` to `ei+1` (i.e. `TA(ei)`) and returns `GA(ei)`. | amortized constant |
| `e.discard(z)` | `void` | Advances `e`’s state from `ei` to `ei+z` by any means equivalent to `z` consecutive calls of `e()`. | no worse than the complexity of `z` consecutive calls of `e()` |
| `x == y` | `bool` | For all positive integer `i`, if the `i`th consecutive calls of `x()` and `y()` return the same value, returns `true`. Otherwise returns `false`. | \(\scriptsize O(n)\)O(n) |
| `x != y` | `bool` | `!(x == y)` | \(\scriptsize O(n)\)O(n) |
| `os << x` | `decltype(os)&` | With fmtflags set to `std::ios_base::dec \| std::ios_base::left` and the fill character set to the space character, writes to `os` the textual representation of `x`'s current state. Postcondition: `os`'s fmtflags and the fill character are the same as before. | \(\scriptsize O(n)\)O(n) |
| `is >> v` | `decltype(is)&` | With fmtflags set to `std::ios_base::dec`, reads from `is` the textual representation of `v`'s current state. If bad input is encountered, ensures that `v`’s state is unchanged by the operation and calls `is.setstate(std::ios_base::failbit)` (which may throw `std::ios_base::failure`). Precondition: `is` provides a textual representation that was previously written using an output stream `pr` satisfying all following conditions: `is.getloc() == pr.getloc()` is `true`. `std::is_same<decltype(is)::char_type, decltype(pr)::char_type>::value` is `true`. `std::is_same<decltype(is)::traits_type, decltype(pr)::traits_type>::value` is `true`. Postcondition: `is`'s fmtflags are the same as before. | \(\scriptsize O(n)\)O(n) |

### Standard library

The following standard library facilities satisfy RandomNumberEngine:

|  |  |
| --- | --- |
| linear_congruential_engine (C++11) | implements linear congruential algorithm (class template) |
| mersenne_twister_engine (C++11) | implements Mersenne twister algorithm (class template) |
| subtract_with_carry_engine (C++11) | implements a subtract-with-carry (lagged Fibonacci) algorithm (class template) |
| philox_engine (C++26) | a counter-based parallelizable generator (class template) |
| discard_block_engine (C++11) | discards some output of a random number engine (class template) |
| independent_bits_engine (C++11) | packs the output of a random number engine into blocks of a specified number of bits (class template) |
| shuffle_order_engine (C++11) | delivers the output of a random number engine in a different order (class template) |

The following standard library facilities satisfy UniformRandomBitGenerator but not RandomNumberEngine:

random_device (C++11) non-deterministic random number generator using hardware entropy source (class)
