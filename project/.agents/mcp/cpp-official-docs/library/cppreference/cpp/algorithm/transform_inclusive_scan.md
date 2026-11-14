# std::transform_inclusive_scan

| Defined in header `<numeric>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt, class BinaryOp, class UnaryOp > OutputIt transform_inclusive_scan ( InputIt first, InputIt last, OutputIt d_first, BinaryOp binary_op, UnaryOp unary_op );` | (1) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class BinaryOp, class UnaryOp > ForwardIt2 transform_inclusive_scan ( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, BinaryOp binary_op, UnaryOp unary_op );` | (2) | (since C++17) |
| `template< class InputIt, class OutputIt, class BinaryOp, class UnaryOp, class T > OutputIt transform_inclusive_scan ( InputIt first, InputIt last, OutputIt d_first, BinaryOp binary_op, UnaryOp unary_op, T init );` | (3) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class BinaryOp, class UnaryOp, class T > ForwardIt2 transform_inclusive_scan ( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, BinaryOp binary_op, UnaryOp unary_op, T init );` | (4) | (since C++17) |

1) Computes the inclusive prefix sum using `op`.

For each integer `i` in `[``​0​``,``std::distance(first, last)``)`, performs the following operations in order:

1. Creates a sequence which is formed by the values transformed from the elements of `[``first``,``iter``]` in order by `unary_op`, where `iter` is the next `i`th iterator of `first`.
2. Computes the generalized noncommutative sum of the sequence over `binary_op`.
3. Assigns the result to `*dest`, where `dest` is the next `i`th iterator of `d_first`.

3) Same as (1), but each sequence created is formed by `init` followed by the elements of `[``first``,``iter``]` in order.

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

The result is non-deterministic if the `binary_op` is not associative (such as floating-point addition).

For overloads (1,2), if `binary_op(unary_op(*first), unary_op(*first))` is not convertible to the value type of `decltype(first)`, the program is ill-formed.

For overloads (3,4), if any of the following values is not convertible to `T`, the program is ill-formed:

- `binary_op(init, init)`
- `binary_op(init, unary_op(*first))`
- `binary_op(unary_op(*first), unary_op(*first))`

If any of the following conditions is satisfied, the behavior is undefined:

- For overloads (1,2), the value type of `decltype(first)` is not MoveConstructible.
- For overloads (3,4), `T` is not MoveConstructible.
- `unary_op` or `binary_op` modifies any element of `[``first``,``last``)`.
- `unary_op` or `binary_op` invalidates any iterator or subrange of `[``first``,``last``]`.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to sum |
| d_first | - | the beginning of the destination range; may be equal to `first` |
| policy | - | the execution policy to use |
| init | - | the initial value |
| unary_op | - | unary FunctionObject that will be applied to each element of the input range. The return type must be acceptable as input to `binary_op`. |
| binary_op | - | binary FunctionObject that will be applied in to the result of `unary_op`, the results of other `binary_op`, and `init` if provided |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Iterator to the element past the last element written.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1-4) \(\scriptsize O(N)\)O(N) applications of `unary_op` and `binary_op` respectively.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Notes

`unary_op` is never applied to `init`.

The parameter `init` appears last, differing from `std::transform_exclusive_scan`, because it is optional for this function.

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

    auto times_10 = [](int x) { return x * 10; };

    std::cout << "10 times exclusive sum: ";
    std::transform_exclusive_scan(data.begin(), data.end(),
                                  std::ostream_iterator<int>(std::cout, " "),
                                  0, std::plus<int>{}, times_10);
    std::cout << "\n10 times inclusive sum: ";
    std::transform_inclusive_scan(data.begin(), data.end(),
                                  std::ostream_iterator<int>(std::cout, " "),
                                  std::plus<int>{}, times_10);
    std::cout << '\n';
}
```

Output:

```text
10 times exclusive sum: 0 30 40 80 90 140 230 250
10 times inclusive sum: 30 40 80 90 140 230 250 310
```

### See also

|  |  |
| --- | --- |
| partial_sum | computes the partial sum of a range of elements (function template) |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| inclusive_scan (C++17) | similar to `std::partial_sum`, includes the ith input element in the ith sum (function template) |
| transform_exclusive_scan (C++17) | applies an invocable, then calculates exclusive scan (function template) |
