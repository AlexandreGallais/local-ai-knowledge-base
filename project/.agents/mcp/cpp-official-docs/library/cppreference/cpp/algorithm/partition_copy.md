# std::partition_copy

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt1, class OutputIt2, class UnaryPred > std::pair<OutputIt1, OutputIt2> partition_copy( InputIt first, InputIt last, OutputIt1 d_first_true, OutputIt2 d_first_false, UnaryPred p );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class ForwardIt3, class UnaryPred > std::pair<ForwardIt2, ForwardIt3> partition_copy( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first_true, ForwardIt3 d_first_false, UnaryPred p );` | (2) | (since C++17) |

1) Copies the elements from the range `[``first``,``last``)` to two different ranges depending on the value returned by the predicate `p`.

- The elements that satisfy the predicate `p` are copied to the range beginning at `d_first_true`.
- The rest of the elements are copied to the range beginning at `d_first_false`.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `*first` is not writable to `d_first_true` or `d_first_false`, the program is ill-formed.

Among the input range and the two output ranges, if any two ranges overlap, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to copy from |
| d_first_true | - | the beginning of the output range for the elements that satisfy `p` |
| d_first_false | - | the beginning of the output range for the elements that do not satisfy `p` |
| policy | - | the execution policy to use |
| p | - | unary predicate which returns ​`true` if the element should be placed in d_first_true. The expression `p(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt1, OutputIt2` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2, ForwardIt3` must meet the requirements of LegacyForwardIterator. |  |  |
| - `UnaryPred` must meet the requirements of Predicate. |  |  |

### Return value

A `std::pair` constructed from the iterator to the end of the `d_first_true` range and the iterator to the end of the `d_first_false` range.

### Complexity

Exactly `std::distance(first, last)` applications of `p`.

For the overload (2), there may be a performance cost if `ForwardIt`'s value type is not CopyConstructible.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

partition_copy (1)

`template<class InputIt, class OutputIt1, class OutputIt2, class UnaryPred> constexpr //< since C++20 std::pair<OutputIt1, OutputIt2> partition_copy(InputIt first, InputIt last, OutputIt1 d_first_true, OutputIt2 d_first_false, UnaryPred p) { for (; first != last; ++first) { if (p(*first)) { *d_first_true = *first; ++d_first_true; } else { *d_first_false = *first; ++d_first_false; } } return std::pair<OutputIt1, OutputIt2>(d_first_true, d_first_false); }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <utility>

void print(auto rem, const auto& v)
{
    for (std::cout << rem; const auto& x : v)
        std::cout << x << ' ';
    std::cout << '\n';
}

int main()
{
    int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int true_arr[5] = {0};
    int false_arr[5] = {0};

    std::partition_copy(std::begin(arr), std::end(arr),
                        std::begin(true_arr), std::begin(false_arr),
                        [](int i) { return 4 < i; });

    print("true_arr:  ", true_arr);
    print("false_arr: ", false_arr);
}
```

Output:

```text
true_arr:  5 6 7 8 9
false_arr: 0 1 2 3 4
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P0896R4 | C++11 C++17 | 1. the value type of `InputIt` (C++11)/`ForwardIt1` (C++17) was required to be CopyAssignable 2. the two output ranges could overlap | 1. not required 2. the behavior is undefined in this case |

### See also

|  |  |
| --- | --- |
| partition | divides a range of elements into two groups (function template) |
| stable_partition | divides elements into two groups while preserving their relative order (function template) |
| copy, copy_if (C++11) | copies a range of elements to a new location (function template) |
| remove_copy, remove_copy_if | copies a range of elements omitting those that satisfy specific criteria (function template) |
| ranges::partition_copy (C++20) | copies a range dividing the elements into two groups (algorithm function object) |
