# std::experimental::simd<T,Abi>::copy_from

`template< class U, class Flags > void copy_from( const U* mem, Flags flags );` (parallelism TS v2)

The load function replaces all elements of a `simd` such that the ith element is assigned with `static_cast<T>(mem[i])` for all i in the range of `[``​0​``,``size()``)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| mem | - | a pointer into an array where `[``mem``,``mem + size()``)` is a valid range |
| flags | - | if of type `vector_aligned_tag`, the load constructor may assume `mem` to point to storage aligned by `memory_alignment_v<simd, U>` |
| Type requirements |  |  |
| - `U` must be a *vectorizable* type. |  |  |
| - `is_simd_flag_type_v<Flags>` must be `true`. |  |  |

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
#include <numeric>
namespace stdx = std::experimental;

void print(auto const& a)
{
    for (std::size_t i{}; i != std::size(a); ++i)
        std::cout << a[i] << ' ';
    std::cout << '\n';
}

int main()
{
    alignas(stdx::memory_alignment_v<stdx::native_simd<int>>)
        std::array<int, stdx::native_simd<int>::size() * 2> mem = {};
    std::iota(mem.begin(), mem.end(), 0);
    print(mem);

    stdx::native_simd<int> a; // uninitialized

    a.copy_from(&mem[0], stdx::vector_aligned);
    print(a);

    a.copy_from(&mem[1], stdx::element_aligned); // vector_aligned would likely crash
    print(a);
}
```

Possible output:

```text
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
0 1 2 3 4 5 6 7
1 2 3 4 5 6 7 8
```

### See also

|  |  |
| --- | --- |
| memory_alignment (parallelism TS v2) | obtains an appropriate alignment for `vector_aligned` (class template) |
| copy_to (parallelism TS v2) | stores `simd` elements to contiguous memory (public member function) |
| (constructor) (parallelism TS v2) | constructs a `simd` object (public member function) |
