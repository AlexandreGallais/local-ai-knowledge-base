# std::fill_n

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class OutputIt, class Size, class T > OutputIt fill_n( OutputIt first, Size count, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class OutputIt, class Size, class T = typename std::iterator_traits <OutputIt>::value_type > constexpr OutputIt fill_n( OutputIt first, Size count, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ExecutionPolicy, class ForwardIt, class Size, class T > ForwardIt fill_n( ExecutionPolicy&& policy, ForwardIt first, Size count, const T& value );` |  | (since C++17) (until C++26) |
| `template< class ExecutionPolicy, class ForwardIt, class Size, class T = typename std::iterator_traits <OutputIt>::value_type > ForwardIt fill_n( ExecutionPolicy&& policy, ForwardIt first, Size count, const T& value );` |  | (since C++26) |

1) Assigns the given `value` to the first `count` elements in the range beginning at `first` if `count > 0`. Does nothing otherwise.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If any of the following conditions is satisfied, the program is ill-formed:

- `value` is not writable to `first`.
- `Size` is not convertible to an integral type.

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range of elements to modify |
| count | - | number of elements to modify |
| value | - | the value to be assigned |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Iterator one past the last element assigned if `count > 0`, `first` otherwise.

### Complexity

Exactly `std::max(0, count)` assignments.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

fill_n

`template<class OutputIt, class Size, class T = typename std::iterator_traits<OutputIt>::value_type> OutputIt fill_n(OutputIt first, Size count, const T& value) { for (Size i = 0; i < count; i++) *first++ = value; return first; }`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Example

```cpp
#include <algorithm>
#include <complex>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v1{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

    // replace values of the first 5 elements with -1
    std::fill_n(v1.begin(), 5, -1);

    std::copy_n(v1.cbegin(), v1.size(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << '\n';

    std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
    #ifdef __cpp_lib_algorithm_default_value_type
        std::fill_n(nums.begin(), 2, {4, 2});
    #else
        std::fill_n(nums.begin(), 2, std::complex<double>{4, 2});
    #endif
    std::copy_n(nums.cbegin(), nums.size(),
                std::ostream_iterator<std::complex<double>>(std::cout, " "));
    std::cout << '\n';
}
```

Output:

```text
-1 -1 -1 -1 -1 5 6 7 8 9
(4,2) (4,2) (4,8)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 283 | C++98 | `T` was required to be CopyAssignable, but `T` is not always writable to `OutputIt` | required to be writable instead |
| LWG 426 | C++98 | the complexity requirement was “exactly `count` assignments”, which is broken if `count` is negative | no assignment if `count` is non-positive |
| LWG 865 | C++98 | the location of the first element following the filling range was not returned | returned |

### See also

|  |  |
| --- | --- |
| fill | copy-assigns the given value to every element in a range (function template) |
| ranges::fill_n (C++20) | assigns a value to a number of elements (algorithm function object) |
