# std::transform_reduce

| Defined in header `<numeric>` |  |  |
| --- | --- | --- |
| `template< class InputIt1, class InputIt2, class T > T transform_reduce( InputIt1 first1, InputIt1 last1, InputIt2 first2, T init );` | (1) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T > T transform_reduce( ExecutionPolicy&& policy, ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, T init );` | (2) | (since C++17) |
| `template< class InputIt1, class InputIt2, class T, class BinaryOp1, class BinaryOp2 > T transform_reduce( InputIt1 first1, InputIt1 last1, InputIt2 first2, T init, BinaryOp1 reduce, BinaryOp2 transform );` | (3) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T, class BinaryOp1, class BinaryOp2 > T transform_reduce( ExecutionPolicy&& policy, ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, T init, BinaryOp1 reduce, BinaryOp2 transform );` | (4) | (since C++17) |
| `template< class InputIt, class T, class BinaryOp, class UnaryOp > T transform_reduce( InputIt first, InputIt last, T init, BinaryOp reduce, UnaryOp transform );` | (5) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class T, class BinaryOp, class UnaryOp > T transform_reduce( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, T init, BinaryOp reduce, UnaryOp transform );` | (6) | (since C++17) |

1) Equivalent to `transform_reduce(first1, last1, first2, init, std::plus<>(), std::multiplies<>())`, effectively parallelized version of the default `std::inner_product`.

3) Applies `transform` to each pair of elements from the ranges `[``first1``,``last1``)` and the range of `std::distance(first1, last1)` elements starting from `first2` and reduces the results (possibly permuted and aggregated in unspecified manner) along with the initial value `init` over `reduce`.

The result is non-deterministic if the `reduce` is not associative or not commutative (such as floating-point addition).

If any of the following values is not convertible to `T`, the program is ill-formed:

- `reduce(init, init)`
- `reduce(init, transform(*first1, *first2))`
- `reduce(transform(*first1, *first2), init)`
- `reduce(transform(*first1, *first2), transform(*first1, *first2))`

Given `last2` as the `std::distance(first1, last1)`th next iterator of `first2`, if any of the following conditions is satisfied, the behavior is undefined:

- `T` is not MoveConstructible.
- `transform` or `reduce` modifies any element of `[``first1``,``last1``)` or `[``first2``,``last2``)`.
- `transform` or `reduce` invalidates any iterator or subrange of `[``first1``,``last1``]` or `[``first2``,``last2``]`.

5) Applies `transform` to each element in the range `[``first``,``last``)` and reduces the results (possibly permuted and aggregated in unspecified manner) along with the initial value `init` over `reduce`.

The result is non-deterministic if the `reduce` is not associative or not commutative (such as floating-point addition).

If any of the following values is not convertible to `T`, the program is ill-formed:

- `reduce(init, init)`
- `reduce(init, transform(*first))`
- `reduce(transform(*first), init)`
- `reduce(transform(*first), transform(*first))`

If any of the following conditions is satisfied, the behavior is undefined:

- `T` is not MoveConstructible.
- `transform` or `reduce` modifies any element of `[``first``,``last``)`.
- `transform` or `reduce` invalidates any iterator or subrange of `[``first``,``last``]`.

2,4,6) Same as (1,3,5), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first1, last1 | - | the range of elements to be taken as the left operand of `transform` |
| first2 | - | the start of range of elements to be taken as the right operand of `transform` |
| first, last | - | the range of elements to be taken as the operand of `transform` |
| init | - | the initial value of the generalized sum |
| policy | - | the execution policy to use |
| reduce | - | binary FunctionObject that will be applied in unspecified order to the results of `transform`, the results of other `reduce` and `init`. |
| transform | - | unary or binary FunctionObject that will be applied to each element of the input range(s). The return type must be acceptable as input to `reduce`. |
| Type requirements |  |  |
| - `InputIt1, InputIt2, InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt1, ForwardIt2, ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

