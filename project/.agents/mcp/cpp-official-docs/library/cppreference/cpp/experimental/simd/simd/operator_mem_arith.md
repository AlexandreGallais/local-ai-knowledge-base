# std::experimental::simd<T,Abi>::operator++, std::experimental::simd<T,Abi>::operator--

|  |  |  |
| --- | --- | --- |
| `simd& operator++() noexcept;` | (1) | (parallelism TS v2) |
| `simd operator++( int ) noexcept;` | (2) | (parallelism TS v2) |
| `simd& operator--() noexcept;` | (3) | (parallelism TS v2) |
| `simd operator--( int ) noexcept;` | (4) | (parallelism TS v2) |

Applies the increment or decrement operator on each element of the `simd`.

1) Increments all values in the `simd` by `1` and returns a reference to itself.

2) Increments all values in the `simd` by `1` and returns a copy of itself before the operation.

3) Decrements all values in the `simd` by `1` and returns a reference to itself.

4) Decrements all values in the `simd` by `1` and returns a copy of itself before the operation.

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

void print(auto rem, auto const& a)
{
    std::cout << rem << ": ";
    for (std::size_t i{}; i != std::size(a); ++i)
        std::cout << a[i] << ' ';
    std::cout << '\n';
}

int main()
{
    stdx::native_simd<int> p = -2;
    print('p', p);

    ++p;
    print('p', p);

    auto q = p--;
    print('p', p);
    print('q', q);
}
```

Possible output:

```text
p: -2 -2 -2 -2
p: -1 -1 -1 -1
p: -2 -2 -2 -2
q: -1 -1 -1 -1
```
