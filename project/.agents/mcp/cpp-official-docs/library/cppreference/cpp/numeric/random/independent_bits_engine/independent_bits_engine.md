# std::independent_bits_engine<Engine,W,UIntType>::independent_bits_engine

|  |  |  |
| --- | --- | --- |
| `independent_bits_engine();` | (1) | (since C++11) |
| `explicit independent_bits_engine( result_type s );` | (2) | (since C++11) |
| `template< class SeedSeq > explicit independent_bits_engine( SeedSeq& seq );` | (3) | (since C++11) |
| `explicit independent_bits_engine( const Engine& e );` | (4) | (since C++11) |
| `explicit independent_bits_engine( Engine&& e );` | (5) | (since C++11) |

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

```cpp
#include <iostream>
#include <random>

int main()
{
    auto print = [](auto rem, auto engine, int count)
    {
        std::cout << rem << ": ";
        for (int i {}; i != count; ++i)
            std::cout << static_cast<unsigned>(engine()) << ' ';
        std::cout << '\n';
    };

    std::independent_bits_engine<std::mt19937, /*bits*/ 1, unsigned short>
        e1; // default-constructed
    print("e1", e1, 8);

    std::independent_bits_engine<std::mt19937, /*bits*/ 1, unsigned int>
        e2(1); // constructed with 1
    print("e2", e2, 8);

    std::random_device rd;
    std::independent_bits_engine<std::mt19937, /*bits*/ 3, unsigned long>
        e3(rd()); // seeded with rd()
    print("e3", e3, 8);

    std::seed_seq s {3, 1, 4, 1, 5};
    std::independent_bits_engine<std::mt19937, /*bits*/ 3, unsigned long long>
        e4(s); // seeded with seed-sequence s
    print("e4", e4, 8);
}
```

Possible output:

```text
e1: 0 0 0 1 0 1 1 1
e2: 1 1 0 0 1 1 1 1
e3: 3 1 5 4 3 2 3 4
e4: 0 2 4 4 4 3 3 6
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (3) would not throw even if the `seq.generate` call throws | propagates the exception |
