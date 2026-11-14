# std::experimental::simd<T,Abi>::operator[]

|  |  |  |
| --- | --- | --- |
| `reference operator[]( std::size_t i );` | (1) | (parallelism TS v2) |
| `value_type operator[]( std::size_t i ) const;` | (2) | (parallelism TS v2) |

The subscript operators allow reading and writing single elements of a `simd`.

1) Returns a reference proxy to the i-th element. This proxy type should not be captured into an lvalue. Lvalues of `simd::reference` can only convert to `value_type`. Rvalues of `simd::reference` overload assignment and all compound assignment operators as well as `swap`.

2) Returns a prvalue of the i-th element. In contrast to containers, which contain objects of type `value_type`, a `simd` is not a container of individual objects and therefore cannot return an lvalue-reference.

### Parameters

i - the element index. Required to be less than size()

### Example

```cpp
#include <cstddef>
#include <cstdint>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

int main()
{
    const stdx::native_simd<std::int64_t> a = 3;
    for (std::size_t i = 0; i != a.size(); ++i)
        std::cout << a[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
3 3 3 3 3 3 3 3
```
