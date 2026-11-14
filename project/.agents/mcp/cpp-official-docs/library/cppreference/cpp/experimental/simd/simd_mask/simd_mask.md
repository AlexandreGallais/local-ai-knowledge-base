# std::experimental::simd_mask<T,Abi>::simd_mask

|  |  |  |
| --- | --- | --- |
| `simd_mask() noexcept = default;` | (1) | (parallelism TS v2) |
| `explicit simd_mask( bool value ) noexcept;` | (2) | (parallelism TS v2) |
| `template< class U > simd_mask( const simd_mask<U, simd_abi::fixed_size<size()>>& other ) noexcept;` | (3) | (parallelism TS v2) |
| `template< class U, class Flags > simd_mask( const bool* mem, Flags flags );` | (4) | (parallelism TS v2) |
| `simd_mask( const simd_mask& other ) noexcept = default;` | (5) | (parallelism TS v2) (implicitly declared) |
| `simd_mask( simd_mask&& other ) noexcept = default;` | (6) | (parallelism TS v2) (implicitly declared) |

1) Constructs a `simd_mask` using default initialization (constructed without initializer) or value initialization (constructed with an empty initializer).

2) The broadcast constructor constructs a `simd_mask` with all values initialized to `value`.

3) Constructs a `simd_mask` where the i-th element is initialized to `other[i]` for all i in the range of `[``​0​``,``size()``)`. This overload participates in overload resolution only if `Abi` is `simd_abi::fixed_size<size()>`.

4) The load constructor constructs a `simd_mask` where the i-th element is initialized to `mem[i]` for all i in the range of `[``​0​``,``size()``)`.

5,6) Implicitly declared copy and move constructors. Constructs a `simd_mask` where each element is initialized from the values of the elements in `other`.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the value used for initialization of all `simd_mask` elements |
| other | - | another `simd_mask` to copy from |
| mem | - | a pointer into an array where `[``mem``,``mem + size()``)` is a valid range |
| flags | - | if of type `vector_aligned_tag`, the load constructor may assume `mem` to point to storage aligned by `memory_alignment_v<simd_mask>` |
| Type requirements |  |  |
| - `is_simd_flag_type_v<Flags>` must be `true`. |  |  |

### Example

```cpp
#include <algorithm>
#include <cstddef>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

int main()
{
    [[maybe_unused]]
    stdx::native_simd_mask<int> a;       // uninitialized
    stdx::native_simd_mask<int> b(true); // all elements initialized with true
    stdx::native_simd_mask<int> c{};     // all elements initialized with false

    alignas(stdx::memory_alignment_v<stdx::native_simd_mask<int>>)
        std::array<bool, stdx::native_simd_mask<int>::size() * 2> mem = {};
    std::ranges::generate(mem, [i{0}] mutable -> bool { return i++ & 1; });

    stdx::native_simd_mask<int> d(&mem[0], stdx::vector_aligned);  // {0, 1, 0, 1, ...}
    stdx::native_simd_mask<int> e(&mem[1], stdx::element_aligned); // {1, 0, 1, 0, ...}

    const auto xored = b ^ c ^ d ^ e;

    for (std::size_t i{}; i != xored.size(); ++i)
        std::cout << xored[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
0 0 0 0 0 0 0 0
```

### See also

|  |  |
| --- | --- |
| element_aligned_tag, element_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to element alignment (class) |
| vector_aligned_tag, vector_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to vector alignment (class) |
| overaligned_tag, overaligned (parallelism TS v2) | flag indicating alignment of the load/store address to the specified alignment (class template) |
| memory_alignment (parallelism TS v2) | obtains an appropriate alignment for `vector_aligned` (class template) |
| copy_from (parallelism TS v2) | loads `simd_mask` elements from contiguous memory (public member function) |
