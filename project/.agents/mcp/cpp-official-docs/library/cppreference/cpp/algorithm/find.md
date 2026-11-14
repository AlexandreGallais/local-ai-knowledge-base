# std::find, std::find_if, std::find_if_not

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class InputIt, class T > InputIt find( InputIt first, InputIt last, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class InputIt, class T = typename std::iterator_traits <InputIt>::value_type > constexpr InputIt find( InputIt first, InputIt last, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ExecutionPolicy, class ForwardIt, class T > ForwardIt find( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, const T& value );` |  | (since C++17) (until C++26) |
| `template< class ExecutionPolicy, class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > ForwardIt find( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |
| `template< class InputIt, class UnaryPred > InputIt find_if( InputIt first, InputIt last, UnaryPred p );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > ForwardIt find_if( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred p );` | (4) | (since C++17) |
| `template< class InputIt, class UnaryPred > InputIt find_if_not( InputIt first, InputIt last, UnaryPred q );` | (5) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > ForwardIt find_if_not( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred q );` | (6) | (since C++17) |

Returns an iterator to the first element in the range `[``first``,``last``)` that satisfies specific criteria (or `last` if there is no such iterator).

1) `find` searches for an element equal to `value` (using `operator==`).

3) `find_if` searches for an element for which predicate `p` returns `true`.

5) `find_if_not` searches for an element for which predicate `q` returns `false`.

2,4,6) Same as (1,3,5), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| value | - | value to compare the elements to |
| policy | - | the execution policy to use |
| p | - | unary predicate which returns ​`true` for the required element. The expression `p(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| q | - | unary predicate which returns ​`false` for the required element. The expression `q(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `UnaryPredicate` must meet the requirements of Predicate. |  |  |

### Return value

The first iterator `it` in the range `[``first``,``last``)` satisfying the following condition or `last` if there is no such iterator:

1,2) `*it == value` is `true`.

3,4) `p(*it)` is `true`.

5,6) `q(*it)` is `false`.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) At most \(\scriptsize N\)N comparisons with `value` using `operator==`.

3,4) At most \(\scriptsize N\)N applications of the predicate `p`.

5,6) At most \(\scriptsize N\)N applications of the predicate `q`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

find

`template<class InputIt, class T = typename std::iterator_traits<InputIt>::value_type> constexpr InputIt find(InputIt first, InputIt last, const T& value) { for (; first != last; ++first) if (*first == value) return first; return last; }`

find_if

`template<class InputIt, class UnaryPred> constexpr InputIt find_if(InputIt first, InputIt last, UnaryPred p) { for (; first != last; ++first) if (p(*first)) return first; return last; }`

find_if_not

`template<class InputIt, class UnaryPred> constexpr InputIt find_if_not(InputIt first, InputIt last, UnaryPred q) { for (; first != last; ++first) if (!q(*first)) return first; return last; }`

### Notes

If C++11 is not available, an equivalent to `std::find_if_not` is to use `std::find_if` with the negated predicate.

`template<class InputIt, class UnaryPred> InputIt find_if_not(InputIt first, InputIt last, UnaryPred q) { return std::find_if(first, last, std::not1(q)); }`

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Example

The following example finds numbers in given sequences.

```cpp
#include <algorithm>
#include <array>
#include <cassert>
#include <complex>
#include <initializer_list>
#include <iostream>
#include <vector>

bool is_even(int i)
{
    return i % 2 == 0;
}

void example_contains()
{
    const auto haystack = {1, 2, 3, 4};

    for (const int needle : {3, 5})
        if (std::find(haystack.begin(), haystack.end(), needle) == haystack.end())
            std::cout << "haystack does not contain " << needle << '\n';
        else
            std::cout << "haystack contains " << needle << '\n';
}

void example_predicate()
{
    for (const auto& haystack : {std::array{3, 1, 4}, {1, 3, 5}})
    {
        const auto it = std::find_if(haystack.begin(), haystack.end(), is_even);
        if (it != haystack.end())
            std::cout << "haystack contains an even number " << *it << '\n';
        else
            std::cout << "haystack does not contain even numbers\n";
    }
}

void example_list_init()
{
    std::vector<std::complex<double>> haystack{{4.0, 2.0}};
#ifdef __cpp_lib_algorithm_default_value_type
    // T gets deduced making list-initialization possible
    const auto it = std::find(haystack.begin(), haystack.end(), {4.0, 2.0});
#else
    const auto it = std::find(haystack.begin(), haystack.end(), std::complex{4.0, 2.0});
#endif
    assert(it == haystack.begin());
}

int main()
{
    example_contains();
    example_predicate();
    example_list_init();
}
```

Output:

```text
haystack contains 3
haystack does not contain 5
haystack contains an even number 4
haystack does not contain even numbers
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 283 | C++98 | `T` was required to be EqualityComparable, but the value type of `InputIt` might not be `T` | removed the requirement |

### See also

|  |  |
| --- | --- |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| find_end | finds the last sequence of elements in a certain range (function template) |
| find_first_of | searches for any one of a set of elements (function template) |
| mismatch | finds the first position where two ranges differ (function template) |
| search | searches for the first occurrence of a range of elements (function template) |
| ranges::find, ranges::find_if, ranges::find_if_not (C++20), (C++20), (C++20) | finds the first element satisfying specific criteria (algorithm function object) |
