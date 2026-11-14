# std::is_partitioned

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class UnaryPred > bool is_partitioned( InputIt first, InputIt last, UnaryPred p );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > bool is_partitioned( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred p );` | (2) | (since C++17) |

1) Checks whether `[``first``,``last``)` is partitioned by the predicate `p`: all elements satisfy `p` appear before all elements that do not.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to check |
| policy | - | the execution policy to use |
| p | - | unary predicate which returns ​`true` for the elements expected to be found in the beginning of the range. The expression `p(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. and its value type must be convertible to `UnaryPred`'s parameter type. |  |  |
| - `UnaryPred` must meet the requirements of Predicate. |  |  |

### Return value

`true` if the elements `e` of `[``first``,``last``)` are partitioned with respect to the expression `p(e)`. `false` otherwise.

### Complexity

At most `std::distance(first, last)` applications of `p`.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

`template<class InputIt, class UnaryPred> bool is_partitioned(InputIt first, InputIt last, UnaryPred p) { for (; first != last; ++first) if (!p(*first)) break; for (; first != last; ++first) if (p(*first)) return false; return true; }`

### Example

```cpp
#include <algorithm>
#include <array>
#include <iostream>

int main()
{
    std::array<int, 9> v {1, 2, 3, 4, 5, 6, 7, 8, 9};

    auto is_even = [](int i) { return i % 2 == 0; };
    std::cout.setf(std::ios_base::boolalpha);
    std::cout << std::is_partitioned(v.begin(), v.end(), is_even) << ' ';

    std::partition(v.begin(), v.end(), is_even);
    std::cout << std::is_partitioned(v.begin(), v.end(), is_even) << ' ';

    std::reverse(v.begin(), v.end());
    std::cout << std::is_partitioned(v.cbegin(), v.cend(), is_even) << ' ';
    std::cout << std::is_partitioned(v.crbegin(), v.crend(), is_even) << '\n';
}
```

Output:

```text
false true false true
```

### See also

|  |  |
| --- | --- |
| partition | divides a range of elements into two groups (function template) |
| partition_point (C++11) | locates the partition point of a partitioned range (function template) |
| ranges::is_partitioned (C++20) | determines if the range is partitioned by the given predicate (algorithm function object) |
