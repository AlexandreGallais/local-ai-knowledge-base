# std::replace_copy, std::replace_copy_if

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt, class T > OutputIt replace_copy( InputIt first, InputIt last, OutputIt d_first, const T& old_value, const T& new_value );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T > ForwardIt2 replace_copy ( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, const T& old_value, const T& new_value );` | (2) | (since C++17) |
|  | (3) |  |
| `template< class InputIt, class OutputIt, class UnaryPred, class T > OutputIt replace_copy_if ( InputIt first, InputIt last, OutputIt d_first, UnaryPred p, const T& new_value );` |  | (constexpr since C++20) (until C++26) |
| `template< class InputIt, class OutputIt, class UnaryPred, class T = typename std::iterator_traits <OutputIt>::value_type > constexpr OutputIt replace_copy_if ( InputIt first, InputIt last, OutputIt d_first, UnaryPred p, const T& new_value );` |  | (since C++26) |
|  | (4) |  |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class UnaryPred, class T > ForwardIt2 replace_copy_if ( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, UnaryPred p, const T& new_value );` |  | (since C++17) (until C++26) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class UnaryPred, class T = typename std::iterator_traits <ForwardIt2>::value_type > ForwardIt2 replace_copy_if ( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, UnaryPred p, const T& new_value );` |  | (since C++26) |

Copies the elements from the range `[``first``,``last``)` to another range beginning at `d_first`, while replacing all elements satisfying specific criteria with `new_value`.

1) Replaces all elements that are equal to `old_value` (using `operator==`).

3) Replaces all elements for which predicate `p` returns `true`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If any of the results of the expressions `*first` and `new_value` is not writable to `d_first`, the program is ill-formed.

If the source and destination ranges overlap, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to copy |
| d_first | - | the beginning of the destination range |
| old_value | - | the value of elements to replace |
| policy | - | the execution policy to use |
| p | - | unary predicate which returns ​`true` if the element value should be replaced. The expression `p(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| new_value | - | the value to use as replacement |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Iterator to the element past the last element copied.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) Exactly \(\scriptsize N\)N comparisons using `operator==`.

3,4) Exactly \(\scriptsize N\)N applications of the predicate `p`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

replace_copy

`template<class InputIt, class OutputIt, class T> OutputIt replace_copy(InputIt first, InputIt last, OutputIt d_first, const T& old_value, const T& new_value) { for (; first != last; ++first) *d_first++ = (*first == old_value) ? new_value : *first; return d_first; }`

replace_copy_if

`template<class InputIt, class OutputIt, class UnaryPred, class T = typename std::iterator_traits<ForwardIt>::value_type> OutputIt replace_copy_if(InputIt first, InputIt last, OutputIt d_first, UnaryPred p, const T& new_value) { for (; first != last; ++first) *d_first++ = p(*first) ? new_value : *first; return d_first; }`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (3,4) |

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
    std::vector<short> src{3, 1, 4, 1, 5, 9, 2, 6, 5};
    println(src);
    std::vector<int> dst(src.size());
    std::replace_copy_if(src.cbegin(), src.cend(),
                         dst.begin(),
                         [](short n){ return n > 5; }, 0);
    println(dst);

    std::vector<std::complex<double>> src2{{1, 3}, {2, 4}, {3, 5}},
                                      dst2(src2.size());
    println(src2);
    #ifdef __cpp_lib_algorithm_default_value_type
        std::replace_copy_if(src2.cbegin(), src2.cend(), dst2.begin(),
            [](std::complex<double> z){ return std::abs(z) < 5; },
            {4, 2}); // Possible, since the T is deduced.
    #else
        std::replace_copy_if(src2.cbegin(), src2.cend(), dst2.begin(),
            [](std::complex<double> z){ return std::abs(z) < 5; },
            std::complex<double>{4, 2});
    #endif
    println(dst2);
}
```

Output:

```text
3 1 4 1 5 9 2 6 5
3 1 4 1 5 0 2 0 5
(1,3) (2,4) (3,5)
(4,2) (4,2) (3,5)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 283 | C++98 | `T` was required to be CopyAssignable (and EqualityComparable for `replace_copy`), but the value type of `InputIt` is not always `T` | removed the requirement |
| LWG 337 | C++98 | `replace_copy_if` only required `InputIt` to meet the requirements of LegacyIterator[1] | corrected to LegacyInputIterator |

1. ↑ The actual defect in the C++ standard is that the template parameter `InputIterator` was misspecified as `Iterator`. This affects the type requirements because the C++ standard states that for the function templates in the algorithms library, the template type parameters whose name ends with `Iterator` imply the type requirements of the corresponding iterator categories.

### See also

|  |  |
| --- | --- |
| replace, replace_if | replaces all values satisfying specific criteria with another value (function template) |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::replace_copy, ranges::replace_copy_if (C++20), (C++20) | copies a range, replacing elements satisfying specific criteria with another value (algorithm function object) |
