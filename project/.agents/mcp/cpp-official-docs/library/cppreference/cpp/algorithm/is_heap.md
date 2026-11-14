# std::is_heap

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class RandomIt > bool is_heap( RandomIt first, RandomIt last );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class RandomIt > bool is_heap( ExecutionPolicy&& policy, RandomIt first, RandomIt last );` | (2) | (since C++17) |
| `template< class RandomIt, class Compare > bool is_heap( RandomIt first, RandomIt last, Compare comp );` | (3) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class RandomIt, class Compare > bool is_heap( ExecutionPolicy&& policy, RandomIt first, RandomIt last, Compare comp );` | (4) | (since C++17) |

Checks whether `[``first``,``last``)` is a heap.

1) The heap property to be checked is with respect to `operator<`(until C++20)`std::less{}`(since C++20).

3) The heap property to be checked is with respect to `comp`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range to be checked |
| policy | - | the execution policy to use |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns `true` if the first argument is *less* than the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `RandomIt` can be dereferenced and then implicitly converted to both of them. |
| Type requirements |  |  |
| - `RandomIt` must meet the requirements of LegacyRandomAccessIterator. |  |  |
| - `Compare` must meet the requirements of Compare. |  |  |

### Return value

`true` if the range is a heap with respect to the corresponding comparator, `false` otherwise.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) \(\scriptsize O(N)\)O(N) comparisons using `operator<`(until C++20)`std::less{}`(since C++20).

3,4) \(\scriptsize O(N)\)O(N) applications of the comparison function `comp`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Example

```cpp
#include <algorithm>
#include <bit>
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9};

    std::cout << "initially, v:\n";
    for (const auto& i : v)
        std::cout << i << ' ';
    std::cout << '\n';

    if (!std::is_heap(v.begin(), v.end()))
    {
        std::cout << "making heap...\n";
        std::make_heap(v.begin(), v.end());
    }

    std::cout << "after make_heap, v:\n";
    for (auto t{1U}; const auto& i : v)
        std::cout << i << (std::has_single_bit(++t) ? " | " : " ");
    std::cout << '\n';
}
```

Output:

```text
initially, v:
3 1 4 1 5 9 2 6 5 3 5 8 9 7 9
making heap...
after make_heap, v:
9 | 6 9 | 5 5 9 7 | 1 1 3 5 8 3 4 2 |
```

### See also

|  |  |
| --- | --- |
| is_heap_until (C++11) | finds the largest subrange that is a max heap (function template) |
| make_heap | creates a max heap out of a range of elements (function template) |
| push_heap | adds an element to a max heap (function template) |
| pop_heap | removes the largest element from a max heap (function template) |
| sort_heap | turns a max heap into a range of elements sorted in ascending order (function template) |
| ranges::is_heap (C++20) | checks if the given range is a max heap (algorithm function object) |
