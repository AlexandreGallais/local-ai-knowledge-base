# std::experimental::simd<T,Abi>::operator+=,-=,*=,/=,%=,&=,|=,^=,<<=,>>=

|  |  |  |
| --- | --- | --- |
| `friend simd& operator+=( simd& lhs, const simd& rhs ) noexcept;` | (1) | (parallelism TS v2) |
| `friend simd& operator-=( simd& lhs, const simd& rhs ) noexcept;` | (2) | (parallelism TS v2) |
| `friend simd& operator*=( simd& lhs, const simd& rhs ) noexcept;` | (3) | (parallelism TS v2) |
| `friend simd& operator/=( simd& lhs, const simd& rhs ) noexcept;` | (4) | (parallelism TS v2) |
| `friend simd& operator%=( simd& lhs, const simd& rhs ) noexcept;` | (5) | (parallelism TS v2) |
| `friend simd& operator&=( simd& lhs, const simd& rhs ) noexcept;` | (6) | (parallelism TS v2) |
| `friend simd& operator\|=( simd& lhs, const simd& rhs ) noexcept;` | (7) | (parallelism TS v2) |
| `friend simd& operator^=( simd& lhs, const simd& rhs ) noexcept;` | (8) | (parallelism TS v2) |
| `friend simd& operator<<=( simd& lhs, const simd& rhs ) noexcept;` | (9) | (parallelism TS v2) |
| `friend simd& operator<<=( simd& lhs, int n ) noexcept;` | (10) | (parallelism TS v2) |
| `friend simd& operator>>=( simd& lhs, const simd& rhs ) noexcept;` | (11) | (parallelism TS v2) |
| `friend simd& operator>>=( simd& lhs, int n ) noexcept;` | (12) | (parallelism TS v2) |

Applies the given compound assignment operator element-wise to each corresponding element of the operands such that for all i in the range of `[``​0​``,``size()``)` the result is equivalent to:

1) `lhs[i] += rhs[i]`

2) `lhs[i] -= rhs[i]`

3) `lhs[i] *= rhs[i]`

4) `lhs[i] /= rhs[i]`

5) `lhs[i] %= rhs[i]`

6) `lhs[i] &= rhs[i]`

7) `lhs[i] |= rhs[i]`

8) `lhs[i] ^= rhs[i]`

9) `lhs[i] <<= rhs[i]`

10) `lhs[i] <<= n`

11) `lhs[i] >>= rhs[i]`

12) `lhs[i] >>= n`

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs | - | left operands |
| rhs | - | right operands |
| n | - | number of bits to shift each element in `lhs` |

### Return value

`lhs`

### Example

Computes `cosh(β)² - sinh(β)²` (`== 1`) for some arbitrary angle β, on SIMD data.

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iomanip>
#include <iostream>
#include <string_view>
namespace stq = std::experimental;

void print(const std::string_view rem, const auto x)
{
    std::cout << rem << '\n' << std::fixed;
    for (std::size_t t{}; t != x.size(); ++t)
        std::cout << std::setw(10) << x[t] << ((t + 1) % 8 ? ',' : '\n');
    std::cout << '\n';
}

int main()
{
    constexpr auto N = 32UZ;
    using elem_t = long double;

    stq::fixed_size_simd<elem_t, N> x{[](elem_t i) { return i / N; }};
    stq::fixed_size_simd<elem_t, N> y{x};
    x = stq::cosh(x);
    y = stq::sinh(y);
    x *= x;
    y *= y;
    print("cosh(x)²:", x);
    print("sinh(x)²:", y);
    auto z = x - y;
    print("cosh(x)² - sinh(x)²:", z);
    std::cout << "reduce(z) = " << stq::reduce(z) << '\n';
}
```

Output:

```text
cosh(x)²:
  1.000000,  1.000977,  1.003911,  1.008815,  1.015707,  1.024613,  1.035570,  1.048620
  1.063813,  1.081209,  1.100877,  1.122892,  1.147342,  1.174321,  1.203934,  1.236299
  1.271540,  1.309797,  1.351217,  1.395964,  1.444212,  1.496149,  1.551979,  1.611920
  1.676205,  1.745086,  1.818833,  1.897733,  1.982094,  2.072247,  2.168544,  2.271360

sinh(x)²:
  0.000000,  0.000977,  0.003911,  0.008815,  0.015707,  0.024613,  0.035570,  0.048620
  0.063813,  0.081209,  0.100877,  0.122892,  0.147342,  0.174321,  0.203934,  0.236299
  0.271540,  0.309797,  0.351217,  0.395964,  0.444212,  0.496149,  0.551979,  0.611920
  0.676205,  0.745086,  0.818833,  0.897733,  0.982094,  1.072247,  1.168544,  1.271360

cosh(x)² - sinh(x)²:
  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000
  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000
  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000
  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000,  1.000000

reduce(z) = 32.000000
```

### See also

operator+, operator-, operator*, operator/, operator%, operator&, operator\|, operator^, operator<<, operator>> (parallelism TS v2) element-wise binary operators (function)
