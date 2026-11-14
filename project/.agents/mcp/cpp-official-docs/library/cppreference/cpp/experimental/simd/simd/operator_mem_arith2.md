# std::experimental::simd<T,Abi>::operator!,~,+,-

|  |  |  |
| --- | --- | --- |
| `mask_type operator!() const noexcept;` | (1) | (parallelism TS v2) |
| `simd operator~() const noexcept;` | (2) | (parallelism TS v2) |
| `simd operator+() const noexcept;` | (3) | (parallelism TS v2) |
| `simd operator-() const noexcept;` | (4) | (parallelism TS v2) |

Applies the given unary operator on each element of the `simd`.

1) Returns a `simd_mask<T, Abi>` where the ith element equals `!operator[](i)` for all i in the range of `[``​0​``,``size()``)`.

2) Returns a `simd` where each bit is the inverse of the corresponding bit in `*this`. This overload participates in overload resolution only if `T` is an integral type.

3) Returns a copy of itself.

4) Returns a `simd` where the ith element is initialized to `-operator[](i)` for all i in the range of `[``​0​``,``size()``)`.

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
#include <string_view>
namespace stdx = std::experimental;

void println(std::string_view op, const stdx::native_simd_mask<int> x)
{
    std::cout << op << ": ";
    for (std::size_t i = 0; i < x.size(); ++i)
        std::cout << std::boolalpha << x[i] << ' ';
    std::cout << '\n';
}

void println(std::string_view op, const stdx::native_simd<int> x)
{
    std::cout << op << ": ";
    for (std::size_t i = 0; i < x.size(); ++i)
        std::cout << x[i] << ' ';
    std::cout << '\n';
}

int main()
{
    const stdx::native_simd<int> a([](int i) { return i; });

    println("  a", a);
    println(" !a", !a);
    println(" ~a", ~a);
    println("~~a", ~~a);
    println(" +a", +a);
    println(" -a", -a);
    println("+-a", +-a);
}
```

Possible output:

```text
  a: 0 1 2 3
 !a: true false false false
 ~a: -1 -2 -3 -4
~~a: 0 1 2 3
 +a: 0 1 2 3
 -a: 0 -1 -2 -3
+-a: 0 -1 -2 -3
```
