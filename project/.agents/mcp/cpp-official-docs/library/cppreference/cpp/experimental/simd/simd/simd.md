# std::experimental::simd<T,Abi>::simd

|  |  |  |
| --- | --- | --- |
| `simd() noexcept = default;` | (1) | (parallelism TS v2) |
| `template< class U > simd( U&& value ) noexcept;` | (2) | (parallelism TS v2) |
| `template< class U > simd( const simd<U, simd_abi::fixed_size<size()>>& other ) noexcept;` | (3) | (parallelism TS v2) |
| `template< class G > explicit simd( G&& generator ) noexcept;` | (4) | (parallelism TS v2) |
| `template< class U, class Flags > simd( const U* mem, Flags flags );` | (5) | (parallelism TS v2) |
| `simd( const simd& other ) noexcept = default;` | (6) | (parallelism TS v2) (implicitly declared) |
| `simd( simd&& other ) noexcept = default;` | (7) | (parallelism TS v2) (implicitly declared) |

1) Constructs a `simd` using default initialization (constructed without initializer) or value initialization (constructed with an empty initializer).

2) The broadcast constructor constructs a `simd` with all values initialized to `value`. This overload participates in overload resolution only if the conversion from `U` to `T` is *value-preserving*, or `U` is either `int` or `unsigned int` if `T` is an unsigned integral type.

3) Constructs a `simd` where the i-th element is initialized to `static_cast<T>(other[i])` for all i in the range of `[``​0​``,``size()``)`. This overload participates in overload resolution only if `Abi` is `simd_abi::fixed_size<size()>` and the conversion from `U` to `T` is *value-preserving*, and, if both `U` and `T` are integral, the integer conversion rank of `T` is greater than the integer conversion rank of `U`.

4) The generator constructor constructs a `simd` where the i-th element is initialized to `generator(std::integral_constant<std::size_t, i>())`. This overload participates in overload resolution only if `simd(gen(std::integral_constant<std::size_t, i>()))` is well-formed for all i in the range of `[``​0​``,``size()``)`. The calls to `generator` are unsequenced with respect to each other. *Vectorization-unsafe* standard library functions may not be invoked by `generator`.

5) The load constructor constructs a `simd` where the i-th element is initialized to `static_cast<T>(mem[i])` for all i in the range of `[``​0​``,``size()``)`.

6,7) Implicitly declared copy and move constructors. Constructs a `simd` where each element is initialized from the values of the elements in `other`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the value used for initialization of all `simd` elements |
| other | - | another `simd` to copy from |
| generator | - | a function object used for initialization of each `simd` element |
| mem | - | a pointer into an array where `[``mem``,``mem + size()``)` is a valid range |
| flags | - | if of type `vector_aligned_tag`, the load constructor may assume `mem` to point to storage aligned by `memory_alignment_v<simd, U>` |
| Type requirements |  |  |
| - The conversion from `U` to `T` must be *value-preserving*. The broadcast constructor (2) additionally allows `U` to be `int` or to be `unsigned int` if `T` is an unsigned integral type. |  |  |
| - `is_simd_flag_type_v<Flags>` must be `true`. |  |  |

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

int main()
{
    stdx::native_simd<int> a; // uninitialized
    a = 1; // all elements set to 1
    stdx::native_simd<int> b([](int i) { return i; }); // {0, 1, 2, 3, ...}

    alignas(stdx::memory_alignment_v<stdx::native_simd<int>>)
        std::array<int, stdx::native_simd<int>::size() * 2> mem = {};
    for (std::size_t i = 0; i < mem.size(); ++i)
        mem[i] = i & 1;

    stdx::native_simd<int> c(&mem[0], stdx::vector_aligned); // {0, 1, 0, 1, ...}
    stdx::native_simd<int> d(&mem[1], stdx::element_aligned); // {1, 0, 1, 0, ...}

    auto sum = a + b + c + d;

    for (std::size_t i = 0; i < sum.size(); ++i)
        std::cout << sum[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
```

### See also

copy_from (parallelism TS v2) loads `simd` elements from contiguous memory (public member function)
