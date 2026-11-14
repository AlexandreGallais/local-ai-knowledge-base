# std::mersenne_twister_engine<UIntType,w,n,m,r,a,u,d,s,b,t,c,l,f>::seed

|  |  |  |
| --- | --- | --- |
| `void seed( result_type value = default_seed );` | (1) | (since C++11) |
| `template< class SeedSeq > void seed( SeedSeq& seq );` | (2) | (since C++11) |

Sets the state of the random-number engine.

1) Right after the state is set, `*this == std::mersenne_twister_engine(value)` is `true`.

2) Right after the state is set, `*this == std::mersenne_twister_engine(seq)` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | seed value to use to set the state |
| seq | - | seed sequence to use to set the state |

### Exceptions

2) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Complexity

1) Same as `std::mersenne_twister_engine(value)`.

2) Same as `std::mersenne_twister_engine(seq)`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (2) would not throw even if the `seq.generate` call throws | propagates the exception |

### See also

(constructor) constructs the engine (public member function)

### Example

```cpp
#include <iostream>
#include <random>

int main()
{
    std::mt19937 gen;

    // Seed the engine with an unsigned int
    gen.seed(1);
    std::cout << "after seed by 1: " << gen() << '\n';

    // Seed the engine with two unsigned ints
    std::seed_seq sseq{1, 2};
    gen.seed(sseq);
    std::cout << "after seed by {1,2}: " << gen() << '\n';
}
```

Possible output:

```text
after seed by 1: 1791095845
after seed by {1,2}: 3127717181
```
