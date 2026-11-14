# std::subtract_with_carry_engine<UIntType,w,s,r>::seed

|  |  |  |
| --- | --- | --- |
| `void seed( result_type value = 0u );` | (1) | (since C++11) |
| `template< class SeedSeq > void seed( SeedSeq& seq );` | (2) | (since C++11) |

Sets the state of the random-number engine.

1) Right after the state is set, `*this == std::subtract_with_carry_engine(value)` is `true`.

2) Right after the state is set, `*this == std::subtract_with_carry_engine(seq)` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | seed value to use to set the state |
| seq | - | seed sequence to use to set the state |

### Exceptions

2) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Complexity

1) Same as `std::subtract_with_carry_engine(value)`.

2) Same as `std::subtract_with_carry_engine(seq)`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (2) would not throw even if the `seq.generate` call throws | propagates the exception |
| LWG 3809 | C++11 | the default argument of `value` was `default_seed` | changed to `0u` |

### See also

(constructor) constructs the engine (public member function)
