# std::ranges::fill_n

| Defined in header `<algorithm>` |  |
| --- | --- |
| Call signature |  |
| `template< class T, std::output_iterator<const T&> O > constexpr O fill_n( O first, std::iter_difference_t<O> n, const T& value );` | (since C++20) (until C++26) |
| `template< class O, class T = std::iter_value_t<O> > requires std::output_iterator<O, const T&> constexpr O fill_n( O first, std::iter_difference_t<O> n, const T& value );` | (since C++26) |

Assigns the given `value` to all elements in the range `[``first``,``first + n``)`.

The function-like entities described on this page are *algorithm function objects* (informally known as *niebloids*), that is:

- Explicit template argument lists cannot be specified when calling any of them.
- None of them are visible to argument-dependent lookup.
- When any of them are found by normal unqualified lookup as the name to the left of the function-call operator, argument-dependent lookup is inhibited.

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range of elements to modify |
| n | - | number of elements to modify |
| value | - | the value to be assigned |

### Return value

An output iterator that compares equal to `first + n`.

### Complexity

Exactly `n` assignments.

### Possible implementation

`struct fill_n_fn { template<class O, class T = std::iter_value_t<O>> requires std::output_iterator<O, const T&> constexpr O operator()(O first, std::iter_difference_t<O> n, const T& value) const { for (std::iter_difference_t<O> i {}; i != n; ++first, ++i) *first = value; return first; } }; inline constexpr fill_n_fn fill_n {};`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms |

### Example

```cpp
#include <algorithm>
#include <complex>
#include <iostream>
#include <string>
#include <vector>

void println(const auto& v)
{
    for (const auto& elem : v)
        std::cout << ' ' << elem;
    std::cout << '\n';
}

int main()
{
    constexpr auto n{8};

    std::vector<std::string> v(n, "▓▓░░");
    println(v);

    std::ranges::fill_n(v.begin(), n, "░░▓▓");
    println(v);

    std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
    println(nums);
    #ifdef __cpp_lib_algorithm_default_value_type
        std::ranges::fill_n(nums.begin(), 2, {4, 2});
    #else
        std::ranges::fill_n(nums.begin(), 2, std::complex<double>{4, 2});
    #endif
    println(nums);
}
```

Output:

```text
 ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░
 ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓
 (1,3) (2,2) (4,8)
 (4,2) (4,2) (4,8)
```

### See also

|  |  |
| --- | --- |
| ranges::fill (C++20) | assigns a range of elements a certain value (algorithm function object) |
| ranges::copy_n (C++20) | copies a number of elements to a new location (algorithm function object) |
| ranges::generate (C++20) | saves the result of a function in a range (algorithm function object) |
| ranges::transform (C++20) | applies a function to a range of elements (algorithm function object) |
| ranges::generate_random (C++26) | fills a range with random numbers from a uniform random bit generator (algorithm function object) |
| fill_n | copy-assigns the given value to N elements in a range (function template) |
