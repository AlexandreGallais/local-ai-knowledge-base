# std::experimental::rebind_simd, std::experimental::resize_simd

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class T, class V > struct rebind_simd;` | (1) | (parallelism TS v2) |
| `template< int N, class V > struct resize_simd;` | (2) | (parallelism TS v2) |

Creates a `simd` or `simd_mask` type with a different element type or size. The new type likely uses an ABI tag type different from `V::abi_type`.

1) Changes the element type to `T` and keeps the size unchanged.

2) Changes the size to `N` and keeps the element type unchanged.

### Template parameters

|  |  |  |
| --- | --- | --- |
| T | - | the new element type; an arithmetic type other than `bool` |
| N | - | the new number of elements |
| V | - | a `simd` or `simd_mask` type |

### Member types

| Name | Definition |
| --- | --- |
| `type` | `simd` or `simd_mask` type with a different element type (1) or size (2) |

### Helper types

|  |  |
| --- | --- |
| `template< class T, class V > using rebind_simd_t = typename rebind_simd<T, V>::type;` | (parallelism TS v2) |
| `template< int N, class V > using resize_simd_t = typename resize_simd<N, V>::type;` | (parallelism TS v2) |

### Example

```cpp
#include <experimental/simd>
#include <iostream>

namespace stdx = std::experimental;
using floatv = stdx::native_simd<float>;

// use double precision internally
floatv dp(floatv x)
{
    using doublev = stdx::rebind_simd_t<double, floatv>;
    return stdx::static_simd_cast<floatv>(stdx::simd_cast<doublev>(x) - 1.234);
}

template<class T>
stdx::resize_simd_t<T::size() / 2, T> partial_reduction(T x)
{
    auto [lo, hi] = stdx::split<stdx::resize_simd_t<T::size() / 2, T>>(x);
    return lo + hi;
}

int main()
{
    floatv x([](auto i) { return 1.234f + std::numeric_limits<float>::epsilon() * i; });
    x = dp(x);
    const auto y = partial_reduction(x);
    for (unsigned i = 0; i < y.size(); ++i)
        std::cout << y[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
1.73569e-07 4.11987e-07
```

### See also

deduce, deduce_t (parallelism TS v2) obtains an ABI type for given element type and number of elements (class template)
