# std::for_each_n

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class Size, class UnaryFunc > InputIt for_each_n( InputIt first, Size n, UnaryFunc f );` | (1) | (since C++17) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class Size, class UnaryFunc > ForwardIt for_each_n( ExecutionPolicy&& policy, ForwardIt first, Size n, UnaryFunc f );` | (2) | (since C++17) |

Applies the given function object `f` to the result of dereferencing every iterator in the range `[``first``,``first + n``)`. If `f` returns a result, the result is ignored.

1) `f` is applied in order starting from `first`.

If `UnaryFunc` is not MoveConstructible, the behavior is undefined.

2) `f` might not be applied in order. The algorithm is executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `UnaryFunc` is not CopyConstructible, the behavior is undefined.

If `n >= 0` is not `true`, the behavior is undefined.

If the iterator type (`InputIt`/`ForwardIt`) is mutable, `f` may modify the elements of the range through the dereferenced iterator.

Unlike the rest of the parallel algorithms, `for_each_n` is not allowed to make copies of the elements in the sequence even if they are TriviallyCopyable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range to apply the function to |
| n | - | the number of elements to apply the function to |
| policy | - | the execution policy to use |
| f | - | function object, to be applied to the result of dereferencing every iterator in the range `[``first``,``first + n``)` The signature of the function should be equivalent to the following: `void fun(const Type &a);` The signature does not need to have `const &`. The type `Type` must be such that an object of type `InputIt` can be dereferenced and then implicitly converted to `Type`. ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `Size` must be convertible to an integral type. |  |  |

### Return value

An iterator equal to `first + n`, or more formally, to `std::advance(first, n)`.

### Complexity

Exactly `n` applications of `f`.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementation in libstdc++, libc++ and MSVC stdlib.

`template<class InputIt, class Size, class UnaryFunc> InputIt for_each_n(InputIt first, Size n, UnaryFunc f) { for (Size i = 0; i < n; ++first, (void) ++i) f(*first); return first; }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

void println(auto const& v)
{
    for (auto count{v.size()}; const auto& e : v)
        std::cout << e << (--count ? ", " : "\n");
}

int main()
{
    std::vector<int> vi{1, 2, 3, 4, 5};
    println(vi);

    std::for_each_n(vi.begin(), 3, [](auto& n) { n *= 2; });
    println(vi);
}
```

Output:

```text
1, 2, 3, 4, 5
2, 4, 6, 4, 5
```

### See also

|  |  |
| --- | --- |
| transform | applies a function to a range of elements, storing results in a destination range (function template) |
| range-`for` loop(C++11) | executes loop over range |
| for_each | applies a function to a range of elements (function template) |
| ranges::for_each_n (C++20) | applies a function object to the first N elements of a sequence (algorithm function object) |
