# std::fill

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class ForwardIt, class T > void fill( ForwardIt first, ForwardIt last, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > constexpr void fill( ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ExecutionPolicy, class ForwardIt, class T > void fill( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, const T& value );` |  | (since C++17) (until C++26) |
| `template< class ExecutionPolicy, class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > void fill( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |

1) Assigns the given `value` to all elements in the range `[``first``,``last``)`.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `value` is not writable to `first`, the program is ill-formed.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to modify |
| value | - | the value to be assigned |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Complexity

Exactly `std::distance(first, last)` assignments.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

fill

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type> void fill(ForwardIt first, ForwardIt last, const T& value) { for (; first != last; ++first) *first = value; }`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Example

```cpp
#include <algorithm>
#include <complex>
#include <iostream>
#include <vector>

void println(const auto& seq)
{
    for (const auto& e : seq)
        std::cout << e << ' ';
    std::cout << '\n';
}

int main()
{
    std::vector<int> v{0, 1, 2, 3, 4, 5, 6, 7, 8};
    println(v);

    // set all of the elements to 8
    std::fill(v.begin(), v.end(), 8);
    println(v);

    std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
    println(nums);
    #ifdef __cpp_lib_algorithm_default_value_type
        std::fill(nums.begin(), nums.end(), {4, 2});
    #else
        std::fill(nums.begin(), nums.end(), std::complex<double>{4, 2});
    #endif
    println(nums);
}
```

Output:

```text
0 1 2 3 4 5 6 7 8
8 8 8 8 8 8 8 8 8
(1,3) (2,2) (4,8)
(4,2) (4,2) (4,2)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 283 | C++98 | `T` was required to be CopyAssignable, but `T` is not always writable to `ForwardIt` | required to be writable instead |

### See also

|  |  |
| --- | --- |
| fill_n | copy-assigns the given value to N elements in a range (function template) |
| copy, copy_if (C++11) | copies a range of elements to a new location (function template) |
| generate | assigns the results of successive function calls to every element in a range (function template) |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| ranges::fill (C++20) | assigns a range of elements a certain value (algorithm function object) |
