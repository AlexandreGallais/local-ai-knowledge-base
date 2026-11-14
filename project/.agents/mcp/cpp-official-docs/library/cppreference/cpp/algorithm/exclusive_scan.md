# std::exclusive_scan

| Defined in header `<numeric>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt, class T > OutputIt exclusive_scan( InputIt first, InputIt last, OutputIt d_first, T init );` | (1) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T > ForwardIt2 exclusive_scan( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, T init );` | (2) | (since C++17) |
| `template< class InputIt, class OutputIt, class T, class BinaryOp > OutputIt exclusive_scan( InputIt first, InputIt last, OutputIt d_first, T init, BinaryOp op );` | (3) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T, class BinaryOp > ForwardIt2 exclusive_scan( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, T init, BinaryOp op );` | (4) | (since C++17) |

1) Equivalent to `exclusive_scan(first, last, d_first, init, std::plus<>()`.

3) Computes the exclusive prefix sum using `op`.

For each integer `i` in `[``​0​``,``std::distance(first, last)``)`, performs the following operations in order:

1. Creates a sequence which is formed by `init` followed by the elements of `[``first``,``iter``)` in order, where `iter` is the next `i`th iterator of `first`.
2. Computes the generalized noncommutative sum of the sequence over `op`.
3. Assigns the result to `*dest`, where `dest` is the next `i`th iterator of `d_first`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

The *generalized noncommutative sum* of a sequence of elements over a binary operation `binary_op` is defined as follows:

- If the sequence only has one element, the sum is the value of the element.
- Otherwise, performs the following operations in order:

1. Selects any two adjacent elements `elem1` and `elem2` from the sequence.
2. Calculates `binary_op(elem1, elem2)` and replaces the two elements in the sequence with the result.
3. Repeats steps 1 and 2 until there is only one element in the sequence.

Given `binary_op` as the actual binary operation:

- The result is non-deterministic if the `binary_op` is not associative (such as floating-point addition).

- If any of the following values is not convertible to `T`, the program is ill-formed:

- `binary_op(init, *first)`
- `binary_op(init, init)`
- `binary_op(*first, *first)`

- If any of the following conditions is satisfied, the behavior is undefined:

- `T` is not MoveConstructible.
- `binary_op` modifies any element of `[``first``,``last``)`.
- `binary_op` invalidates any iterator or subrange of `[``first``,``last``]`.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to sum |
| d_first | - | the beginning of the destination range; may be equal to `first` |
| policy | - | the execution policy to use |
| init | - | the initial value |
| op | - | binary FunctionObject that will be applied in to the result of dereferencing the input iterators, the results of other `op`, and `init` |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Iterator to the element past the last element written.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) \(\scriptsize O(N)\)O(N) applications of `std::plus<>()`.

3,4) \(\scriptsize O(N)\)O(N) applications of `op`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Example

```cpp
#include <functional>
#include <iostream>
#include <iterator>
#include <numeric>
#include <vector>

int main()
{
    std::vector data{3, 1, 4, 1, 5, 9, 2, 6};

    std::cout << "Exclusive sum: ";
    std::exclusive_scan(data.begin(), data.end(),
                        std::ostream_iterator<int>(std::cout, " "),
                        0);

    std::cout << "\nInclusive sum: ";
    std::inclusive_scan(data.begin(), data.end(),
                        std::ostream_iterator<int>(std::cout, " "));

    std::cout << "\n\nExclusive product: ";
    std::exclusive_scan(data.begin(), data.end(),
                        std::ostream_iterator<int>(std::cout, " "),
                        1, std::multiplies<>{});

    std::cout << "\nInclusive product: ";
    std::inclusive_scan(data.begin(), data.end(),
                        std::ostream_iterator<int>(std::cout, " "),
                        std::multiplies<>{});
}
```

Output:

```text
Exclusive sum: 0 3 4 8 9 14 23 25
Inclusive sum: 3 4 8 9 14 23 25 31

Exclusive product: 1 3 3 12 12 60 540 1080
Inclusive product: 3 3 12 12 60 540 1080 6480
```

### See also

|  |  |
| --- | --- |
| adjacent_difference | computes the differences between adjacent elements in a range (function template) |
| accumulate | sums up or folds a range of elements (function template) |
| partial_sum | computes the partial sum of a range of elements (function template) |
| transform_exclusive_scan (C++17) | applies an invocable, then calculates exclusive scan (function template) |
| inclusive_scan (C++17) | similar to `std::partial_sum`, includes the ith input element in the ith sum (function template) |
