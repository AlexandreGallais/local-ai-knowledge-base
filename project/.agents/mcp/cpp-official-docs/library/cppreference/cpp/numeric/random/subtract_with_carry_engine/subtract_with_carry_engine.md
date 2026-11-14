# std::subtract_with_carry_engine<UIntType,w,s,r>::subtract_with_carry_engine

|  |  |  |
| --- | --- | --- |
| `subtract_with_carry_engine() : subtract_with_carry_engine(0u) {}` | (1) | (since C++11) |
| `explicit subtract_with_carry_engine( result_type value );` | (2) | (since C++11) |
| `template< class SeedSeq > explicit subtract_with_carry_engine( SeedSeq& seq );` | (3) | (since C++11) |
| `subtract_with_carry_engine( const subtract_with_carry_engine& other );` | (4) | (since C++11) (implicitly declared) |

Constructs the pseudo-random number engine.

1) The default constructor.

- If the default-constructed engine is of type `std::ranlux24_base`, the 10000th consecutive invocation of it produces the value `7937952`.
- If the default-constructed engine is of type `std::ranlux48_base`, the 10000th consecutive invocation of it produces the value `61839128582725`.

2) Constructs the engine with a seed value `value`. The sequence `X` of the engine's initial state is determined as follows:

1. Constructs a `std::linear_congruential_engine<std::uint_least32_t, 40014u, 0u, 2147483563u>` object `e` with argument `value == 0u ? default_seed : static_cast<std::uint_least32_t>(value % 2147483563u)`.
2. Let `n` be `std::size_t(w / 32) + 1`.
3. Sets the values of \(\scriptsize X_{-r} \)X-r, ..., \(\scriptsize X_{-1} \)X-1, in that order. Each value \(\scriptsize X_i \)Xi is set as specified below:

1. Successively calls `e` for `n` times, the return values are denoted as \(\scriptsize z_0 \)z0 ... \(\scriptsize z_{n-1} \)zn-1.
2. Sets \(\scriptsize X_i \)Xi to \(\scriptsize (\sum^{n-1}_{j=0} z_j \cdot 2^{32j}) \mod m \)(∑n-1 j=0 zj·232j ) mod m.

If \(\scriptsize X_{-1} \)X-1 is `​0​`, sets the carry value `c` of the engine's initial state to `1`. Otherwise, sets `c` to `​0​`.

3) Constructs the engine with a seed sequence `seq`. Given `std::size_t(w / 32) + 1` as `k`, the sequence `X` of the engine's initial state is determined as follows:

1. Creates an invented array object `a` of length `r * k`.
2. Calls `seq.generate(a + 0, a + r * k)`.
3. For each integer `i` in `[``-r``,``-1``]`, sets \(\scriptsize X_{i} \)Xi to \(\scriptsize (\sum^{k-1}_{j=0} a_{k(i+r)+j} \cdot 2^{32j}) \mod m \)(∑k-1 j=0 ak(i+r)+j·232j ) mod m.

If \(\scriptsize X_{-1} \)X-1 is `​0​`, sets the carry value `c` of the engine's initial state to `1`. Otherwise, sets `c` to `​0​`.

This overload participates in overload resolution only if `SeedSeq` meets the requirements of SeedSequence.

4) The copy constructor. Upon construction, `*this == other` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | seed value to use in the initialization of the internal state |
| seq | - | seed sequence to use in the initialization of the internal state |

### Complexity

1,2) `(std::size_t(w / 32) + 1) * r` invocations of `e`.

3) Same as the complexity of the `seq.generate` call.

4) \(\scriptsize O(r) \)O(r).

### Exceptions

3) If `SeedSeq` is not `std::seed_seq`, throws the exceptions thrown by the `seq.generate` call.

### Example

This section is incomplete Reason: demos for overloads (2-4) required

```cpp
#include <cassert>
#include <random>

int main()
{
    std::ranlux24_base gen24; // overload (1)
    std::ranlux48_base gen48; // overload (1)
    gen24.discard(10000 - 1);
    gen48.discard(10000 - 1);
    assert(gen24() == 7'937'952);
    assert(gen48() == 61'839'128'582'725);
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2181 | C++11 | overload (3) would not throw even if the `seq.generate` call throws | propagates the exception |
| LWG 3809 | C++11 | `e` could not be constructed if `result_type` is `std::uint16_t` | can be constructed in this case |
| LWG 4014 | C++11 | the resolution of LWG issue 3809 caused the initial seed of the intermediate `std::linear_congruential_engine` to have a different type from the engine's `result_type` | truncates and converts `value` |
| P0935R0 | C++11 | the default constructor was explicit | made implicit |

### See also

seed sets the current state of the engine (public member function)
