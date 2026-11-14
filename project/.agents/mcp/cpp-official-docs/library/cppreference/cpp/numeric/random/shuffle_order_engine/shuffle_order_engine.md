# std::shuffle_order_engine<Engine,K>::shuffle_order_engine

|  |  |  |
| --- | --- | --- |
| `shuffle_order_engine();` | (1) | (since C++11) |
| `explicit shuffle_order_engine( result_type s );` | (2) | (since C++11) |
| `template< class SeedSeq > explicit shuffle_order_engine( SeedSeq& seq );` | (3) | (since C++11) |
| `explicit shuffle_order_engine( const Engine& e );` | (4) | (since C++11) |
| `explicit shuffle_order_engine( Engine&& e );` | (5) | (since C++11) |

Constructs new pseudo-random engine adaptor.

1) Default constructor. The underlying engine is also default-constructed.

2) Constructs the underlying engine with `s`.

3) Constructs the underlying engine with seed sequence `seq`.

This overload participates in overload resolution only if `Sseq` satisfies the requirements of SeedSequence.

4) Constructs the underlying engine with a copy of `e`.

5) Move-constructs the underlying engine with `e`. `e` holds unspecified, but valid state afterwards.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | integer value to construct the underlying engine with |
| seq | - | seed sequence to construct the underlying engine with |
| e | - | pseudo-random number engine to initialize with |

### Exceptions

3) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (3) would not throw even if the `seq.generate` call throws | propagates the exception |
