# std::independent_bits_engine<Engine,W,UIntType>::seed

|  |  |  |
| --- | --- | --- |
| `void seed();` | (1) | (since C++11) |
| `void seed( result_type value );` | (2) | (since C++11) |
| `template< class SeedSeq > void seed( SeedSeq& seq );` | (3) | (since C++11) |

Reinitializes the internal state of the underlying engine using a new seed value.

1) Seeds the underlying engine with the default seed value. Effectively calls `e.seed()`, where `e` is the underlying engine.

2) Seeds the underlying engine with the seed value `value`. Effectively calls `e.seed(value)`, where `e` is the underlying engine.

3) Seeds the underlying engine with the seed sequence `seq`. Effectively calls `e.seed(seq)`, where `e` is the underlying engine.

This overload participates in overload resolution only if `SeedSeq` satisfies the requirements of SeedSequence.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | seed value to use in the initialization of the internal state of the underlying engine |
| seq | - | seed sequence to use in the initialization of the internal state of the underlying engine |

### Exceptions

3) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (3) would not throw even if the `seq.generate` call throws | propagates the exception |
