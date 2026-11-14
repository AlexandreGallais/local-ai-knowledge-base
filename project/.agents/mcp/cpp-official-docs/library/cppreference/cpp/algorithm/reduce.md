# std::reduce

| Defined in header `<numeric>` |  |  |
| --- | --- | --- |
| `template< class InputIt > typename std::iterator_traits<InputIt>::value_type reduce( InputIt first, InputIt last );` | (1) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt > typename std::iterator_traits<ForwardIt>::value_type reduce( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );` | (2) | (since C++17) |
| `template< class InputIt, class T > T reduce( InputIt first, InputIt last, T init );` | (3) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class T > T reduce( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, T init );` | (4) | (since C++17) |
| `template< class InputIt, class T, class BinaryOp > T reduce( InputIt first, InputIt last, T init, BinaryOp op );` | (5) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class T, class BinaryOp > T reduce( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, T init, BinaryOp op );` | (6) | (since C++17) |

1) Equivalent to `reduce(first, last, typename std::iterator_traits<InputIt>::value_type{})`.

3) Equivalent to `reduce(first, last, init, std::plus<>())`.

5) Reduces the range `[``first``,``last``)`, possibly permuted and aggregated in unspecified manner, along with the initial value `init` over `op`.

2,4,6) Same as (1,3,5), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

Given `binary_op` as the actual binary operation:

- The result is non-deterministic if the `binary_op` is not associative or not commutative (such as floating-point addition).

- If any of the following values is not convertible to `T`, the program is ill-formed:

- `binary_op(init, *first)`
- `binary_op(*first, init)`
- `binary_op(init, init)`
- `binary_op(*first, *first)`

- If any of the following conditions is satisfied, the behavior is undefined:

- `T` is not MoveConstructible.
- `binary_op` modifies any element of `[``first``,``last``)`.
- `binary_op` invalidates any iterator or subrange of `[``first``,``last``]`.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to apply the algorithm to |
| init | - | the initial value of the generalized sum |
| policy | - | the execution policy to use |
| op | - | binary FunctionObject that will be applied in unspecified order to the result of dereferencing the input iterators, the results of other `op` and `init`. |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

1-4) The generalized sum of `init` and the elements of `[``first``,``last``)` over `std::plus<>()`.

5,6) The generalized sum of `init` and the elements of `[``first``,``last``)` over `op`.

The *generalized sum* of a group of elements over an binary operation `binary_op` is defined as follows:

- If the group only has one element, the sum is the value of the element.
- Otherwise, performs the following operations in order:

1. Takes any two elements `elem1` and `elem2` from the group.
2. Calculates `binary_op(elem1, elem2)` and puts the result back to the group.
3. Repeats steps 1 and 2 until there is only one element in the group.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1-4) \(\scriptsize O(N)\)O(N) applications of `std::plus<>()`.

5,6) \(\scriptsize O(N)\)O(N) applications of `op`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Notes

`std::reduce` behaves like `std::accumulate` except the elements of the range may be grouped and rearranged in arbitrary order.

### Example

Side-by-side comparison between `std::reduce` and `std::accumulate`:

```cpp
#if PARALLEL
#include <execution>
#define SEQ std::execution::seq,
#define PAR std::execution::par,
#else
#define SEQ
#define PAR
#endif

#include <chrono>
#include <iomanip>
#include <iostream>
#include <locale>
#include <numeric>
#include <utility>
#include <vector>

int main()
{
    std::cout.imbue(std::locale("en_US.UTF-8"));
    std::cout << std::fixed << std::setprecision(1);

    auto eval = [](auto fun)
    {
        const auto t1 = std::chrono::high_resolution_clock::now();
        const auto [name, result] = fun();
        const auto t2 = std::chrono::high_resolution_clock::now();
        const std::chrono::duration<double, std::milli> ms = t2 - t1;
        std::cout << std::setw(28) << std::left << name << "sum: "
                  << result << '\t' << "time: " << ms.count() << " ms\n";
    };

    {
        const std::vector<double> v(100'000'007, 0.1);

        eval([&v]{ return std::pair{"std::accumulate (double)",
            std::accumulate(v.cbegin(), v.cend(), 0.0)}; });
        eval([&v]{ return std::pair{"std::reduce (seq, double)",
            std::reduce(SEQ v.cbegin(), v.cend())}; });
        eval([&v]{ return std::pair{"std::reduce (par, double)",
            std::reduce(PAR v.cbegin(), v.cend())}; });
    }

    {
        const std::vector<long> v(100'000'007, 1);

        eval([&v]{ return std::pair{"std::accumulate (long)",
            std::accumulate(v.cbegin(), v.cend(), 0l)}; });
        eval([&v]{ return std::pair{"std::reduce (seq, long)",
            std::reduce(SEQ v.cbegin(), v.cend())}; });
        eval([&v]{ return std::pair{"std::reduce (par, long)",
            std::reduce(PAR v.cbegin(), v.cend())}; });
    }
}
```

Possible output:

```text
// POSIX: g++ -std=c++23 ./example.cpp -ltbb -O3; ./a.out
std::accumulate (double)    sum: 10,000,000.7	time: 356.9 ms
std::reduce (seq, double)   sum: 10,000,000.7	time: 140.1 ms
std::reduce (par, double)   sum: 10,000,000.7	time: 140.1 ms
std::accumulate (long)      sum: 100,000,007	time: 46.0 ms
std::reduce (seq, long)     sum: 100,000,007	time: 67.3 ms
std::reduce (par, long)     sum: 100,000,007	time: 63.3 ms

// POSIX: g++ -std=c++23 ./example.cpp -ltbb -O3 -DPARALLEL; ./a.out
std::accumulate (double)    sum: 10,000,000.7	time: 353.4 ms
std::reduce (seq, double)   sum: 10,000,000.7	time: 140.7 ms
std::reduce (par, double)   sum: 10,000,000.7	time: 24.7 ms
std::accumulate (long)      sum: 100,000,007	time: 42.4 ms
std::reduce (seq, long)     sum: 100,000,007	time: 52.0 ms
std::reduce (par, long)     sum: 100,000,007	time: 23.1 ms
```

### See also

|  |  |
| --- | --- |
| accumulate | sums up or folds a range of elements (function template) |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| transform_reduce (C++17) | applies an invocable, then reduces out of order (function template) |
| ranges::fold_left (C++23) | left-folds a range of elements (algorithm function object) |
