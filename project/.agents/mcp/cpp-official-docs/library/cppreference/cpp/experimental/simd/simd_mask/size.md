# std::experimental::simd_mask<T,Abi>::size

`static constexpr size_t size() noexcept;` (parallelism TS v2)

Returns the width (the number of values) of `simd_mask<T, Abi>`.

### Example

The actual output depends on target and compiler flags.

```cpp
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

int main()
{
    stdx::native_simd_mask<int> a { true };
    std::cout << a.size() << '\n';
    std::cout << popcount(a) << '\n';
}
```

Possible output:

```text
16
16
```

### See also

|  |  |
| --- | --- |
| simd_size (parallelism TS v2) | obtains the number of elements of a given element type and ABI tag (class template) |
| size [static] (parallelism TS v2) | returns the width / number of elements (public static member function of `std::experimental::simd<T,Abi>`) |