1,2) The generalized sum of `init` and `values` over `std::plus<>()`, where `values` are the values transformed by `std::multiplies<>()`, each value is transformed from a pair of elements from the two input ranges.

3,4) The generalized sum of `init` and `values` over `reduce`, where `values` are the values transformed by `transform`, each value is transformed from a pair of elements from the two input ranges.

5,6) The generalized sum of `init` and `values` over `reduce`, where `values` are the values transformed by `transform`, each value is transformed from an element from the input range.

The *generalized sum* of a group of elements over an binary operation `binary_op` is defined as follows:

- If the group only has one element, the sum is the value of the element.
- Otherwise, performs the following operations in order:

1. Takes any two elements `elem1` and `elem2` from the group.
2. Calculates `binary_op(elem1, elem2)` and puts the result back to the group.
3. Repeats steps 1 and 2 until there is only one element in the group.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first1, last1)` (or `std::distance(first, last)` for overloads (5,6)):

1,2) \(\scriptsize O(N)\)O(N) applications of `std::plus<>()` and `std::multiplies<>()` respectively.

3-6) \(\scriptsize O(N)\)O(N) applications of `reduce` and `transform` respectively.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Notes

`transform` is never applied to `init`.

If `first == last` or `first1 == last1`, `init` is returned, unmodified.

### Example

`transform_reduce` can be used to parallelize `std::inner_product`. Some systems may need additional support to get advantages of parallel execution. E.g., on GNU/Linux, the Intel TBB be installed and `-ltbb` option be provided to gcc/clang compiler.

```cpp
#if PARALLEL
#include <execution>
#define PAR std::execution::par,
#else
#define PAR
#endif

#include <algorithm>
#include <functional>
#include <iostream>
#include <iterator>
#include <locale>
#include <numeric>
#include <vector>

// to parallelize non-associate accumulative operation, you'd better choose
// transform_reduce instead of reduce; e.g., a + b * b != b + a * a
void print_sum_squared(long const num)
{
    std::cout.imbue(std::locale{"en_US.UTF8"});
    std::cout << "num = " << num << '\n';

    // create an immutable vector filled with pattern: 1,2,3,4, 1,2,3,4 ...
    const std::vector<long> v{[n = num * 4] {
        std::vector<long> v;
        v.reserve(n);
        std::generate_n(std::back_inserter(v), n,
            [i = 0]() mutable { return 1 + i++ % 4; });
        return v;
    }()};

    auto squared_sum = [](auto sum, auto val) { return sum + val * val; };

    auto sum1 = std::accumulate(v.cbegin(), v.cend(), 0L, squared_sum);
    std::cout << "accumulate(): " << sum1 << '\n';

    auto sum2 = std::reduce(PAR v.cbegin(), v.cend(), 0L, squared_sum);
    std::cout << "reduce(): " << sum2 << '\n';

    auto sum3 = std::transform_reduce(PAR v.cbegin(), v.cend(), 0L, std::plus{},
                                      [](auto val) { return val * val; });
    std::cout << "transform_reduce(): " << sum3 << "\n\n";
}

int main()
{
    print_sum_squared(1);
    print_sum_squared(1'000);
    print_sum_squared(1'000'000);
}
```

Possible output:

```text
num = 1
accumulate(): 30
reduce(): 30
transform_reduce(): 30

num = 1,000
accumulate(): 30,000
reduce(): -7,025,681,278,312,630,348
transform_reduce(): 30,000

num = 1,000,000
accumulate(): 30,000,000
reduce(): -5,314,886,882,370,003,032
transform_reduce(): 30,000,000

// Compile-options for parallel execution on POSIX:
// g++ -O2 -std=c++17 -Wall -Wextra -pedantic -DPARALLEL ./example.cpp -ltbb -o tr; ./tr
```

### See also

|  |  |
| --- | --- |
| accumulate | sums up or folds a range of elements (function template) |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| reduce (C++17) | similar to `std::accumulate`, except out of order (function template) |
