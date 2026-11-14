# std::experimental::simd_mask<T,Abi>::operator[]

|  |  |  |
| --- | --- | --- |
| `reference operator[]( size_t i );` | (1) | (parallelism TS v2) |
| `bool operator[]( size_t i ) const;` | (2) | (parallelism TS v2) |

The subscript operators allow reading and writing single elements of a `simd_mask`.

1) Returns a reference proxy to the i-th element. This proxy type should not be captured into an lvalue. Lvalues of `simd_mask::reference` can only convert to `value_type`. Rvalues of `simd_mask::reference` overload assignment and all compound assignment operators as well as `swap`.

2) Returns a prvalue of the i-th element. In contrast to containers, which contain objects of type `value_type`, a `simd_mask` is not a container of individual objects and therefore cannot return an lvalue-reference.

### Parameters

i - the element index. Required to be less than `size()`

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

int main()
{
    stdx::native_simd_mask<int> a{true};
    a[1] = 0;
    for (std::size_t i = 0; i != a.size(); ++i)
        std::cout << a[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1
```
