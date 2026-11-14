# std::erase, std::erase_if(std::vector)

| Defined in header `<vector>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class T, class Alloc, class U > constexpr std::vector<T, Alloc>::size_type erase( std::vector<T, Alloc>& c, const U& value );` |  | (since C++20) (until C++26) |
| `template< class T, class Alloc, class U = T > constexpr std::vector<T, Alloc>::size_type erase( std::vector<T, Alloc>& c, const U& value );` |  | (since C++26) |
| `template< class T, class Alloc, class Pred > constexpr std::vector<T, Alloc>::size_type erase_if( std::vector<T, Alloc>& c, Pred pred );` | (2) | (since C++20) |

1) Erases all elements that compare equal to `value` from the container. Equivalent to

```cpp
auto it = std::remove(c.begin(), c.end(), value);
auto r = c.end() - it;
c.erase(it, c.end());
return r;
```

2) Erases all elements that satisfy the predicate `pred` from the container. Equivalent to

```cpp
auto it = std::remove_if(c.begin(), c.end(), pred);
auto r = c.end() - it;
c.erase(it, c.end());
return r;
```

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| value | - | value to be removed |
| pred | - | unary predicate which returns ​`true` if the element should be erased. The expression `pred(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `T`, regardless of value category, and must not modify `v`. Thus, a parameter type of `T&`is not allowed, nor is `T` unless for `T` a move is equivalent to a copy(since C++11). ​ |

### Return value

The number of erased elements.

### Complexity

Linear.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithm (1) |

### Example

```cpp
#include <complex>
#include <iostream>
#include <numeric>
#include <string_view>
#include <vector>

void println(std::string_view comment, const auto& c)
{
    std::cout << comment << '[';
    bool first{true};
    for (const auto& x : c)
        std::cout << (first ? first = false, "" : ", ") << x;
    std::cout << "]\n";
}

int main()
{
    std::vector<char> cnt(10);
    std::iota(cnt.begin(), cnt.end(), '0');
    println("Initially, cnt = ", cnt);

    std::erase(cnt, '3');
    println("After erase '3', cnt = ", cnt);

    auto erased = std::erase_if(cnt, [](char x) { return (x - '0') % 2 == 0; });
    println("After erase all even numbers, cnt = ", cnt);
    std::cout << "Erased even numbers: " << erased << '\n';

    std::vector<std::complex<double>> nums{{2, 2}, {4, 2}, {4, 8}, {4, 2}};
    #ifdef __cpp_lib_algorithm_default_value_type
        std::erase(nums, {4, 2});
    #else
        std::erase(nums, std::complex<double>{4, 2});
    #endif
    println("After erase {4, 2}, nums = ", nums);
}
```

Output:

```text
Initially, cnt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
After erase '3', cnt = [0, 1, 2, 4, 5, 6, 7, 8, 9]
After erase all even numbers, cnt = [1, 5, 7, 9]
Erased even numbers: 5
After erase {4, 2}, nums = [(2,2), (4,8)]
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::remove, ranges::remove_if (C++20), (C++20) | removes elements satisfying specific criteria (algorithm function object) |
