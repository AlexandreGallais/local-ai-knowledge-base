# std::experimental::simd<T,Abi>::operator==,!=,<,<=,>,>=

|  |  |  |
| --- | --- | --- |
| `friend simd_mask operator==( const simd& lhs, const simd& rhs ) noexcept;` | (1) | (parallelism TS v2) |
| `friend simd_mask operator!=( const simd& lhs, const simd& rhs ) noexcept;` | (2) | (parallelism TS v2) |
| `friend simd_mask operator<( const simd& lhs, const simd& rhs ) noexcept;` | (3) | (parallelism TS v2) |
| `friend simd_mask operator<=( const simd& lhs, const simd& rhs ) noexcept;` | (4) | (parallelism TS v2) |
| `friend simd_mask operator>( const simd& lhs, const simd& rhs ) noexcept;` | (5) | (parallelism TS v2) |
| `friend simd_mask operator>=( const simd& lhs, const simd& rhs ) noexcept;` | (6) | (parallelism TS v2) |

Applies the given comparison element-wise to each corresponding element of the operands. Returns a `simd_mask` such that for all i in the range of `[``​0​``,``size()``)` the ith element equals:

1) `lhs[i] == rhs[i]`.

2) `lhs[i] != rhs[i]`.

3) `lhs[i] < rhs[i]`.

4) `lhs[i] <= rhs[i]`.

5) `lhs[i] > rhs[i]`.

6) `lhs[i] >= rhs[i]`.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs | - | left operands |
| rhs | - | right operands |

### Example

```cpp
#include <cassert>
#include <iostream>
#include <initializer_list>
#include <iterator>

#include <experimental/simd>
namespace stdx = std::experimental;

int main()
{
    using V = stdx::fixed_size_simd<int, 4>;
    using M = stdx::fixed_size_simd_mask<int, 4>;

    auto assert_equivalence = [](M&& x, std::initializer_list<int>&& y)
    {
        for (decltype(M::size()) i{}; i != M::size(); ++i)
            assert(x[i] == std::cbegin(y)[i]);
    };

    V a{2}, b, c{3};
    b[0] = 1, b[1] = 2, b[2] = 3, b[3] = 4;

    // a == {2, 2, 2, 2}
    // b == {1, 2, 3, 4}
    // c == {3, 3, 3, 3}

    assert_equivalence(a == a, {1, 1, 1, 1});
    assert_equivalence(a == b, {0, 1, 0, 0});
    assert_equivalence(b == c, {0, 0, 1, 0});
    assert_equivalence(a == c, {0, 0, 0, 0});

    assert_equivalence(a != a, {0, 0, 0, 0});
    assert_equivalence(a != b, {1, 0, 1, 1});
    assert_equivalence(b != c, {1, 1, 0, 1});
    assert_equivalence(a != c, {1, 1, 1, 1});

    assert_equivalence(a < a, {0, 0, 0, 0});
    assert_equivalence(a < b, {0, 0, 1, 1});
    assert_equivalence(b < c, {1, 1, 0, 0});
    assert_equivalence(a < c, {1, 1, 1, 1});
}
```

### See also

|  |  |
| --- | --- |
| all_of, any_of, none_of, some_of (parallelism TS v2) | reductions of `simd_mask` to `bool` (function template) |
| popcount (parallelism TS v2) | reduction of `simd_mask` to the number of `true` values (function template) |
| find_first_set, find_last_set (parallelism TS v2) | reductions of `simd_mask` to the index of the first or last `true` value (function template) |
| simd_mask (parallelism TS v2) | data-parallel type with the element type bool (class template) |
