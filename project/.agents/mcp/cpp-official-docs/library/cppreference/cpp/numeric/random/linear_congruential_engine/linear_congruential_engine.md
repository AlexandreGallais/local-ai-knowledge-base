# std::linear_congruential_engine<UIntType,a,c,m>::linear_congruential_engine

|  |  |  |
| --- | --- | --- |
| `linear_congruential_engine() : linear_congruential_engine(default_seed) {}` | (1) | (since C++11) |
| `explicit linear_congruential_engine( result_type value );` | (2) | (since C++11) |
| `template< class SeedSeq > explicit linear_congruential_engine( SeedSeq& seq );` | (3) | (since C++11) |
| `linear_congruential_engine( const linear_congruential_engine& other );` | (4) | (since C++11) (implicitly declared) |

Constructs the pseudo-random number engine.

1) The default constructor.

- If the default-constructed engine is of type `std::minstd_rand0`, the 10000th consecutive invocation of it produces the value `1043618065`.
- If the default-constructed engine is of type `std::minstd_rand`, the 10000th consecutive invocation of it produces the value `399268537`.

2) Constructs the engine with a seed value `value`. The engine's initial state is determined as follows:

- If `c % m == 0` and `value % m == 0` are both `true`, the state is `1`.
- Otherwise, the state is `value % m`.

3) Constructs the engine with a seed sequence `seq`. Given `std::size_t(std::log2(m) / 32) + 1` as `k`, the engine's initial state is determined as follows:

1. Creates an invented array object `a` of length `k + 3`.
2. Calls `seq.generate(a + 0, a + k + 3)`.
3. Let `S` be \(\scriptsize (\sum^{k-1}_{j=0} a_{j+3} \cdot 2^{32j}) \mod m \)(∑k-1 j=0 aj+3·232j ) mod m.
4. If both `c % m == 0` and `S == 0` are `true`, sets the engine's state to `1`. Otherwise, sets the engine’s state to `S`.

This overload participates in overload resolution only if `SeedSeq` meets the requirements of SeedSequence.

4) The copy constructor. Upon construction, `*this == other` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | seed value to use in the initialization of the internal state |
| seq | - | seed sequence to use in the initialization of the internal state |

### Complexity

1,2) Constant.

3) Same as the complexity of the `seq.generate` call.

4) Constant.

### Exceptions

3) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (3) would not throw even if the `seq.generate` call throws | propagates the exception |
| P0935R0 | C++11 | the default constructor was explicit | made implicit |

### See also

seed sets the current state of the engine (public member function)
