# std::for_each

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class UnaryFunc > UnaryFunc for_each( InputIt first, InputIt last, UnaryFunc f );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class UnaryFunc > void for_each( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, UnaryFunc f );` | (2) | (since C++17) |

Applies the given function object `f` to the result of dereferencing every iterator in the range `[``first``,``last``)`. If `f` returns a result, the result is ignored.

1) `f` is applied in order starting from `first`.

If `UnaryFunc` is not MoveConstructible, the behavior is undefined. (since C++11)

2) `f` might not be applied in order. The algorithm is executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `UnaryFunc` is not CopyConstructible, the behavior is undefined.

If the iterator type (`InputIt`/`ForwardIt`) is mutable, `f` may modify the elements of the range through the dereferenced iterator.

Unlike the rest of the parallel algorithms, `for_each` is not allowed to make copies of the elements in the sequence even if they are TriviallyCopyable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range to apply the function to |
| policy | - | the execution policy to use |
| f | - | function object, to be applied to the result of dereferencing every iterator in the range `[``first``,``last``)` The signature of the function should be equivalent to the following: `void fun(const Type &a);` The signature does not need to have `const &`. The type `Type` must be such that an object of type `InputIt` can be dereferenced and then implicitly converted to `Type`. ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

1) `f`

2) (none)

### Complexity

Exactly `std::distance(first, last)` applications of `f`.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations in libstdc++, libc++ and MSVC stdlib.

`template<class InputIt, class UnaryFunc> constexpr UnaryFunc for_each(InputIt first, InputIt last, UnaryFunc f) { for (; first != last; ++first) f(*first); return f; // implicit move since C++11 }`

### Notes

For overload (1), `f` can be a stateful function object. The return value can be considered as the final state of the batch operation.

For overload (2), multiple copies of `f` may be created to perform parallel invocation. No value is returned because parallelization often does not permit efficient state accumulation.

### Example

The following example uses a lambda-expression to increment all of the elements of a vector and then uses an overloaded `operator()` in a function object (a.k.a., "functor") to compute their sum. Note that to compute the sum, it is recommended to use the dedicated algorithm `std::accumulate`.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v{3, -4, 2, -8, 15, 267};

    auto print = [](const int& n) { std::cout << n << ' '; };

    std::cout << "before:\t";
    std::for_each(v.cbegin(), v.cend(), print);
    std::cout << '\n';

    // increment elements in-place
    std::for_each(v.begin(), v.end(), [](int &n) { n++; });

    std::cout << "after:\t";
    std::for_each(v.cbegin(), v.cend(), print);
    std::cout << '\n';

    struct Sum
    {
        void operator()(int n) { sum += n; }
        int sum {0};
    };

    // invoke Sum::operator() for each element
    Sum s = std::for_each(v.cbegin(), v.cend(), Sum());
    std::cout << "sum:\t" << s.sum << '\n';
}
```

Output:

```text
before:	3 -4 2 -8 15 267
after:	4 -3 3 -7 16 268
sum:	281
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 475 | C++98 | it was unclear whether `f` can modify the elements of the sequence being iterated over (`for_each` is classified as “non-modifying sequence operations”) | made clear (allowed if the iterator type is mutable) |
| LWG 2747 | C++11 | overload (1) returned `std::move(f)` | returns `f` (which implicitly moves) |

### See also

|  |  |
| --- | --- |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| for_each_n (C++17) | applies a function object to the first N elements of a sequence (function template) |
| ranges::for_each (C++20) | applies a function to a range of elements (algorithm function object) |
| ranges::for_each_n (C++20) | applies a function object to the first N elements of a sequence (algorithm function object) |
| range-`for` loop(C++11) | executes loop over range |
