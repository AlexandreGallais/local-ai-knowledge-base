# std::all_of, std::any_of, std::none_of

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class UnaryPred > bool all_of( InputIt first, InputIt last, UnaryPred p );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > bool all_of( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred p );` | (2) | (since C++17) |
| `template< class InputIt, class UnaryPred > bool any_of( InputIt first, InputIt last, UnaryPred p );` | (3) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > bool any_of( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred p );` | (4) | (since C++17) |
| `template< class InputIt, class UnaryPred > bool none_of( InputIt first, InputIt last, UnaryPred p );` | (5) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryPred > bool none_of( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryPred p );` | (6) | (since C++17) |

1) Checks if unary predicate `p` returns `false` for at least one element in the range `[``first``,``last``)`.

3) Checks if unary predicate `p` returns `true` for at least one element in the range `[``first``,``last``)`.

5) Checks if unary predicate `p` returns `true` for none of the elements in the range `[``first``,``last``)`.

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
| policy | - | the execution policy to use |
| p | - | unary predicate . The expression `p(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `VT`, where `VT` is the value type of `InputIt`, regardless of value category, and must not modify `v`. Thus, a parameter type of `VT&`is not allowed, nor is `VT` unless for `VT` a move is equivalent to a copy(since C++11). ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `UnaryPred` must meet the requirements of Predicate. |  |  |

### Return value

| Has `true` element | Yes |  | No |  |
| --- | --- | --- | --- | --- |
| Has `false` element | Yes | No | Yes | No[1] |
| `all_of` | `false` | `true` | `false` | `true` |
| `any_of` | `true` | `true` | `false` | `false` |
| `none_of` | `false` | `false` | `true` | `true` |

1. ↑ The range is empty in this case.

### Complexity

1-6) At most `std::distance(first, last)` applications of the predicate `p`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations of

- `all_of` in libstdc++ and libc++.
- `any_of` in libstdc++ and libc++.
- `none_of` in libstdc++ and libc++.

all_of

`template<class InputIt, class UnaryPred> constexpr bool all_of(InputIt first, InputIt last, UnaryPred p) { return std::find_if_not(first, last, p) == last; }`

any_of

`template<class InputIt, class UnaryPred> constexpr bool any_of(InputIt first, InputIt last, UnaryPred p) { return std::find_if(first, last, p) != last; }`

none_of

`template<class InputIt, class UnaryPred> constexpr bool none_of(InputIt first, InputIt last, UnaryPred p) { return std::find_if(first, last, p) == last; }`

### Example

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <iterator>
#include <numeric>
#include <vector>

int main()
{
    std::vector<int> v(10, 2);
    std::partial_sum(v.cbegin(), v.cend(), v.begin());
    std::cout << "Among the numbers: ";
    std::copy(v.cbegin(), v.cend(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << '\n';

    if (std::all_of(v.cbegin(), v.cend(), [](int i) { return i % 2 == 0; }))
        std::cout << "All numbers are even\n";

    if (std::none_of(v.cbegin(), v.cend(), std::bind(std::modulus<>(),
                                                     std::placeholders::_1, 2)))
        std::cout << "None of them are odd\n";

    struct DivisibleBy
    {
        const int d;
        DivisibleBy(int n) : d(n) {}
        bool operator()(int n) const { return n % d == 0; }
    };

    if (std::any_of(v.cbegin(), v.cend(), DivisibleBy(7)))
        std::cout << "At least one number is divisible by 7\n";
}
```

Output:

```text
Among the numbers: 2 4 6 8 10 12 14 16 18 20
All numbers are even
None of them are odd
At least one number is divisible by 7
```

### See also

ranges::all_of, ranges::any_of, ranges::none_of (C++20), (C++20), (C++20) checks if a predicate is `true` for all, any or none of the elements in a range (algorithm function object)
